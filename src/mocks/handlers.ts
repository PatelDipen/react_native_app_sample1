import MockAdapter from 'axios-mock-adapter';
import Config from '@/config/config';

// Mock data
const mockUser = {
  id: '1',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
};

const mockTokens = {
  accessToken: 'mock-access-token-123',
  refreshToken: 'mock-refresh-token-456',
};

export const setupMockHandlers = (mock: MockAdapter) => {
  // Login
  mock.onPost(`${Config.API_BASE_URL}/login`).reply(config => {
    const body = JSON.parse(config.data);

    if (body.userName === 'test@example.com' && body.password === 'password') {
      return [
        200,
        {
          user: mockUser,
          ...mockTokens,
        },
      ];
    }

    return [401, { message: 'Invalid credentials' }];
  });

  // Register
  mock.onPost(`${Config.API_BASE_URL}/register`).reply(config => {
    const body = JSON.parse(config.data);

    return [
      200,
      {
        user: {
          id: '2',
          email: body.email,
          firstName: body.firstName || 'New',
          lastName: body.lastName || 'User',
        },
        ...mockTokens,
      },
    ];
  });

  // Get current user profile
  mock.onGet(`${Config.API_BASE_URL}/profile`).reply(config => {
    const authHeader = config.headers?.Authorization;

    if (!authHeader || !authHeader.includes('Bearer')) {
      return [401, { message: 'Unauthorized' }];
    }

    return [200, mockUser];
  });

  // Update profile
  mock.onPut(`${Config.API_BASE_URL}/auth/profile`).reply(config => {
    const body = JSON.parse(config.data);

    return [
      200,
      {
        ...mockUser,
        ...body,
      },
    ];
  });

  // Logout
  mock.onPost(`${Config.API_BASE_URL}/auth/logout`).reply(200, {
    message: 'Logged out successfully',
  });

  // Refresh token
  mock.onPost(`${Config.API_BASE_URL}/auth/refresh`).reply(200, {
    accessToken: 'new-mock-access-token-789',
    refreshToken: 'new-mock-refresh-token-012',
  });

  // Pass through any unmatched requests
  mock.onAny().passThrough();
};
