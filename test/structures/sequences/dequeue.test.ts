import DeQueue from '../../../src/structures/sequences/dequeue';

describe('DeQueue', () => {
  let dequeue: DeQueue<number>;

  beforeEach(() => {
    dequeue = new DeQueue();
  });

  describe('empty dequeue', () => {
    it('return null when try to read on empty dequeue', () => {
      expect(dequeue.getHead()).toBe(null);
      expect(dequeue.getTail()).toBe(null);
    });

    it('return null when try to remove data from empty dequeue', () => {
      expect(dequeue.pop()).toBe(null);
      expect(dequeue.shift()).toBe(null);
    });
  });

  it('is empty', () => {
    expect(dequeue.isEmpty()).toBe(true);
  });

  describe('Enqueue data', () => {
    it('push to front', () => {
      dequeue.unshift(1);
      expect(dequeue.size()).toBe(1);

      dequeue.unshift(2);
      expect(dequeue.size()).toBe(2);

      dequeue.unshift(3);
      expect(dequeue.size()).toBe(3);
    });

    it('push to tail', () => {
      dequeue.push(1);
      expect(dequeue.size()).toBe(1);

      dequeue.push(2);
      expect(dequeue.size()).toBe(2);

      dequeue.push(3);
      expect(dequeue.size()).toBe(3);
    });
  });

  describe('remove from queue', () => {
    it('detele from front', () => {
      dequeue.unshift(3);
      dequeue.unshift(2);
      dequeue.unshift(1);

      const val1 = dequeue.shift();
      expect(val1).toBe(1);
      expect(dequeue.size()).toBe(2);

      const val2 = dequeue.shift();
      expect(val2).toBe(2);
      expect(dequeue.size()).toBe(1);

      const val3 = dequeue.shift();
      expect(val3).toBe(3);
      expect(dequeue.size()).toBe(0);
    });

    it('delete from tail', () => {
      dequeue.push(1);
      dequeue.push(2);
      dequeue.push(3);

      const val1 = dequeue.pop();
      expect(val1).toBe(3);
      expect(dequeue.size()).toBe(2);

      const val2 = dequeue.pop();
      expect(val2).toBe(2);
      expect(dequeue.size()).toBe(1);

      const val3 = dequeue.pop();
      expect(val3).toBe(1);
      expect(dequeue.size()).toBe(0);
    });
  });

  it('find an element', () => {
    expect(dequeue.contains(1)).toBe(false);

    dequeue.push(1);
    dequeue.push(2);
    dequeue.push(3);

    expect(dequeue.contains(1)).toBe(true);
    expect(dequeue.contains(2)).toBe(true);
    expect(dequeue.contains(8)).toBe(false);
  });

  it('peeks', () => {
    dequeue.push(1);
    expect(dequeue.getHead()).toBe(1);
    expect(dequeue.getTail()).toBe(1);
    expect(dequeue.size()).toBe(1);

    dequeue.push(2);
    expect(dequeue.getHead()).toBe(1);
    expect(dequeue.getTail()).toBe(2);
    expect(dequeue.size()).toBe(2);
  });

  it('clear list', () => {
    dequeue.push(1);
    dequeue.push(2);
    dequeue.push(3);
    dequeue.push(4);
    dequeue.push(5);
    dequeue.push(6);
    dequeue.push(7);
    dequeue.clear();
    expect(dequeue.isEmpty()).toBe(true);

    dequeue.push(1);
    dequeue.clear();
    expect(dequeue.isEmpty()).toBe(true);

    dequeue.clear();
    expect(dequeue.isEmpty()).toBe(true);
  });

  it('is iterable', () => {
    const nums = [1, 2, 3];

    for (const n of nums) {
      dequeue.push(n);
    }

    let i = 0;
    for (const n of dequeue) {
      expect(n).toBe(nums[i]);
      i += 1;
    }
  });
});

describe('Queue - complex object', () => {
  class Hero {
    heroId: number;

    hunger: number;

    health: number;

    constructor(id: number) {
      this.heroId = id;
      this.hunger = 100;
      this.health = 100;
    }
  }

  const sameHeroF = (a: Hero, b: Hero) => a.heroId === b.heroId;

  let queue: DeQueue<Hero>;

  beforeAll(() => {
    const knight = new Hero(123);
    const archer = new Hero(456);
    const mage = new Hero(789);

    queue = new DeQueue(sameHeroF);

    queue.push(knight);
    queue.push(archer);
    queue.push(mage);
  });

  it('checks if queue contains hero', () => {
    const knight = new Hero(123);
    const mage = new Hero(789);

    expect(queue.contains(knight)).toBe(true);
    expect(queue.contains(mage)).toBe(true);
    expect(queue.contains(new Hero(246))).toBe(false);
  });
});
