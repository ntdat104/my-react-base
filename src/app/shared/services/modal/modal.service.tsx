import React from "react";
import { ModalFuncProps } from "antd";
import classNames from "classnames";
import { ConfirmModalContent } from "./modal.component";
import { ConfirmModalProps, VJModalType } from "./modal.type";
import { ModalStaticFunctions } from "antd/lib/modal/confirm";

class ModalService {
  public modal!: Omit<ModalStaticFunctions, "warn">;

  private count = 0;

  private displayingModals = new Map<number, VJModalType>();

  public destroyAll() {
    this.displayingModals.forEach((modal) => {
      modal.destroy();
    });
  }

  confirm(options: ConfirmModalProps): VJModalType {
    const confirmModal = this.modal.confirm({
      content: (
        <ConfirmModalContent
          banner={options.banner}
          bannerSrc={options.bannerSrc}
          header={options.header}
          description={options.description}
        />
      ),
      centered: true,
      maskClosable: true,
      icon: null,
      okButtonProps: {
        className: classNames({
          "vj-btn vj-confirm-ok": true,
          "vj-btn-primary": !options.danger,
          "vj-btn-red": options.danger,
        }),
      },
      cancelButtonProps: {
        className: "vj-btn vj-btn-cancel vj-confirm-cancel",
      },
      ...options,
      className: classNames("vj-confirm-modal", options.className),
    });
    const key = this.count++;
    const result: VJModalType = {
      destroy: () => {
        this.displayingModals.delete(key);
        confirmModal.destroy();
      },
      update: confirmModal.update,
    };
    this.displayingModals.set(key, result);
    return result;
  }

  info(options: ModalFuncProps): VJModalType {
    const infoModal = this.modal.info({
      icon: null,
      maskClosable: true,
      closable: true,
      centered: true,
      // closeIcon: <CloseFillIcon />,
      ...options,
      className: classNames("vj-info-modal", options.className),
    });

    const key = this.count++;
    const result: VJModalType = {
      destroy: () => {
        this.displayingModals.delete(key);
        infoModal.destroy();
      },
      update: infoModal.update,
    };
    this.displayingModals.set(key, result);
    return result;
  }
}

export default new ModalService();
