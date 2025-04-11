export function formatCurrency(
  amount: number,
  //
  locale: string = "ko-KR",
  currency: string = "KRW"
) {
  if (isNaN(amount)) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}
