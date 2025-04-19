// src/utils/formatDate.ts
function formatDate(date: Date) {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date');
  }

  const year = date.getFullYear();
  // padStart: 첫 번째 인자(2)만큼의 길이가 될 때까지 두 번째 인자('0')를 추가
  // ex) 3 -> 03
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default formatDate;
