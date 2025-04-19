import '@testing-library/jest-dom';
import '@/customMatchers';
import { server } from '@/mocks/server';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());
