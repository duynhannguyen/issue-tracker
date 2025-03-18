export const useDebounce = <T extends (...args: any[]) => void>(
  cb: T,
  delay = 1000
) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
