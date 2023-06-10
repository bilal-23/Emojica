export const debounce = <T extends unknown[]>(callback: (...args: T) => void, delay: number) => {
    let timerId: NodeJS.Timeout;
    return (...args: T) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback.apply(null, args);
        }, delay);
    };
};