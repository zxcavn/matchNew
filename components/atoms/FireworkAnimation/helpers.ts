const pow = (base: number, exp: number): number => {
  let value = base;

  if (exp > 1) {
    for (let i = 2; i <= exp; i++) {
      value = value * base;
    }
  } else if (exp < 1) {
    for (let i = 0; i <= -exp; i++) {
      value = value / base;
    }
  }
  return value;
};

const fact = (num: number): number => {
  let fact = 1;

  if (num > 0) {
    for (let i = 1; i <= num; i++) {
      fact = fact * i;
    }
  }
  return fact;
};

const sin = (angle: number): number => {
  const a = angle;
  let sin = a;

  for (let n = 1; n <= 10; n++) {
    sin = sin + (pow(-1, n) / fact(2 * n + 1)) * pow(a, 2 * n + 1);
  }
  return sin;
};

const cos = (angle: number): number => {
  const a = angle;
  let cos = 1;

  for (let n = 1; n <= 10; n++) {
    cos = cos + (pow(-1, n) / fact(2 * n)) * pow(a, 2 * n);
  }
  return cos;
};

export { cos, fact, pow, sin };
