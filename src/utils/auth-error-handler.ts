export const getErrorMessage = (error: any): string => {
  // First try to parse the error body if it exists
  let body;
  try {
    body = typeof error.body === 'string' ? JSON.parse(error.body) : error.body;
  } catch {
    body = {};
  }
  
  const message = error?.message?.toLowerCase() || '';
  const code = body?.code || error?.code || '';
  
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
  } else if (message.includes('body stream already read')) {
    return 'An error occurred while processing your request. Please try again.';
  }
  
  // If no specific error is matched, return a generic message or the original error message
  return error.message || 'An unexpected error occurred. Please try again.';
};