import React from "react";
// import DefaultBanner from "@/app/assets/images/confirm.png";

const ConfirmModalContent: React.FC<PropType> = ({
  banner = "",
  bannerSrc = "",
  header = "",
  description = "",
}) => {
  return (
    <div className="vj-confirm-modal-content">
      {/* <div className="vj-confirm-banner">
        {banner ||
          (bannerSrc ? <img src={bannerSrc} /> : <img src={DefaultBanner} />)}
      </div> */}
      <div className="vj-confirm-header font-title-25b">{header}</div>
      <div className="vj-confirm-desc font-body-17r">{description}</div>
    </div>
  );
};

type PropType = {
  banner?: React.ReactNode;
  bannerSrc?: string;
  header?: React.ReactNode;
  description?: React.ReactNode;
};

export { ConfirmModalContent };
