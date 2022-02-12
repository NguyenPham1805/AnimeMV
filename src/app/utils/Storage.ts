import { StorageInfo } from "src/types";

export default class Storage {
  public static clear(): void {
    localStorage.clear();
  }

  public static clearItem(storageKey: string) {
    localStorage.removeItem(storageKey);
  }

  public static remove(storageKey: string, filter: object): void {
    const rawList = localStorage.getItem(storageKey);

    if (!rawList) return;

    const list: object[] = JSON.parse(rawList);

    localStorage.setItem(
      storageKey,
      JSON.stringify(list.filter((item) => !compareTwoObject(item, filter)))
    );
  }

  public static create(storageKey: string, value: object): void {
    const rawList = localStorage.getItem(storageKey);

    if (!rawList) {
      return localStorage.setItem(storageKey, JSON.stringify([value]));
    }

    const list = JSON.parse(rawList);

    list.push(value);

    localStorage.setItem(storageKey, JSON.stringify(list));
  }

  public static findOne<T extends {}>(
    storageKey: string,
    filter = {}
  ): T | undefined {
    const rawList = localStorage.getItem(storageKey);

    if (!rawList) return undefined;

    const parseList: T[] = JSON.parse(rawList);

    if (isObjectEmpty(filter)) return parseList[0];

    return parseList.find((item) => compareTwoObject(item, filter));
  }

  public static find<T>(storageKey: string, filter = {}): T[] | [] {
    const rawList = localStorage.getItem(storageKey);

    if (!rawList) return [];

    const parseList = JSON.parse(rawList);

    if (isObjectEmpty(filter)) return parseList;

    return parseList.filter((item: StorageInfo) =>
      compareTwoObject(item, filter)
    );
  }

  public static findCombine<T>(storageKey: string, filter = {}): T[] | [] {
    const rawList = localStorage.getItem(storageKey);

    if (!rawList) return [];

    const parseList = JSON.parse(rawList);

    if (isObjectEmpty(filter)) return parseList;

    return parseList.filter(
      (item: StorageInfo) => !compareTwoObject(item, filter)
    );
  }

  public static updateItem(
    storageKey: string,
    filter: object,
    value: object
  ): void {
    this.remove(storageKey, filter);

    const item = this.findOne(storageKey, filter);

    const newList = { ...item, ...value };

    return this.create(storageKey, newList);
  }

  public static updateStore(
    storageKey: string,
    filter: object,
    value: object
  ): void {
    const list = this.findCombine(storageKey, filter);

    if (!list) return this.create(storageKey, value);

    const newList = [...list, value];

    localStorage.setItem(storageKey, JSON.stringify(newList));
  }
}

const isObjectEmpty = (obj: object) => JSON.stringify(obj) === "{}";

const compareTwoObject = <T, U extends keyof T>(obj1: T, obj2: T) => {
  let compareCount = 0;

  const entries = Object.entries(obj2);

  for (const [key, value] of entries) {
    if (obj1[key as U] === value) compareCount++;
  }

  return compareCount === entries.length;
};
