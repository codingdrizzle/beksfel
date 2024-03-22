function formatDate(dateString) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Split the date string into year, month, and day
    const [year, monthIndex, day] = dateString.split('-');

    // Get the month name from the months array using the monthIndex
    const monthName = months[parseInt(monthIndex) - 1];

    // Determine the suffix for the day (e.g., 1st, 2nd, 3rd, 4th, etc.)
    let daySuffix;
    if (day === '01' || day === '21' || day === '31') {
        daySuffix = 'st';
    } else if (day === '02' || day === '22') {
        daySuffix = 'nd';
    } else if (day === '03' || day === '23') {
        daySuffix = 'rd';
    } else {
        daySuffix = 'th';
    }

    // Return the formatted date string
    return `${parseInt(day)}${daySuffix} ${monthName} ${year}`;
}

export default formatDate;