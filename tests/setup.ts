import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../src/mocks/server';
import { divisionFixtures } from '../src/mocks/data/divisions';

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  server.resetHandlers();
  divisionFixtures.reset();
});

afterAll(() => server.close());
