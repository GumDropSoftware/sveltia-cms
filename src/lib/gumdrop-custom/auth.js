import { get } from 'svelte/store';
import { _ } from 'svelte-i18n';

import { backend, backendName } from '$lib/services/backends';
import { apiConfig } from '$lib/services/backends/git/shared/api';
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
 * Get the proxy auth URL from apiConfig.
 * The proxy_url in config.yml becomes the base; we append /auth/login.
 * @returns {string | undefined} The login endpoint URL
 */
const getProxyLoginURL = () => {
  const { restBaseURL, useProxy } = apiConfig;

  if (!useProxy || !restBaseURL) {
    return undefined;
  }

  // restBaseURL is like "/api/github/rest", we want "/api/auth/login"
  // Extract the base path (everything before /github)
  const basePath = restBaseURL.replace(/\/github\/rest$/, '');

  return `${basePath}/auth/login`;
};

/**
 * Sign in with email and password credentials via the proxy server.
 * Sends credentials to the server-side auth endpoint, receives a JWT.
 * @param {string} email - User's email address
 * @param {string} password - User's password
 */
export const signInWithCredentials = async (email, password) => {
  resetError();

  const loginURL = getProxyLoginURL();

  if (!loginURL) {
    signInError.set({
      message: 'Proxy authentication not configured. Check backend.proxy_url in config.',
      context: 'authentication',
    });
    return;
  }

  // Set backend to GitHub
  backendName.set('github');

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
