import MockAdapter from 'axios-mock-adapter';
import api from '@/services/api';
import { setupMockHandlers } from './handlers';

// Create mock adapter for axios instance
const mock = new MockAdapter(api, { delayResponse: 500 });

// Setup all mock handlers
setupMockHandlers(mock);

export { mock };
