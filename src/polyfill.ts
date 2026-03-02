type CallbackFn<TArgs extends unknown[], TReturn> = (...args: TArgs) => TReturn;

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

export const debounce = <TArgs extends unknown[]>(
  fn: CallbackFn<TArgs, void>,
  delay = 0,
): CallbackFn<TArgs, void> => {
  let timer: number;
  return (...args: TArgs) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const isWithoutFalsy = (list: unknown[]) => {
  return list.every(Boolean);
};

export const isWithTruthy = (list: unknown[]) => {
  return list.some(Boolean);
};

export type ElementOf<TList> =
  TList extends Array<infer Element> ? Element : never;

export type ArgsOf<TFn> = TFn extends (...args: infer Args) => void
  ? Args
  : never;

export type ResultOf<TFn> = TFn extends () => infer Result ? Result : never;
