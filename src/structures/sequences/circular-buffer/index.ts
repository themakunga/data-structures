import * as utils from '../../utils';

export default class CircularBuffer<T> {
  private list: T[];

  private currentSize: number;

  private capacity: number;

  private readIndex: number;

  private writeIndex: number;

  private equalsF: utils.EqualsFunctions<T>;

  constructor(capacity: number, equalsFn?: utils.EqualsFunctions<T>) {
    this.list = new Array(capacity);
    this.currentSize = 0;
    this.capacity = capacity;

    this.readIndex = 0;
    this.writeIndex = 0;

    this.equalsF = equalsFn || utils.defaultEquals;
  }

  size(): number {
    return this.currentSize;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * delete all elements in the buffer O(capacity)
   */
  clear(): void {
    this.list = new Array(this.capacity);
    this.currentSize = 0;
  }

  /**
   * add element into the queue O(1)
   * @param {T} element
   */
  enqueue(element: T): void {
    this.list[this.writeIndex] = element;

    const elementIsOverwritten = this.currentSize !== 0 && this.writeIndex === this.readIndex;
    if (elementIsOverwritten) {
      this.readIndex = (this.readIndex + 1) % this.capacity;
    }
    this.writeIndex = (this.writeIndex + 1) % this.capacity;

    this.currentSize += 1;
  }

  /**
   * remove the last element in the queue O(1)
   * @returns {T} or null
   */
  dequeue(): T | null {
    if (this.isEmpty()) return null;

    const removedVal = this.list[this.readIndex];
    this.readIndex = (this.readIndex + 1) % this.capacity;

    this.currentSize -= 1;

    return removedVal;
  }

  /**
   * get the first item in the current buffer O(1);
   * @returns {T}
   */
  getHead(): T | null {
    if (this.isEmpty()) return null;

    return this.list[this.readIndex];
  }

  /**
   * get the last item in the buffer O(1)
   * @returns {T}
   */
  getTail(): T | null {
    if (this.isEmpty()) return null;

    let i = this.writeIndex - 1;
    if (i < 0) i = this.capacity - 1;

    return this.list[i];
  }

  contains(element: T): boolean {
    return this.list.some((val: T) => this.equalsF(val, element));
  }
}
