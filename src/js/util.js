export function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
};

export function map(val, in_min, in_max, out_min, out_max){
  return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

export function numbercommas(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
