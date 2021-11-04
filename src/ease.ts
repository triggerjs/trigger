import { BezierOption } from './type';

export function cubicBezier(
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number
) {
  const ZERO_LIMIT = 1e-6;
  // Calculate the polynomial coefficients,
  // implicit first and last control points are (0,0) and (1,1).
  const ax = 3 * p1x - 3 * p2x + 1;
  const bx = 3 * p2x - 6 * p1x;
  const cx = 3 * p1x;

  const ay = 3 * p1y - 3 * p2y + 1;
  const by = 3 * p2y - 6 * p1y;
  const cy = 3 * p1y;

  function sampleCurveDerivativeX(t: number) {
    // `ax t^3 + bx t^2 + cx t` expanded using Horner's rule
    return (3 * ax * t + 2 * bx) * t + cx;
  }

  function sampleCurveX(t: number) {
    return ((ax * t + bx) * t + cx) * t;
  }

  function sampleCurveY(t: number) {
    return ((ay * t + by) * t + cy) * t;
  }

  // Given an x value, find a parametric value it came from.
  function solveCurveX(x: number) {
    let t2 = x;
    let derivative;
    let x2;

    // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
    // first try a few iterations of Newton's method -- normally very fast.
    // http://en.wikipedia.org/wikiNewton's_method
    for (let i = 0; i < 8; i++) {
      // f(t) - x = 0
      x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < ZERO_LIMIT) {
        return t2;
      }
      derivative = sampleCurveDerivativeX(t2);
      // == 0, failure
      /* istanbul ignore if */
      if (Math.abs(derivative) < ZERO_LIMIT) {
        break;
      }
      t2 -= x2 / derivative;
    }

    // Fall back to the bisection method for reliability.
    // bisection
    // http://en.wikipedia.org/wiki/Bisection_method
    let t1 = 1;
    /* istanbul ignore next */
    let t0 = 0;

    /* istanbul ignore next */
    t2 = x;
    /* istanbul ignore next */
    while (t1 > t0) {
      x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < ZERO_LIMIT) {
        return t2;
      }
      if (x2 > 0) {
        t1 = t2;
      } else {
        t0 = t2;
      }
      t2 = (t1 + t0) / 2;
    }

    // Failure
    return t2;
  }

  function solve(x: number) {
    return sampleCurveY(solveCurveX(x));
  }

  return solve;
}

export const ease = cubicBezier(0.25, 0.1, 0.25, 1);

export const easeIn = cubicBezier(0.42, 0, 1, 1);

export const easeOut = cubicBezier(0, 0, 0.58, 1);

export const easeInOut = cubicBezier(0.42, 0, 0.58, 1);

// Default named bezier values
export const defaultBezier = {
  ease: cubicBezier(0.25, 0.1, 0.25, 1),
  easeIn: cubicBezier(0.42, 0, 1, 1),
  easeOut: cubicBezier(0, 0, 0.58, 1),
  easeInOut: cubicBezier(0.42, 0, 0.58, 1),
};

export function easePercentage(bezier: BezierOption, percentage: number): number {
  if (typeof bezier === 'string') {
    percentage = defaultBezier[bezier](percentage);
  } else {
    const [p1x, p1y, p2x, p2y] = bezier;
    percentage = cubicBezier(p1x, p1y, p2x, p2y)(percentage);
  }
  return percentage;
};