export const getErrorMessage = (error: any): string => {
  const message = error?.message?.toLowerCase() || '';
  const body = error?.body ? JSON.parse(error.body) : {};
  const code = body?.code || '';
  
  if (code === 'over_email_send_rate_limit') {
    return 'Too many reset attempts. Please wait a few minutes before trying again.';
  }
  
  if (message.includes('invalid login credentials')) {
    return 'Incorrect email or password. Please try again.';
  } else if (message.includes('email not confirmed')) {
    return 'Please verify your email before signing in.';
  } else if (message.includes('timeout')) {
    return 'The operation timed out. Please check your internet connection and try again.';
  } else if (message.includes('network')) {
    return 'Unable to connect. Please check your internet connection.';
  } else if (message.includes('too many requests') || message.includes('rate limit')) {
    return 'Too many attempts. Please try again later.';
  }
  
  return error.message || 'An unexpected error occurred. Please try again.';
};