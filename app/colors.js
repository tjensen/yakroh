export const RED = '#c00';
export const GREEN = '#0c0';
export const BLUE = '#00c';

export const SOLID = 'SOLID';
export const HALF = 'HALF';
export const CLEAR = 'CLEAR';

export function fillColor(fill, color) {
  if (fill === SOLID) {
    return color;
  }
  else if (fill === CLEAR) {
    return '#fff';
  }
  else {
    switch (color) {
      case RED:
        return '#f88';
      case GREEN:
        return '#8f8';
      case BLUE:
        return '#88f';
    }
  }
}
