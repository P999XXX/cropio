export const getErrorMessage = (error: any): string => {
  // First try to parse the error body if it exists
  let body;
  try {
    body = error?.body ? JSON.parse(error.body) : {};
  } catch {
    body = {};
  }
  
  const message = error?.message?.toLowerCase() || '';
  const code = body?.code || '';
  
  // Handle specific error cases
  if (code === 'invalid_credentials' || message.includes('invalid login credentials')) {
    return 'The email or password you entered is incorrect. Please try again.';
  } else if (message.includes('email not confirmed')) {
    return 'Please verify your email before signing in.';
  } else if (code === 'over_email_send_rate_limit' || message.includes('rate limit')) {
    return 'Too many attempts. Please wait a few minutes before trying again.';
  } else if (message.includes('timeout')) {
    return 'The operation timed out. Please check your internet connection and try again.';
  } else if (message.includes('network')) {
    return 'Unable to connect. Please check your internet connection.';
  }
  
  return error.message || 'An unexpected error occurred. Please try again.';
};