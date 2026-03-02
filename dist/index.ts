type CallbackFn<TArgs extends unknown[], TReturn> = (...args: TArgs) => TReturn;

/**
 * Polyfill for `Promise.try` method, which is not yet widely supported.
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/try
 */
export const promiseTry = <TArgs extends unknown[], TReturn>(
  callback: CallbackFn<TArgs, TReturn>,
  ...args: TArgs
): Promise<TReturn> => {
  return new Promise<TReturn>((resolve) => resolve(callback(...args)));
};

/**
 * Polyfill for `Array.prototype.with` method, which is not yet widely supported.
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with
 */
export const arrayWith = <TEl>(
  array: TEl[],
  index: number,
  element: TEl,
): TEl[] => {
  return Array.from(array, (el, idx) => {
    if (idx === index) {
      return element;
    }

    return el;
  });
};

/**
 * Polyfill for `Array.prototype.groupBy` method, which is not yet widely supported.
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/groupBy
 */
export const mapGroupBy = <TElement, TKey>(
  items: TElement[],
  callbackFn: CallbackFn<[TElement, number], TKey>,
): Map<TKey, TElement[]> => {
  const resultMap = new Map<TKey, TElement[]>();

  items.reduce((latestResult, item, index) => {
    const mapKey = callbackFn(item, index);
    const mapValue = latestResult.get(mapKey);

    if (Array.isArray(mapValue)) {
      mapValue.push(item);
    } else {
      latestResult.set(mapKey, [item]);
    }

    return latestResult;
  }, resultMap);

  return resultMap;
};

/**
 * Clamps a number between a minimum and maximum value.
 * @param num The number to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped number.
 */
export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

/**
 * Checks if a number is within a specified range.
 * @param num The number to check.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns `true` if the number is within the range, `false` otherwise.
 */
export const isClamped = (num: number, min: number, max: number): boolean => {
  return Object.is(num, clamp(num, min, max));
};

/**
 * Returns the first element of an array or throws an error if the array is empty.
 * @param param0 The array to get the first element from.
 * @param createError A function that creates an error to be thrown if the array is empty.
 * @returns The first element of the array.
 */
export const atFirstOrThrow = <TElement>(
  [first]: TElement[],
  createError?: () => Error,
): TElement => {
  if (first) return first;

  if (typeof createError === "function") {
    throw createError();
  }

  throw new Error("First element is not available.");
};

/**
 * Checks if a value is an instance of `Error`.
 * @param value The value to check.
 * @returns `true` if the value is an `Error`, `false` otherwise.
 */
export const isError = (value: unknown): value is Error => {
  return value instanceof Error;
};

/**
 * Extracts the error message from an error object or returns a default message for unknown errors.
 * @param error The error to extract the message from.
 * @returns The error message.
 */
export const errorMessage = (error: unknown): string => {
  if (isError(error)) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unknown error occurred.";
};

/**
 * Splits an array into chunks of a specified size.
 * @param array The array to split into chunks.
 * @param size The size of each chunk.
 * @returns An array of chunks.
 */
export const chunk = <TElement>(
  array: TElement[],
  size: number,
): TElement[][] => {
  const result: TElement[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
};
