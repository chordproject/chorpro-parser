export abstract class DataHelper {
    public static toMinutesSeconds(duration: number): string {
        const minutes = Math.floor(duration / 60);
        const seconds = duration - minutes * 60;
        const formattedMinutes = minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        const formattedSeconds = seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    public static toProperCase(text: string): string {
        if (text.length < 1) {
            return text;
        }
        return text.charAt(0).toUpperCase() + text.substring(1).toLocaleLowerCase();
    }
}
