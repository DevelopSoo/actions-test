import "@testing-library/jest-dom";
import "@/customMatchers";
import { server } from "@/mocks/index";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());
