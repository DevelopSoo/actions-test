// @/mocks/server.ts

// 노드
import { setupServer } from 'msw/node';
import { postHandlers } from '@/mocks/handlers/posts';

export const server = setupServer(...postHandlers);
