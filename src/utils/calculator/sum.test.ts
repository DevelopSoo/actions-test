import { divide, sum } from './sum';
test('sum', () => {
  expect(sum(1, 2)).toBe(3);
});

test('divide', () => {
  expect(divide(1, 2)).toBe(0.5);
});
