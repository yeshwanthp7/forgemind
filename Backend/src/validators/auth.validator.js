/**
 * Helper to check password strength:
 * - At least 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 */
const isStrongPassword = (password) => {
  if (!password || password.length < 8) return false;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasUpper && hasLower && hasNumber;
};

/**
 * Validate Registration Payload
 */
exports.validateRegister = (data) => {
  const errors = [];
  const { name, email, password, confirmPassword, role } = data || {};

  if (!name || !name.trim()) {
    errors.push('Name is required');
  }

  if (!email || !email.trim()) {
    errors.push('Email is required');
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Please enter a valid email address');
  }

  if (!password) {
    errors.push('Password is required');
  } else if (!isStrongPassword(password)) {
    errors.push('Password must contain at least 8 characters, an uppercase letter, a lowercase letter, and a number.');
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    errors.push('Passwords do not match.');
  }

  const validRoles = ['Worker', 'Safety Officer', 'Plant Manager'];
  if (!role || !validRoles.includes(role)) {
    errors.push('Role must be one of: Worker, Safety Officer, Plant Manager');
  }

  return {
    isValid: errors.length === 0,
    errors,
    errorMessage: errors[0] || null,
  };
};

/**
 * Validate Login Payload
 */
exports.validateLogin = (data) => {
  const errors = [];
  const { email, password } = data || {};

  if (!email || !email.trim()) {
    errors.push('Email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
    errorMessage: errors[0] || null,
  };
};

/**
 * Validate Reset Password Payload
 */
exports.validateResetPassword = (data) => {
  const errors = [];
  const { password, confirmPassword } = data || {};

  if (!password) {
    errors.push('Password is required');
  } else if (!isStrongPassword(password)) {
    errors.push('Password must contain at least 8 characters, an uppercase letter, a lowercase letter, and a number.');
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    errors.push('Passwords do not match.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    errorMessage: errors[0] || null,
  };
};
