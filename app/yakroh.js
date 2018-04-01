export function allTheSame(input) {
  return 1 === new Set(input).size;
}

export function allDifferent(input) {
  return input.length === new Set(input).size;
}

export function yakroh(input) {
  const keys = new Set(input.reduce((all, item) => all.concat(Object.keys(item)), []));
  for (let key of keys.keys()) {
    const values = input.map((item) => item[key]);
    if (!allTheSame(values) && !allDifferent(values)) {
      return false;
    }
  }
  return true;
}
