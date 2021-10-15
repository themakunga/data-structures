import CircularBuffer from '../../../src/structures/sequences/circular-buffer';

describe('Circular Buffer', () => {
  let buffer: CircularBuffer<number>;

  beforeEach(() => {
    buffer = new CircularBuffer(4);
  });

  describe('empty buffer', () => {
    it('return null when dequeue empty buffer', () => {
      expect(buffer.dequeue()).toBe(null);
    });

    it('return null when get is called on empty buffer', () => {
      expect(buffer.getHead()).toBe(null);
      expect(buffer.getTail()).toBe(null);
    });

    it('is empty', () => {
      expect(buffer.isEmpty()).toBe(true);
    });
  });

  it('insert to queue', () => {
    buffer.enqueue(1);
    expect(buffer.size()).toBe(1);

    buffer.enqueue(2);
    expect(buffer.size()).toBe(2);

    buffer.enqueue(3);
    expect(buffer.size()).toBe(3);
  });

  it('remove from queue', () => {
    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.enqueue(3);

    buffer.dequeue();
    expect(buffer.size()).toBe(2);

    buffer.dequeue();
    expect(buffer.size()).toBe(1);

    buffer.dequeue();
    expect(buffer.size()).toBe(0);
  });

  it('overwrites', () => {
    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.enqueue(3);
    buffer.enqueue(4);
    buffer.enqueue(5);
    expect(buffer.contains(1)).toBe(false);
    expect(buffer.getHead()).toBe(2);
    expect(buffer.getTail()).toBe(5);
  });

  it('clears the buffer', () => {
    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.enqueue(3);
    buffer.enqueue(4);
    buffer.clear();
    expect(buffer.isEmpty()).toBe(true);

    buffer.enqueue(1);
    buffer.clear();
    expect(buffer.isEmpty()).toBe(true);

    buffer.clear();
    expect(buffer.isEmpty()).toBe(true);
  });

  describe('get data', () => {
    it('get head', () => {
      buffer.enqueue(1);
      expect(buffer.getHead()).toBe(1);
      expect(buffer.getTail()).toBe(1);

      buffer.enqueue(2);
      expect(buffer.getHead()).toBe(1);
      expect(buffer.getTail()).toBe(2);
    });
    it('get tail', () => {
      buffer.enqueue(1);
      buffer.enqueue(2);
      buffer.enqueue(3);
      buffer.enqueue(4);

      expect(buffer.getTail()).toBe(4);
    });
    it('find if buffer contains element', () => {
      expect(buffer.contains(1)).toBe(false);
      buffer.enqueue(1);
      buffer.enqueue(2);
      buffer.enqueue(3);

      expect(buffer.contains(1)).toBe(true);
      expect(buffer.contains(3)).toBe(true);
      expect(buffer.contains(8)).toBe(false);
    });
  });
});

describe('Circular Buffer - complex object', () => {
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

  let buffer: CircularBuffer<Hero>;

  beforeAll(() => {
    const knight = new Hero(123);
    const archer = new Hero(456);
    const mage = new Hero(789);

    buffer = new CircularBuffer(3, sameHeroF);

    buffer.enqueue(knight);
    buffer.enqueue(archer);
    buffer.enqueue(mage);
  });

  it('checks if queue contains hero', () => {
    const knight = new Hero(123);
    const mage = new Hero(789);

    expect(buffer.contains(knight)).toBe(true);
    expect(buffer.contains(mage)).toBe(true);
    expect(buffer.contains(new Hero(246))).toBe(false);
  });
});
