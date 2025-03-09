export function dbTimeForHuman(str) {
    const date = new Date(str); // Parse input date string
    const options = {
        timeZone: "Asia/Kolkata", // Set IST timezone
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Use 12-hour format with AM/PM
    };
    return new Intl.DateTimeFormat("en-IN", options).format(date);
}
