import { get } from 'svelte/store';

import { backend, backendName } from '$lib/services/backends';
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
 * Check for an existing BetterAuth session and authenticate with Sveltia.
 *
 * The user is expected to already be logged in via BetterAuth before reaching
 * the CMS. This function checks for a valid session cookie by calling the
 * BetterAuth session endpoint. If authenticated, it populates the Sveltia
 * user store and begins loading files from the repository.
 */
export const authenticateFromSession = async () => {
  resetError();
  signingIn.set(true);

  try {
    // Check for an existing BetterAuth session via the session cookie
    const response = await fetch('/api/better-auth/get-session', {
      credentials: 'include',
    });

    if (!response.ok) {
      signingIn.set(false);
      unauthenticated.set(true);
      signInError.set({
        message: 'Not authenticated. Please log in to the website first.',
        context: 'authentication',
      });
      return;
    }

    const session = await response.json();

    if (!session?.user) {
      signingIn.set(false);
      unauthenticated.set(true);
      signInError.set({
        message: 'No active session found. Please log in to the website first.',
        context: 'authentication',
      });
      return;
    }

    // Initialize the GitHub backend
    backendName.set('github');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const _backend = get(backend);

    if (!_backend) {
      signingIn.set(false);
      signInError.set({
        message: 'Backend not available',
        context: 'authentication',
      });
      return;
    }

    // Build the Sveltia user object from the BetterAuth session.
    // No token is needed — API requests use the session cookie directly.
    /** @type {User} */
    const sessionUser = {
      backendName: 'github',
      id: session.user.id || 0,
      name: session.user.name || session.user.email.split('@')[0],
      login: session.user.email,
      email: session.user.email,
      avatarURL: session.user.image || '',
      profileURL: '',
      token: undefined,
      refreshToken: undefined,
    };

    signingIn.set(false);
    unauthenticated.set(false);
    user.set(sessionUser);

    // Fetch files from the repository (uses session cookie via credentials: 'include')
    await _backend.fetchFiles();
  } catch (/** @type {any} */ ex) {
    signingIn.set(false);
    unauthenticated.set(true);
    logError(ex);
  }
};
