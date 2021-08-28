import { useTranslation } from "react-i18next";
import { i18n, TFunction } from "i18next";
import { Subject } from "rxjs";
import useSession from "./use-session.hook";
import useDestroy from "./use-destroy.hook";

export default function useCommon(): HookResult {
  const { resetSession } = useSession();
  const { destroy$ } = useDestroy();
  const { t: trans, i18n } = useTranslation("common");

  return { trans, i18n, resetSession, destroy$ };
}

type HookResult = {
  trans: TFunction;
  i18n: i18n;
  resetSession: () => Subject<void>;
  destroy$: Subject<void>;
};
