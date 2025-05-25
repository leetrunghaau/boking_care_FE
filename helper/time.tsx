
const dayNames = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7" ]
type TimeRange = {
    weekend: number;      
    timeStart: number;   
    timeEnd: number;      
};

export function getWeekendByIndex(index: number): string {
    return dayNames[index]

}

export function getTimeFormat(time: number): string {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}
export function parseTimeFormat(timeStr: string): number {
    const [hoursStr, minutesStr] = timeStr.split(':');

    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    return hours * 60 + minutes;
}

export function getReadableTimeRanges(times: TimeRange[]): string[] {

    const groups: { [key: string]: number[] } = {};

    for (const t of times) {
        const key = `${t.timeStart}-${t.timeEnd}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(t.weekend);
    }

    const result: string[] = [];

    for (const key in groups) {
        const [start, end] = key.split('-').map(Number);
        const days = groups[key].sort((a, b) => a - b);

        let range = '';
        if (days.length === 1) {
            range = `${dayNames[days[0]]}`;
        } else {
            range = `${dayNames[days[0]]} - ${dayNames[days[days.length - 1]]}`;
        }

        result.push(`${range}: ${getTimeFormat(start)} - ${getTimeFormat(end)}`);
    }

    return result;
}
