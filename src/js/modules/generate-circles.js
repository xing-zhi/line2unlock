export default function(width, height) {
  const minLen = Math.min(width, height),
        r = minLen / 10,
        d1 = (minLen - r * 6) / 6,
        d2 = d1 * 2,
        points = [d2 + r,
                  d2 + r * 3 + d1,
                  d2 + r * 5 + d1 * 2,
                  d2 + r * 7, d1 * 3],
        circles = new Map();

  for ( let i = 1; i <= 3; i++ ) {
    for ( let j = 1; j <= 3; j++ ) {
      const point = 3 * (i - 1) + j;

      circles.set(point, {
        text: point,
        r: r,
        x: points[j - 1],
        y: points[i - 1]
      });
    }
  }

  circles.set(0, {
    text: 0,
    r: r,
    x: points[1],
    y: points[3]
  });

  return circles;
}
