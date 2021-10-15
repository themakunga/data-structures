/* eslint-disable no-unused-vars */
// function to check equality

export interface EqualsFunctions<T> {
  (a: T, b: T): boolean;
}

export interface CompareFunction<T> {
  (a: T, b: T): number;
}

export const defaultEquals = <T>(a: T, b: T): boolean => a === b;

export const VALUE_NOT_EXISTS_ERROR = 'Value does not exists';

// /**
//  * default function to compare elements order.
//  * @function
//  */
// export function defaultCompare<T>(a: T, b: T): number {
//   if (a < b) return -1;
//   if (a === b) return 0;
//   return 1;
// }
