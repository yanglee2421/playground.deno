// #region Array
export function chunk<TItem>(list: TItem[], size: number): Array<TItem[]> {
  if (!list.length) {
    return [];
  }

  const result: Array<TItem[]> = [];
  let firstIndexInNextLine = 0;

  while (firstIndexInNextLine < list.length) {
    result.push(list.slice(
      firstIndexInNextLine,
      firstIndexInNextLine += size,
    ));
  }

  return result;
}

type Falsey = null | undefined | false | "" | 0 | 0n;

export function compact<TItem>(list: Array<TItem | Falsey>): TItem[] {
  return list.filter(Boolean) as TItem[];
}

export function uniqBy<TItem>(
  list: TItem[],
  fn: keyof TItem | ((i: TItem) => unknown),
): TItem[] {
  return Array.from(
    list.reduce((map, i) => {
      const key = typeof fn === "function" ? fn(i) : Reflect.get(Object(i), fn);

      map.has(key) ?? map.set(key, i);

      return map;
    }, new Map<unknown, TItem>()).values(),
  );
}

// #endregion

// #region Collection

export function groupBy<TItem>(
  collection: TItem[] | Record<string, TItem>,
  fn: keyof TItem | ((i: TItem) => unknown),
): Record<string, TItem[]> {
  return Object.fromEntries(
    Object.values(collection).reduce((map, i) => {
      const key = typeof fn === "function" ? fn(i) : Reflect.get(Object(i), fn);
      const vals = map.get(key) || [];

      vals.push(i);
      map.set(key, vals);

      return map;
    }, new Map<unknown, Array<TItem>>()).entries(),
  ) as Record<string, TItem[]>;
}

// #endregion
