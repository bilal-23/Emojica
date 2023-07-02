export function formatDate(dateString: Date) {
    var date = new Date(dateString);
    var currentDate = new Date();

    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);

    if (isSameDay(date, currentDate)) {
        return "Today at " + hours + ":" + minutes;
    } else if (isYesterday(date, currentDate)) {
        return "Yesterday at " + hours + ":" + minutes;
    } else {
        return day + "/" + month + "/" + year + " : " + hours + ":" + minutes;
    }
}

function isSameDay(date1: Date, date2: Date) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

function isYesterday(date1: Date, date2: Date) {
    var yesterday = new Date(date2);
    yesterday.setDate(date2.getDate() - 1);

    return (
        date1.getFullYear() === yesterday.getFullYear() &&
        date1.getMonth() === yesterday.getMonth() &&
        date1.getDate() === yesterday.getDate()
    );
}