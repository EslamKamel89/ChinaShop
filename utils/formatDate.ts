export function formatDateInTable(date: string): string {
  return useDateFormat(new Date(date), "MMMM D, YYYY").value;
}
