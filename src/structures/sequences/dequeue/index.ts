import LinkedList from '../linked-list/linked-list';
import * as utils from '../../utils';

export default class DeQueue<T> implements Iterable<T> {
  private list: LinkedList<T>;

  constructor(equalsFn?: utils.EqualsFunctions<T>) {
    if (equalsFn) this.list = new LinkedList(equalsFn);
    else this.list = new LinkedList();
  }

  size(): number {
    return this.list.size();
  }

  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  clear(): void {
    this.list.clear();
  }

  /**
   * add element to start list O(1)
   * @param {T} element
   *
   */
  unshift(element: T): void {
    this.list.addHead(element);
  }

  /**
    * add element to the end O(1)
    * @param {T} element
    */
  push(element: T): void {
    this.list.addTail(element);
  }

  /**
   *  remove last first element in list O(1)
   * @returns {T} {null}
   */
  shift(): T | null {
    if (this.isEmpty()) return null;
    return this.list.deleteHead();
  }

  /**
   * delete las element from list O(1)
   * @returns {T}
   */
  pop(): T | null {
    if (this.isEmpty()) return null;
    return this.list.deleteTail();
  }

  /**
   * return first item in list O(1)
   * @returns {T}
   */
  getHead(): T | null {
    if (this.isEmpty()) return null;
    return this.list.getHead();
  }

  /**
   * return last irem in list O(1)
   * @returns {T}
   */
  getTail(): T | null {
    if (this.isEmpty()) return null;
    return this.list.getTail();
  }

  /**
   * return bool if element exists in list O(n)
   * @param {T} element
   * @returns boolean
   */
  contains(element: T): boolean {
    return this.list.contains(element);
  }

  [Symbol.iterator](): Iterator<T> {
    return this.list[Symbol.iterator]();
  }
}
