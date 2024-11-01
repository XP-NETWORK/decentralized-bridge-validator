export async function useMutexAndRelease<Lock, Return>(
  lock: () => Promise<readonly [Lock, () => void]>,
  func: (t: Lock) => Promise<Return>,
) {
  const [resource, release] = await lock();
  try {
    const res = await func(resource);
    return res;
  } finally {
    release();
  }
}
