# Mock API Setup Guide

This project uses **axios-mock-adapter** for API mocking during development.

## Why axios-mock-adapter?

✅ Works perfectly with React Native  
✅ No web APIs required (unlike MSW)  
✅ Simple setup, no polyfills needed  
✅ Direct axios integration  
✅ Simulates network delays

## Setup

### 1. Install

```bash
npm install axios-mock-adapter --save-dev
```

### 2. Files Structure

```
src/mocks/
├── index.ts       # Exports
├── server.ts      # Mock adapter setup
└── handlers.ts    # API endpoint handlers
```

## Usage

### Enable/Disable Mocking

**Enabled by default in development** (`index.js`):

```javascript
if (__DEV__) {
  require('./src/mocks');
  console.log('🎭 Mock API enabled');
}
```

**To disable and use real API:**

```javascript
if (false) {
  // Disable mocking
  require('./src/mocks');
}
```

### Mock Credentials

**Login with:**

- Email: `test@example.com`
- Password: `password`

## Adding New Mock Endpoints

Edit `src/mocks/handlers.ts`:

```typescript
export const setupMockHandlers = (mock: MockAdapter) => {
  // Simple GET endpoint
  mock.onGet(`${Config.API_BASE_URL}/claims`).reply(200, [
    { id: '1', type: 'Medical', amount: 500 },
    { id: '2', type: 'Dental', amount: 200 },
  ]);

  // POST with request validation
  mock.onPost(`${Config.API_BASE_URL}/claims`).reply(config => {
    const body = JSON.parse(config.data);

    if (!body.type) {
      return [400, { message: 'Type is required' }];
    }

    return [201, { id: '3', ...body }];
  });

  // Error response
  mock.onGet(`${Config.API_BASE_URL}/error`).reply(500, {
    message: 'Internal server error',
  });

  // Dynamic URL parameters with regex
  mock.onGet(new RegExp(`${Config.API_BASE_URL}/users/.*`)).reply(config => {
    const id = config.url?.split('/').pop();
    return [200, { id, name: `User ${id}`, email: `user${id}@example.com` }];
  });

  // With network delay (500ms default, change in server.ts)
  mock
    .onGet(`${Config.API_BASE_URL}/slow`)
    .reply(200, { data: 'Delayed response' });
};
```

## Advanced Features

### Network Delay

Adjust delay in `src/mocks/server.ts`:

```typescript
const mock = new MockAdapter(api, { delayResponse: 1000 }); // 1 second
```

### Check Request Headers

```typescript
mock.onGet(`${Config.API_BASE_URL}/protected`).reply(config => {
  const token = config.headers?.Authorization;

  if (!token) {
    return [401, { message: 'Unauthorized' }];
  }

  return [200, { data: 'Protected data' }];
});
```

### Stateful Mocks

```typescript
let counter = 0;

mock.onGet(`${Config.API_BASE_URL}/counter`).reply(() => {
  counter++;
  return [200, { count: counter }];
});

mock.onPost(`${Config.API_BASE_URL}/counter/reset`).reply(() => {
  counter = 0;
  return [200, { message: 'Reset' }];
});
```

### Pass Through Unmocked Requests

```typescript
// At the end of setupMockHandlers
mock.onAny().passThrough();
```

## Current Mock Endpoints

✅ `POST /login` - User login  
✅ `POST /register` - User registration  
✅ `GET /profile` - Get current user  
✅ `PUT /auth/profile` - Update profile  
✅ `POST /auth/logout` - Logout  
✅ `POST /auth/refresh` - Refresh token

## Troubleshooting

**Mocks not working?**

1. Check console for "🎭 Mock API enabled" message
2. Verify `__DEV__` is true
3. Check API base URL matches in handlers
4. Restart Metro bundler: `npm start -- --reset-cache`

**Need to debug requests?**
Check the axios interceptor logs in `src/services/api.ts` - they show all requests and responses.

## Alternative: JSON Server

For a real REST API without coding:

```bash
npm install -g json-server
echo '{"users":[{"id":1,"email":"test@test.com"}]}' > db.json
json-server --watch db.json --port 3000
```

Update `.env`:

```
API_BASE_URL=http://localhost:3000
```
