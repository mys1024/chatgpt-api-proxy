export function ignoreErr<T>(fn: () => T) {
  try {
    return fn();
  } catch (_) {
    return undefined;
  }
}
