import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import Style from "./popup.module.scss";
import Image from "next/image";

const Popup = ({
    isOpen,
    title,
    width = 700,
    borderRadius = 20,
    isFullScreen = false,
    handleClose,
    isShowHeader = true,
    childClassName,
    containerClassName,
    children,
}:any) => {

     const handleClosePopup = () => {
        handleClose?.();
    };
    return (
        <div>
            <Dialog
                open={isOpen}
                 onClose={handleClosePopup}
                fullScreen={isFullScreen}
                aria-describedby="alert-dialog-slide-description"
                className={Style.dialog}
                PaperProps={{
                    style: {
                        background: "linear-gradient(133.09deg, #31597C 0%, #0E3F68 100%)",
                        backdropFilter: "blur(1px)",
                        width: width,
                        minHeight: 150,
                        borderRadius: borderRadius,
                    },
                }}
            >
                <div className={`${Style.container} ${containerClassName}`}>
                    {isShowHeader && (
                        <div className={Style.header}>
                            <DialogTitle>
                                <div className={Style.title}>
                                    <div>
                                        <h3 className={Style.popupContainer}>{title}</h3>
                                    </div>

                                    <div
                                        className={`${Style.closeIcon}`}
                                        onClick={handleClose}
                                    >
                                        <Image src="/icons/cross.svg" width={15} height={15}  alt="image"/>
                                    </div>

                                </div>
                            </DialogTitle>
                        </div>
                    )}
                    <div className={`${Style.content} ${childClassName}`}>{children}</div>
                </div>
            </Dialog>
        </div>
    );
};

export default Popup;