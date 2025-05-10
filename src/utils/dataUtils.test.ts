import { sortByValue, type Item } from './dataUtils';

describe('dataUtils', () => {
  let data: Item[] = [];

  beforeEach(() => {
    data = [
      { id: 1, category: 'A', value: 10 },
      { id: 2, category: 'B', value: 30 },
      { id: 3, category: 'A', value: 20 },
    ];
  });

  afterEach(() => {
    // console.log("각 테스트 후에 실행");
  });

  test('filterByCategory가 카테고리 필터링을 제대로 하는지 검증', () => {});

  test('데이터 변경 후 sortByValue가 정렬을 제대로 하는지 검증', () => {
    // 직접 변경하는 게 좋은 건 아님
    data[0].value = 50;

    const sortedData = sortByValue(data);

    expect(sortedData).toEqual([
      { id: 3, category: 'A', value: 20 },
      { id: 2, category: 'B', value: 30 },
      { id: 1, category: 'A', value: 50 },
    ]);
  });

  // 여기서 에러 발생
  test('sortByValue가 정렬을 제대로 하는지 검증', () => {
    const sortedData = sortByValue(data);

    expect(sortedData).toEqual([
      { id: 1, category: 'A', value: 10 },
      { id: 3, category: 'A', value: 20 },
      { id: 2, category: 'B', value: 30 },
    ]);
  });
});

// 여러 종류의 API를 사용하여 날씨 정보를 가져오는 함수라고 가정
const getWeatherInfo = async (
  city: string,
  apiCall: (city: string) => Promise<{
    temperature: number;
    humidity: number;
    condition: string;
  }>
) => {
  try {
    const result = await apiCall(city);
    // 결과값과 추가 데이터
    return {
      city,
      ...result,
    };
  } catch {
    throw new Error('날씨 정보를 가져오는데 실패했습니다.');
  }
};

describe('getWeatherInfo 함수 테스트', () => {
  test('getWeatherInfo 함수 성공 테스트', async () => {
    const mockApiCall = jest.fn().mockResolvedValue({
      temperature: 23,
      humidity: 50,
      condition: '맑음',
    });

    const result = await getWeatherInfo('서울', mockApiCall);
    expect(mockApiCall).toHaveBeenCalledWith('서울');
    expect(result).toEqual({
      city: '서울',
      temperature: 23,
      humidity: 50,
      condition: '맑음',
    });
    expect(mockApiCall).toHaveBeenCalledTimes(1);
  });

  test('getWeatherInfo 함수 실패 테스트', async () => {
    const mockApiCall = jest
      .fn()
      .mockRejectedValue(new Error('날씨 정보를 가져오는데 실패했습니다.'));

    await expect(getWeatherInfo('서울', mockApiCall)).rejects.toThrow(
      '날씨 정보를 가져오는데 실패했습니다.'
    );
    expect(mockApiCall).toHaveBeenCalledWith('서울');
    expect(mockApiCall).toHaveBeenCalledTimes(1);
  });
});

describe('사용자 서비스', () => {
  const mockUserAPI = jest.fn();

  describe('mockReset 테스트', () => {
    beforeEach(() => {
      mockUserAPI.mockReset(); // 호출 기록 + mock 구현 모두 초기화
    });

    test('첫 번째 호출', () => {});

    test('두 번째 호출 - mockReset 후에는 mock 구현도 초기화됨', () => {});
  });
});
