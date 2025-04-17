/**
 * 날짜를 YYYY-MM-DD 형식의 문자열로 포맷팅합니다.
 * separator에 따라 포맷 방식이 달라질 수 있습니다.
 */
export function formatDate(date: Date, separator = "-") {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${separator}${month}${separator}${day}`;
}

/**
 * 두 날짜 간의 일수 차이를 계산합니다.
 */
export function daysDifference(date1: Date, date2: Date) {
  if (
    !(date1 instanceof Date) ||
    !(date2 instanceof Date) ||
    isNaN(date1.getTime()) ||
    isNaN(date2.getTime())
  ) {
    return NaN;
  }

  // 시간, 분, 초, 밀리초를 제외하고 날짜만 비교
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

/**
 * 날짜가 주말인지 확인합니다.
 * getDay의 반환값이 0이면 일요일, 6이면 토요일입니다.
 */
export function isWeekend(date: Date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return false;
  }

  const day = date.getDay();
  return day === 0 || day === 6;
}
