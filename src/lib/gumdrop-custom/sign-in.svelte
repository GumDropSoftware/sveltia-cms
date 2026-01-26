<script>
  import { Button, Icon, TextInput } from '@sveltia/ui';
  import { _ } from 'svelte-i18n';

  import { cmsConfig } from '$lib/services/config';
  import {
    signInError,
    signingIn,
  } from '$lib/services/user/auth';
  import { signInWithCredentials } from '$lib/gumdrop-custom/auth';

  let email = $state('');
  let password = $state('');

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      return;
    }
    await signInWithCredentials(email.trim(), password.trim());
  };

  /**
   * Handle keydown for Enter key submission
   * @param {KeyboardEvent} event
   */
  const handleKeydown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
</script>

<div role="none" class="sign-in-form">
  {#if $signingIn}
    <div role="alert" class="message">{$_('signing_in')}</div>
  {:else}
    <div role="none" class="form-fields">
      <TextInput
        bind:value={email}
        type="email"
        placeholder="Email address"
        aria-label="Email address"
        onkeydown={handleKeydown}
      />
      <TextInput
        bind:value={password}
        type="password"
        placeholder="Password"
        aria-label="Password"
        onkeydown={handleKeydown}
      />
    </div>
    <Button
      variant="primary"
      label="Sign In"
      disabled={!email.trim() || !password.trim()}
      onclick={handleSubmit}
    />
    {#if $signInError.message && $signInError.context === 'authentication'}
      <div role="alert" class="error">
        <Icon name="error" />
        {$signInError.message}
      </div>
    {/if}
  {/if}
</div>

<style lang="scss">
  .sign-in-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    max-width: 320px;
  }

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .message {
    font-size: var(--sui-font-size-large);
  }

  [role='alert'].error {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--sui-error-foreground-color);
  }

  :global {
    .sign-in-form .button {
      width: 100%;
    }

    .sign-in-form input {
      width: 100%;
    }
  }
</style>
