import LinkedListNode from './linked-list-node';
import * as utils from '../../utils';

interface List<T> {
  head: LinkedListNode<T>;
  tail: LinkedListNode<T>;
  size: number;
}

export default class LinkedList<T> implements Iterable<T> {
  private list: List<T> | undefined;

  private equalsF: utils.EqualsFunctions<T> = utils.defaultEquals;

  /**
   * create a linked list bigO O(1)
   * @param equalsFunction, equal function for non-primitive values
   */

  constructor(equalsFunction?: utils.EqualsFunctions<T>) {
    this.list = undefined;
    if (equalsFunction) this.equalsF = equalsFunction;
  }

  // inspect data
  /**
   * return the size O(1)
   * @return number
   */
  size(): number {
    if (this.list) return this.list.size;
    return 0;
  }

  isEmpty(): boolean {
    return !this.list;
  }

  // insertions
  /**
   * add node to the head of the list o(1)
   * @param {T} value
   * @return {boolean}
   */
  addHead(val: T): boolean {
    const newNode = new LinkedListNode(val);
    if (this.list) {
      this.list.head.prev = newNode;
      newNode.next = this.list.head;
      this.list.head = newNode;
      this.list.size += 1;
    } else {
      this.list = {
        head: newNode,
        tail: newNode,
        size: 1,
      };
    }
    return true;
  }

  /**
   * add node to tail O(1)
   * @param {T} value
   * @return {boolean}
   */
  addTail(val: T): boolean {
    const newNode = new LinkedListNode(val);
    if (this.list) {
      this.list.tail.next = newNode;
      newNode.prev = this.list.tail;
      this.list.tail = newNode;
      this.list.size += 1;
    } else {
      this.list = {
        head: newNode,
        tail: newNode,
        size: 1,
      };
    }
    return true;
  }

  /**
   * add at n index O(n)
   * @param {number} i - index
   * @param {T} value
   * @return {boolean}
   */
  addAt(i: number, val: T): boolean {
    if (i === 0) {
      return this.addHead(val);
    }

    if (i === this.size()) {
      return this.addTail(val);
    }

    if (i < 0 || i >= this.size() || !this.list) return false;

    let cur = this.list.head;
    // traverse to index
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < i - 1; j++) {
      cur = cur.next! // eslint-disable-line
    }

    const newNode = new LinkedListNode(val);

    // link next node
    cur.next!.prev = newNode // eslint-disable-line
    newNode.next = cur.next;

    // link prev node
    newNode.prev = cur;
    cur.next = newNode;

    this.list.size += 1;

    return true;
  }

  // accessing data
  getHead(): T | null {
    if (!this.list) return null;
    return this.list.head.val;
  }

  getTail(): T | null {
    if (!this.list) return null;
    return this.list.tail.val;
  }

  get(i: number): T | null {
    if (i < 0 || i >= this.size() || !this.list) {
      return null;
    }
    let j = 0;
    let current = this.list.head;
    while (j < i) {
      current = current.next!;
      j++; // eslint-disable-line
    }

    return current.val;
  }

  // searching
  indexOf(val: T): number {
    if (!this.list) return -1;

    let i = 0;
    let current = this.list.head;

    while (!this.equalsF(current.val, val)) {
      // current.next === null means we reached end of list without finding element
      if (!current.next) return -1;

      current = current.next;
      i += 1;
    }

    return i;
  }

  contains(value: T): boolean {
    const index = this.indexOf(value);

    return index !== -1;
  }

  deleteHead(): T | null {
    if (!this.list) return null;
    const { val } = this.list.head;

    if (this.list.head.next) {
      this.list.head.next.prev = null;
      this.list.head = this.list.head.next;

      this.list.size -= 1;
    } else {
      this.list = undefined;
    }

    return val;
  }

  deleteTail(): T | null {
    if (!this.list) return null;
    const { val } = this.list.tail;

    if (this.list.tail.prev) {
      this.list.tail.prev.next = null;
      this.list.tail = this.list.tail.prev;

      this.list.size -= 1;
    } else {
      this.list = undefined;
    }

    return val;
  }

  deleteValue(val: T): T | null {
    const index = this.indexOf(val); // O(n)
    if (index === -1) return null;

    return this.deleteAt(index); // O(n)
  }

  deleteAt(i: number): T | null {
    if (!this.list) return null;

    if (i === 0) return this.deleteHead();
    if (i === this.size() - 1) return this.deleteTail();
    if (i < 0 || i >= this.list.size) return null;

    let j = 0;
    let cur = this.list.head;

    while (j < i) {
      cur = cur.next!;
      j += 1;
    }
    cur.prev!.next = cur.next;
    cur.next!.prev = cur.prev;

    this.list.size -= 1;

    return cur.val;
  }

  clear(): void {
    this.list = undefined;
  }

  fromArray(A: T[]): LinkedList<T> {
    A.forEach((a: T) => {
      this.addTail(a);
    });
    return this;
  }

  * [Symbol.iterator](): Iterator<T> {
    if (!this.list) return;

    let cur: LinkedListNode<T> | null;

    for (cur = this.list.head; cur != null; cur = cur.next) {
      yield cur.val;
    }
  }
}
