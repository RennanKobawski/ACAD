export function generateDynamicUrl(basePath: string, date = new Date()) {
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(date.getDate()).padStart(2, '0');
    return `${basePath}/${formattedMonth}/${formattedDay}`;
}
