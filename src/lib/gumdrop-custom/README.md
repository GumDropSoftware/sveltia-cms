# Gumdrop Custom Authentication

This folder contains custom authentication components that replace the default GitHub OAuth login with a simple email/password system.

## How It Works

1. Users enter their email and password
2. Credentials are validated against an `allowed_users` list in the CMS config
3. If valid, the system uses a pre-configured GitHub Personal Access Token to authenticate with GitHub
4. All users share the same GitHub token for making commits

## Configuration

In your website's `admin/config.yml`, add a `gumdrop` section:

```yaml
backend:
  name: github
  repo: your-org/your-repo
  branch: main

# Custom authentication config
gumdrop:
  # GitHub Personal Access Token with repo access
  # Generate at: https://github.com/settings/tokens
  # Required scopes: repo (full control of private repositories)
  github_token: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  # List of allowed users
  allowed_users:
    - {email: admin@example.com, password: secretpassword123, name: Admin User}
    - {email: editor@example.com, password: anotherpassword, name: Editor}

# ... rest of your config
collections:
  # ...
```

## Security Notes

- **Keep your config private**: Since the GitHub token is in the config, make sure your website repository is private
- **Use strong passwords**: Even though this is a simple auth system, use strong passwords for your users
- **Token permissions**: The GitHub token should have the minimum required permissions (typically just `repo` scope)
- **Consider hashing**: For production use, consider implementing password hashing instead of plaintext passwords

## Files

- `sign-in.svelte` - The email/password login form UI
- `auth.js` - Authentication logic that validates credentials and signs in via GitHub
- `entrance-page.svelte` - The main login page that uses the custom sign-in component
