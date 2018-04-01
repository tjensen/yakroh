import {
  allTheSame,
  allDifferent,
  yakroh
} from '../../app/yakroh';

describe('allTheSame', () => {
  it('returns false when input is empty array', () => {
    expect(allTheSame([])).toBe(false);
  });

  it('returns true when input has only one element', () => {
    expect(allTheSame([42])).toBe(true);
  });

  it('returns true when all elements are the same', () => {
    expect(allTheSame([5, 5, 5, 5, 5])).toBe(true);
  });

  it('returns false when all elements are different', () => {
    expect(allTheSame([1, 2, 3])).toBe(false);
  });

  it('returns false when some elements are different', () => {
    expect(allTheSame([1, 1, 1, 9])).toBe(false);
  });
});

describe('allDifferent', () => {
  it('returns true when input is empty array', () => {
    expect(allDifferent([])).toBe(true);
  });

  it('returns true when input has only one element', () => {
    expect(allDifferent([42])).toBe(true);
  });

  it('returns false when all elements are the same', () => {
    expect(allDifferent([5, 5, 5, 5, 5])).toBe(false);
  });

  it('returns true when all elements are different', () => {
    expect(allDifferent([1, 2, 3])).toBe(true);
  });

  it('returns false when some elements are different', () => {
    expect(allDifferent([1, 1, 1, 9])).toBe(false);
  });
});

describe('yakroh', () => {
  it('returns true when input is empty array', () => {
    expect(yakroh([])).toBe(true);
  });

  it('returns true when input contains empty objects', () => {
    expect(yakroh([{}, {}, {}])).toBe(true);
  });

  it('returns false when input contains objects with disjoint keys', () => {
    expect(yakroh([
      {foo: 'bar'},
      {cat: 'pants'},
      {dead: 'beef'},
      {answer: 42}
    ])).toBe(false);
  });

  it('returns true when all values match', () => {
    expect(yakroh([
      {foo: 'bar', cat: 'pants', answer: 42},
      {foo: 'bar', cat: 'pants', answer: 42}
    ])).toBe(true);
  });

  it('returns true when all values are different', () => {
    expect(yakroh([
      {foo: 'baz', cat: 'food', answer: 0},
      {foo: 'bar', cat: 'pants', answer: 42}
    ])).toBe(true);
  });

  it('returns true when some values are all the same and some values are all different', () => {
    expect(yakroh([
      {foo: 'bar', answer: 0},
      {foo: 'bar', answer: 42},
      {foo: 'bar', answer: 2112},
      {foo: 'bar', answer: -3}
    ])).toBe(true);
  });

  it('returns false when some values are not all the same and are not all different', () => {
    expect(yakroh([
      {foo: 'bar', answer: 42},
      {foo: 'bar', answer: 42},
      {foo: 'bar', answer: 42},
      {foo: 'bar', answer: 1776}
    ])).toBe(false);
  });
});
