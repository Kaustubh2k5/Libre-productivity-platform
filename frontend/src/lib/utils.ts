type SignupData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function handleSignup(data: SignupData): SignupErrors {
  const errors: SignupErrors = {};

  // Username Validation
  if (!data.username.trim()) {
    errors.username = 'Username is required';
  } else if (data.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }

  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  // Password Validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (!passwordRegex.test(data.password)) {
    errors.password =
      'Password must contain uppercase, lowercase, number, special character and be at least 8 characters';
  }

  // Confirm Password Validation
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

// the similar as above  for login
type logInData = {
  email: string;
  password: string;
};

type logInErrors = {
  email?: string;
  password?: string;
};

export function handleLogin(data: logInData): logInErrors {
  const errors: logInErrors = {};

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  // Password Validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&]).{8,}$/;

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (!passwordRegex.test(data.password)) {
    errors.password =
      'Password must contain uppercase, lowercase, number, special character and be at least 8 characters';
  }

  return errors;
}
