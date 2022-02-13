export function longOperation(interval: number): string {
    const startTime = new Date();
    while (true) {
        const currentTime = new Date();
        if (currentTime.valueOf() - startTime.valueOf() >= interval) {
            break;
        }
    }
    return `Operation Done in ${interval}ms!`;
}