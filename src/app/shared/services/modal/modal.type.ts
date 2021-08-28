import React from "react";
import { ModalFuncProps } from "antd";

export interface ConfirmModalProps extends ModalFuncProps {
  banner?: React.ReactNode;
  bannerSrc?: string;
  header?: React.ReactNode;
  description?: React.ReactNode;
  danger?: boolean;
}

export interface VJModalType {
  destroy: () => void;
  update: (
    configUpdate:
      | ModalFuncProps
      | ((prevConfig: ModalFuncProps) => ModalFuncProps),
  ) => void;
}
