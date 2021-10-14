import LinkedList from '../linked-list/linked-list';
import * as utils from '../../utils';

export default class Stack<T> implements Iterable<T> {
  private list: LinkedList<T>;

  constructor(equalsFunction?: utils.EqualsFunctions<T>) {
    if (equalsFunction) this.list = new LinkedList(equalsFunction);
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

  push(element: T): void {
    this.list.addTail(element);
  }

  pop(): T | null {
    if (this.list.isEmpty()) return null;
    return this.list.deleteTail();
  }

  peek(): T | null {
    if (this.list.isEmpty()) return null;
    return this.list.getTail();
  }

  contains(element: T): boolean {
    return this.list.contains(element);
  }

  [Symbol.iterator](): Iterator<T> {
    return this.list[Symbol.iterator]();
  }
}
