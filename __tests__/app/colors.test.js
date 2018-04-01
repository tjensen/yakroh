import {
  RED, GREEN, BLUE,
  SOLID, HALF, CLEAR,
  fillColor
} from '../../app/colors';

describe('fillColor', () => {
  it('returns SOLID fill hex colors', () => {
    expect(fillColor(SOLID, RED)).toBe(RED);
    expect(fillColor(SOLID, GREEN)).toBe(GREEN);
    expect(fillColor(SOLID, BLUE)).toBe(BLUE);
  });

  it('returns HALF fill hex colors', () => {
    expect(fillColor(HALF, RED)).toBe('#f88');
    expect(fillColor(HALF, GREEN)).toBe('#8f8');
    expect(fillColor(HALF, BLUE)).toBe('#88f');
  });

  it('returns CLEAR fill hex colors', () => {
    expect(fillColor(CLEAR, RED)).toBe('#fff');
    expect(fillColor(CLEAR, GREEN)).toBe('#fff');
    expect(fillColor(CLEAR, BLUE)).toBe('#fff');
  });
});
