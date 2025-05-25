export function formatPhoneNumber(input: string): string {
    const digits = input.replace(/\D/g, "")

    if (digits.length === 0) return ""

    const firstGroup = digits.slice(0, 4)
    const rest = digits.slice(4)

    const restGroups = rest.match(/.{1,3}/g) || []

    return [firstGroup, ...restGroups].join(" ")
}
export function formatCurrencyVND(amount: number): string {
  const str = Math.round(amount).toString();
  const parts = [];

  for (let i = str.length; i > 0; i -= 3) {
    const start = Math.max(i - 3, 0);
    parts.unshift(str.slice(start, i));
  }

  return parts.join(".") + " VND";
}
