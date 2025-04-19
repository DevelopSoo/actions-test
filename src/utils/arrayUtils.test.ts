import { chunk, intersection, uniqueItems } from './arrayUtils';

describe('arrayUtils', () => {
  describe('uniqueItems 함수 테스트', () => {
    test('중복된 항목이 제거되어야 함', () => {
      expect(uniqueItems([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
      expect(uniqueItems(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });

    test('중복이 없는 배열은 그대로 반환되어야 함', () => {
      expect(uniqueItems([1, 2, 3])).toEqual([1, 2, 3]);
      expect(uniqueItems(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    });

    test('빈 배열은 빈 배열을 반환해야 함', () => {
      expect(uniqueItems([])).toEqual([]);
    });

    test('배열이 아닌 입력은 빈 배열을 반환해야 함', () => {
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(uniqueItems(null)).toEqual([]);
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(uniqueItems(undefined)).toEqual([]);
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(uniqueItems('string')).toEqual([]);
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(uniqueItems(123)).toEqual([]);
    });
  });

  describe('chunk 함수 테스트', () => {
    test('배열을 지정된 크기의 청크로 나눠야 함', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3, 4], 2)).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    test('청크 크기가 배열 길이보다 크면 하나의 청크만 반환해야 함', () => {
      expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
    });

    test('크기가 1이면 각 항목이 별도의 청크가 되어야 함', () => {
      expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    });

    test('크기가 0 이하면 전체 배열을 하나의 청크로 반환해야 함', () => {
      expect(chunk([1, 2, 3], 0)).toEqual([[1, 2, 3]]);
      expect(chunk([1, 2, 3], -1)).toEqual([[1, 2, 3]]);
    });

    test('빈 배열은 빈 배열을 반환해야 함', () => {
      expect(chunk([])).toEqual([]);
    });

    test('배열이 아닌 입력은 빈 배열을 반환해야 함', () => {
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(chunk(null)).toEqual([]);
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(chunk('string')).toEqual([]);
    });
  });

  describe('intersection 함수 테스트', () => {
    test('두 배열의 공통 요소를 반환해야 함', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
      expect(intersection(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual([
        'b',
        'c',
      ]);
    });

    test('공통 요소가 없으면 빈 배열을 반환해야 함', () => {
      expect(intersection([1, 2], [3, 4])).toEqual([]);
      expect(intersection(['a', 'b'], ['c', 'd'])).toEqual([]);
    });

    test('빈 배열 입력은 빈 배열을 반환해야 함', () => {
      expect(intersection([], [1, 2])).toEqual([]);
      expect(intersection([1, 2], [])).toEqual([]);
      expect(intersection([], [])).toEqual([]);
    });

    test('배열이 아닌 입력은 빈 배열을 반환해야 함', () => {
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(intersection(null, [1, 2])).toEqual([]);
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(intersection([1, 2], null)).toEqual([]);
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(intersection('string', [1, 2])).toEqual([]);
    });
  });
});
