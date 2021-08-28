import { useCallback } from "react";
import { Subject } from "rxjs";
import useDestroy from "./use-destroy.hook";

export default function useSession(): HookResult {
  const { setDestroy: setSession } = useDestroy();

  const resetSession = useCallback(() => {
    const newSession$ = new Subject<void>();
    setSession(newSession$);
    return newSession$;
  }, [setSession]);

  return { resetSession };
}

type HookResult = {
  resetSession: () => Subject<void>;
};
