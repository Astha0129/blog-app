/**
 * Validation helpers for forms.
 */

export function validateEmail(email) {
  if (!email || !email.trim()) return 'Email is required.';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email.trim())) return 'Enter a valid email address.';
  return null;
}

export function validatePassword(password) {
  if (!password) return 'Password is required.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  return null;
}

export function validateUsername(name) {
  if (!name || !name.trim()) return 'Name is required.';
  if (name.trim().length < 2) return 'Name must be at least 2 characters.';
  if (name.trim().length > 50) return 'Name must be 50 characters or less.';
  return null;
}

export function validatePostTitle(title) {
  if (!title || !title.trim()) return 'Title is required.';
  if (title.trim().length < 5) return 'Title must be at least 5 characters.';
  if (title.trim().length > 200) return 'Title must be 200 characters or less.';
  return null;
}

export function validatePostContent(content) {
  if (!content || !content.trim()) return 'Content is required.';
  if (content.trim().length < 20) return 'Content must be at least 20 characters.';
  return null;
}

/**
 * Validates a login form. Returns an object of field -> error messages.
 */
export function validateLoginForm({ email, password }) {
  const errors = {};
  const emailErr = validateEmail(email);
  const passErr  = validatePassword(password);
  if (emailErr) errors.email    = emailErr;
  if (passErr)  errors.password = passErr;
  return errors;
}

/**
 * Validates a signup form. Returns an object of field -> error messages.
 */
export function validateSignupForm({ name, email, password, confirmPassword }) {
  const errors = {};
  const nameErr  = validateUsername(name);
  const emailErr = validateEmail(email);
  const passErr  = validatePassword(password);
  if (nameErr)  errors.name  = nameErr;
  if (emailErr) errors.email = emailErr;
  if (passErr)  errors.password = passErr;
  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  return errors;
}

/**
 * Validates a post create/edit form.
 */
export function validatePostForm({ title, content, category }) {
  const errors = {};
  const titleErr   = validatePostTitle(title);
  const contentErr = validatePostContent(content);
  if (titleErr)   errors.title   = titleErr;
  if (contentErr) errors.content = contentErr;
  if (!category)  errors.category = 'Please select a category.';
  return errors;
}
