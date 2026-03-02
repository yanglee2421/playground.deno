export function timeout(delay: number = 0): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, delay));
}

export function toStringTag(param: unknown): string {
  return Object.prototype.toString
    .call(param)
    .replace(/\[object (\w+)\]/, "$1")
    .toLocaleLowerCase();
}

export function stringToColor(string: string): string {
  let hash = 0;

  for (let i = 0; i < string.length; i++) {
    // 9 << 3 => 9 * (2 ** 3) = 36
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

/**
 * Simplify catch error for promise
 * @param promise a promise with data
 * @param errMsg a string as error message if throwed is not a error
 * @returns a tuple, first element is the error last element is the data
 */
export async function catchError<TData>(
  promise: Promise<TData>,
  errMsg = "",
): Promise<readonly [Error, undefined] | readonly [undefined, TData]> {
  try {
    const data = await promise;
    return [void 0, data] as const;
  } catch (error) {
    if (error instanceof Error) {
      return [error, void 0] as const;
    }

    return [new Error(errMsg, { cause: error }), void 0] as const;
  }
}
