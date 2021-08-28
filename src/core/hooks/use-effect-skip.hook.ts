import { useEffect, useRef } from "react";

export default function useEffectSkip(
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined,
): void {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return effect();
    }

    didMountRef.current = true;
  }, deps);
}
