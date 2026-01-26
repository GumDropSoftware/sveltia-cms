import { get } from 'svelte/store';
import { _ } from 'svelte-i18n';

import { backend, backendName } from '$lib/services/backends';
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
 * @typedef {Object} AllowedUser
 * @property {string} email - User's email address
 * @property {string} password - User's password (in production, use hashed passwords)
 * @property {string} [name] - Optional display name
 */

/**
 * Validate credentials against the allowed users list from config.
 * @param {string} email - Email address to validate
 * @param {string} password - Password to validate
 * @returns {AllowedUser | undefined} The matched user or undefined
 */
const validateCredentials = (email, password) => {
  const config = get(cmsConfig);

  /** @type {AllowedUser[] | undefined} */
  const allowedUsers = config?.gumdrop?.allowed_users;

  if (!allowedUsers || !Array.isArray(allowedUsers)) {
    return undefined;
  }

  return allowedUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
};

/**
 * Get the GitHub token from config.
 * @returns {string | undefined} The GitHub access token
 */
const getGitHubToken = () => {
  const config = get(cmsConfig);
  return config?.gumdrop?.github_token;
};

/**
 * Sign in with email and password credentials.
 * Validates against allowed users list and uses the configured GitHub token.
 * @param {string} email - User's email address
 * @param {string} password - User's password
 */
export const signInWithCredentials = async (email, password) => {
  resetError();

  const validUser = validateCredentials(email, password);

  if (!validUser) {
    signInError.set({
      message: 'Invalid email or password',
      context: 'authentication',
    });
    return;
  }

  const token = getGitHubToken();

  if (!token) {
    signInError.set({
      message: 'GitHub token not configured. Please contact the administrator.',
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
    // Sign in to GitHub backend using the configured token
    const _user = await _backend.signIn({ token, auto: false });

    if (!_user) {
      throw new Error('Sign in failed');
    }

    // Override user info with the custom user's details
    /** @type {User} */
    const customUser = {
      ..._user,
      email: validUser.email,
      name: validUser.name || validUser.email.split('@')[0],
      // Keep the GitHub login for commit attribution if needed
    };

    signingIn.set(false);
    unauthenticated.set(false);
    user.set(customUser);

    // Fetch files from the repository
    await _backend.fetchFiles();
  } catch (/** @type {any} */ ex) {
    signingIn.set(false);
    unauthenticated.set(true);

    if (ex.cause?.status === 401) {
      signInError.set({
        message: 'GitHub token is invalid or expired. Please contact the administrator.',
        context: 'authentication',
      });
    } else {
      logError(ex);
    }
  }
};
