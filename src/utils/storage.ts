import * as Keychain from 'react-native-keychain';

const TOKENS_KEY = 'auth_tokens';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Store authentication tokens securely in keychain
 */
export const storeTokens = async (tokens: AuthTokens): Promise<boolean> => {
  try {
    await Keychain.setGenericPassword(TOKENS_KEY, JSON.stringify(tokens), {
      service: TOKENS_KEY,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });
    return true;
  } catch (error) {
    console.error('Error storing tokens:', error);
    return false;
  }
};

/**
 * Retrieve authentication tokens from keychain
 */
export const getTokens = async (): Promise<AuthTokens | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: TOKENS_KEY,
    });

    if (credentials) {
      return JSON.parse(credentials.password);
    }
    return null;
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    return null;
  }
};

/**
 * Remove authentication tokens from keychain
 */
export const removeTokens = async (): Promise<boolean> => {
  try {
    await Keychain.resetGenericPassword({
      service: TOKENS_KEY,
    });
    return true;
  } catch (error) {
    console.error('Error removing tokens:', error);
    return false;
  }
};
