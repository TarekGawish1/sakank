/**
 * Token Manager Abstraction
 * Handles storing, retrieving, and removing authentication tokens.
 * Currently using in-memory placeholders. Will be integrated with secure storage.
 */

let inMemoryAccessToken: string | null = null;
let inMemoryRefreshToken: string | null = null;

export const TokenManager = {
  async getAccessToken(): Promise<string | null> {
    return inMemoryAccessToken;
  },

  async setAccessToken(token: string): Promise<void> {
    inMemoryAccessToken = token;
  },

  async getRefreshToken(): Promise<string | null> {
    return inMemoryRefreshToken;
  },

  async setRefreshToken(token: string): Promise<void> {
    inMemoryRefreshToken = token;
  },

  async clearTokens(): Promise<void> {
    inMemoryAccessToken = null;
    inMemoryRefreshToken = null;
  }
};
