export function getSkeletonData<T extends object>(
  length: number,
  item: T,
): Array<T & { id: string }> {
  return Array.from({ length }, (_, i) => ({
    ...item,
    id: `skeleton-${i}`,
  }));
}
