
function toDecimal(number, ref) {
  const refMult = { N: 1, E: 1, S: -1, W: -1 };
  const out = (number[0] + (number[1] / 60) + (number[2] / 3600)) * refMult[ref];
  return out;
}

export { toDecimal };
