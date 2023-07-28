export default class Utils {
    public static getRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static timeToString(time: number): string {
        var date = new Date(time);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
}
