// #region Array

type Falsey = null | undefined | false | "" | 0 | 0n;

export function compact<TItem>(list: Array<TItem | Falsey>): TItem[] {
  return list.filter(Boolean) as TItem[];
}

export function uniqBy<TItem>(
  list: TItem[],
  fn: keyof TItem | ((i: TItem) => unknown),
): TItem[] {
  return Array.from(
    list
      .reduce((map, i) => {
        const key =
          typeof fn === "function" ? fn(i) : Reflect.get(Object(i), fn);

        map.has(key) ?? map.set(key, i);

        return map;
      }, new Map<unknown, TItem>())
      .values(),
  );
}

// #endregion
