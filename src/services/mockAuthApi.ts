/**
 * Mock authentication API service.
 * Simulates network latency and returns a user record for any
 * non-empty credentials. Replace with real API calls when ready.
 */

export type User = {
  id: string;
  name: string;
  email: string;
  country: string;
  subscription: string;
  token: string;
};

const MOCK_USER: User = {
  id: 'mock-user-001',
  name: 'Mock User',
  email: 'mock@example.com',
  country: 'US',
  subscription: 'free',
  token: 'mock-jwt-token',
};

const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(() => resolve(), ms));

/**
 * Email/password login.
 */
export async function login(email: string, password: string): Promise<User> {
  await delay(1000);

  if (!email.trim() || !password.trim()) {
    throw new Error('Email and password are required');
  }

  return {
    ...MOCK_USER,
    email: email.trim(),
  };
}

export type GoogleLoginParams = {
  idToken: string;
};

/**
 * Google Sign-In login.
 * A typical backend needs the idToken (and optionally serverAuthCode)
 * to verify the user with Google and create/issue a session.
 */
export async function loginWithGoogle(
  params: GoogleLoginParams,
): Promise<User> {
  await delay(1000);

  if (!params.idToken.trim()) {
    throw new Error('Google idToken is required');
  }

  return {
    ...MOCK_USER,
  };
}

export type AppleLoginParams = {
  identityToken: string;
  givenName?: string;
  familyName?: string;
};

/**
 * Apple Sign-In login.
 * A typical backend needs the identityToken and authorizationCode
 * to validate the sign-in with Apple and issue a session.
 */
export async function loginWithApple(params: AppleLoginParams): Promise<User> {
  await delay(1000);

  if (!params.identityToken.trim()) {
    throw new Error('Apple identityToken are required');
  }

  const displayName =
    params?.givenName && params?.familyName
      ? `${params.givenName} ${params.familyName}`
      : params?.givenName || MOCK_USER.name;

  return {
    ...MOCK_USER,
    name: displayName,
  };
}

export const mockAuthApi = {
  login,
  loginWithGoogle,
  loginWithApple,
};

export default mockAuthApi;
