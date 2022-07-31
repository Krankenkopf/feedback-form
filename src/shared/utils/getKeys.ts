// TODO: get this from lodash
export const getKeys = Object.keys as <T extends Object>(obj: T) => Array<keyof T>;
