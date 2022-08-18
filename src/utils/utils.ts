export const pstTime = (time: string) => {
    return new Date(time).toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        // hour: 'numeric',
        // minute: 'numeric',
        // hour12: true,
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
};
