import { isClamped } from "#dist/index.ts";
import { chunk } from "@yotulee/run";

type CellValue = null | number;
type CellValueTuple = [CellValue, CellValue, CellValue];

const getCellValue = (first: number, elements: number[]): CellValueTuple => {
  const isFirstValid = elements.includes(first);

  if (!isFirstValid) {
    return [null, null, null];
  }

  const second = params.find((i) => {
    const excepted = first + 10;
    return isClamped(i, excepted - 3, excepted + 3);
  });

  if (!second) {
    return [first, null, null];
  }

  const third = params.find((i) => {
    const excepted = second + 5;
    return isClamped(i, excepted - 3, excepted + 3);
  });

  if (!third) {
    return [first, second, null];
  }

  return [first, second, third];
};

const numbersToCellValueMap = (params: number[]) => {
  const numberToCellValueMap = new Map<number, CellValueTuple>();

  return params.reduce((numberToCellValueMap, i) => {
    const cellValues = getCellValue(i, params);
    numberToCellValueMap.set(i, cellValues);

    return numberToCellValueMap;
  }, numberToCellValueMap);
};

const getIsOk = (params: number[]) => {
  const numberToCellValueMap = numbersToCellValueMap(params);
  const isOk = [...numberToCellValueMap.entries()].some(([, tuple]) => {
    return tuple.every((value) => typeof value === "number");
  });
  return [isOk, numberToCellValueMap] as const;
};

// const params = [185, 195, 196, 200];
// const params = [209, 210, 198, 216];
// const params = [198, 209, 210, 209];
// const params = [210];
// const params = [190, 206, 200, 189];
// const params = [199, 189, 206];
const params = [205, 212, 194];
const [isOk, numberToCellValueMap] = getIsOk(params);

console.log(
  `Validation passed with cursors: ${JSON.stringify(
    Object.fromEntries(numberToCellValueMap.entries()),
    null,
    2,
  )}`,
);

console.log(
  `Validation result: ${isOk ? "OK" : "FAIL"} for params: ${params.join(", ")}`,
);

const szMemo =
  "0000000101000001030000010400000180000001810000018300000184000001";
// "000000010100000102000001030000010400000105000001060000010700000108000001800000018100000182000001830000018400000185000001860000018700000188000001";

const fn = (szMemo: string) => {
  const list = szMemo.split("");
  const channelInfoList = chunk(list, 8).map((item) => item.join(""));

  const resolveDefectType = (value: string) => {
    switch (value) {
      case "1":
        return "裂纹";
      case "2":
        return "透声不良";
      case "4":
        return "晶粗";
      case "8":
        return "压装不良";
      default:
        return "未知";
    }
  };

  const resolveDirection = (value: string) => {
    switch (value) {
      case "0":
        return "左";
      case "8":
        return "右";
      default:
        return "未知";
    }
  };

  const resolvePlace = (value: string) => {
    switch (value) {
      case "0":
        return "穿透";
      case "1":
        return "卸荷槽";
      case "2":
        return "轮座";
      case "3":
        return "外";
      case "4":
        return "内";
      default:
        return "未知";
    }
  };

  const metaList = channelInfoList.map((item) => {
    const direction = item.at(0) || "";
    const place = item.at(1) || "";
    const defectType = item.at(-1) || "";

    return {
      defectType: resolveDefectType(defectType),
      direction: resolveDirection(direction),
      place: resolvePlace(place),
      original: item,
    };
  });

  return metaList;
};

fn(szMemo);
