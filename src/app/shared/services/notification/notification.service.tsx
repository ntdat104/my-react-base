import React from "react";
import { notification } from "antd";
import { ArgsProps } from "antd/lib/notification";
import classNames from "classnames";
import { ReactComponent as CloseIcon } from "@/app/assets/svgs/close.svg";

class NotificationService {
  open(options: ArgsProps): void {
    notification.open({
      duration: 2,
      placement: "bottomLeft",
      ...options,
      className: classNames("app-notification", options.className),
      closeIcon: <CloseIcon />,
    });
  }

  success(options: ArgsProps): void {
    this.open({
      ...options,
      className: classNames("app-notification-success", options.className),
    });
  }

  error(options: ArgsProps): void {
    this.open({
      ...options,
      className: classNames("app-notification-error", options.className),
    });
  }

  process(options: ArgsProps): void {
    this.open({
      ...options,
      className: classNames("app-notification-process", options.className),
    });
  }
}

export default new NotificationService();
