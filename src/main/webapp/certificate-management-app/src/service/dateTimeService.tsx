export default function formatDate(date: Date): String {
    if (date == null) {
        return 'NA'
    } else {
        const dateAsString = String(date);
        const dateFromString = new Date(dateAsString);
        const month = dateFromString.getMonth();
        const day = dateFromString.getDay();
        const year = dateFromString.getFullYear();

        return month + '/' + day + '/' + year;
    }
}