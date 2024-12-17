export function generateDynamicHref(href: string, role?: string): string {
  const currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentDay = String(currentDate.getDate()).padStart(2, "0");

  if (href === "/abertura-talao" && role) {
    if (role === "OperationalAgent") {
      return `${href}/${currentMonth}`;
    } else if (role === "UCCOPAgent") {
      return `${href}/${currentMonth}/${currentDay}`;
    }
  }

  if (href === "/atendimento-0800") {
    return `${href}/${currentMonth}/${currentDay}`;
  }
  return href;
}
