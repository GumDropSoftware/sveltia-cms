import { stripSlashes } from '@sveltia/utils/string';
import { get } from 'svelte/store';
import { _ } from 'svelte-i18n';

import { backend, backendName } from '$lib/services/backends';
import { apiConfig } from '$lib/services/backends/git/shared/api';
import { cmsConfig } from '$lib/services/config';
import { user } from '$lib/services/user';
import {
  signInError,
  signingIn,
  unauthenticated,
  resetError,
  logError,
} from '$lib/services/user/auth';

/**
 * @import { User } from '$lib/types/private';
 */

/**
 * @typedef {Object} ProxyLoginResponse
 * @property {string} token - JWT session token
 * @property {Object} user - User info from the server
 * @property {string} user.email - User's email address
 * @property {string} user.name - User's display name
 * @property {string} [user.id] - User's ID
 */

/**
 * Get the proxy auth URL directly from cmsConfig.
 * This avoids the timing issue where apiConfig isn't populated yet.
 * @returns {string | undefined} The login endpoint URL
 */
const getProxyLoginURL = () => {
  const config = get(cmsConfig);
  const proxyURL = config?.backend?.proxy_url;

  if (!proxyURL) {
    return undefined;
  }

  // proxy_url is like "/api/github", we want "/api/auth/login"
  const basePath = stripSlashes(proxyURL).replace(/\/github$/, '');

  return `/${basePath}/auth/login`;
};

/**
 * Sign in with email and password credentials via the proxy server.
 * Sends credentials to the server-side auth endpoint, receives a JWT.
 * @param {string} email - User's email address
 * @param {string} password - User's password
 */
export const signInWithCredentials = async (email, password) => {
  resetError();

  // Set backend to GitHub first - this triggers init() which populates apiConfig
  backendName.set('github');

  // Small delay to allow the derived store to update and init() to run
  await new Promise((resolve) => setTimeout(resolve, 0));

  const loginURL = getProxyLoginURL();

  if (!loginURL) {
    signInError.set({
      message: 'Proxy authentication not configured. Check backend.proxy_url in config.',
      context: 'authentication',
    });
    return;
  }

  const _backend = get(backend);

  if (!_backend) {
    signInError.set({
      message: 'Backend not available',
      context: 'authentication',
    });
    return;
  }

  signingIn.set(true);

  try {
    // Call the server-side login endpoint
    const response = await fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 401) {
        signInError.set({
          message: errorData.message || 'Invalid email or password',
          context: 'authentication',
        });
      } else {
        signInError.set({
          message: errorData.message || 'Authentication failed',
          context: 'authentication',
        });
      }

      signingIn.set(false);
      return;
    }

    /** @type {ProxyLoginResponse} */
    const { token, user: serverUser } = await response.json();

    if (!token) {
      throw new Error('No token received from server');
    }

    // Create user object with the JWT as the token
    // The JWT will be sent with all subsequent API requests via the Authorization header
    /** @type {User} */
    const customUser = {
      backendName: 'github',
      id: serverUser.id || 0,
      name: serverUser.name || serverUser.email.split('@')[0],
      login: serverUser.email,
      email: serverUser.email,
      avatarURL: '',
      profileURL: '',
      token, // This is the JWT, not a GitHub token
      refreshToken: undefined,
    };

    signingIn.set(false);
    unauthenticated.set(false);
    user.set(customUser);

    // Fetch files from the repository (this will use the proxy with the JWT)
    await _backend.fetchFiles();
  } catch (/** @type {any} */ ex) {
    signingIn.set(false);
    unauthenticated.set(true);
    logError(ex);
  }
};
