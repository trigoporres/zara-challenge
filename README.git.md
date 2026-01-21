# Git Guide

## Repository Information

- **Default Branch**: `main`
- **Initial Commit**: 674e295

## Git Configuration

### Line Endings

The project uses `.gitattributes` to ensure consistent line endings across platforms:
- Text files: Auto-detected and normalized
- Source files (`.ts`, `.tsx`, `.js`, etc.): Treated as text
- Binary files: Treated as binary (no line ending conversion)

### Ignored Files

The `.gitignore` includes:
- `node_modules/` - Dependencies
- `dist/`, `dist-ssr/` - Build outputs
- `coverage/` - Test coverage reports
- `.vite/`, `.cache/`, `*.tsbuildinfo` - Cache files
- `.env*` - Environment variables
- Editor-specific files (except `.vscode/extensions.json`)

## Recommended Git Workflow

### 1. Feature Development

```bash
# Create a new feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Add my feature"

# Push to remote
git push -u origin feature/my-feature
```

### 2. Commit Messages

Follow the conventional commits format:

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login form validation"
git commit -m "test: add unit tests for App component"
git commit -m "docs: update README with setup instructions"
```

### 3. Before Committing

Run these checks:

```bash
# Format code
npm run format

# Run linter
npm run lint

# Run tests
npm run test:run

# Build the project
npm run build
```

### 4. Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# View changes
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo all uncommitted changes
git restore .

# View all branches
git branch -a

# Delete a local branch
git branch -d feature/my-feature
```

## Git Hooks (Optional)

Consider setting up git hooks for automation:

### Pre-commit Hook

Create `.git/hooks/pre-commit`:

```bash
#!/bin/sh
npm run lint
npm run test:run
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

### Using Husky (Recommended)

For a more robust solution, install Husky:

```bash
npm install --save-dev husky
npx husky init
```

## Remote Repository

To connect to a remote repository:

```bash
# Add remote
git remote add origin <repository-url>

# Push to remote
git push -u origin main

# View remotes
git remote -v
```

## Common Issues

### Merge Conflicts

If you encounter merge conflicts:

1. Open the conflicted files
2. Look for conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
3. Resolve the conflicts manually
4. Stage the resolved files: `git add .`
5. Complete the merge: `git commit`

### Reverting Changes

```bash
# Revert a specific commit
git revert <commit-hash>

# Reset to a previous commit (destructive)
git reset --hard <commit-hash>
```

## Best Practices

1. **Commit frequently** - Small, focused commits are easier to review
2. **Write clear commit messages** - Explain what and why, not how
3. **Pull before push** - Always pull latest changes before pushing
4. **Use branches** - Keep `main` stable, develop in feature branches
5. **Review before commit** - Use `git diff` to review your changes
6. **Test before commit** - Ensure tests pass before committing
7. **Don't commit secrets** - Never commit `.env` files or credentials
