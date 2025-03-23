import React from 'react';
import { createPortal } from 'react-dom';
import style from "./modal.module.css";

interface ModalPortalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export const ModalPortal: React.FC<ModalPortalProps> = ({isOpen, onClose, children, className}) => {

    if (!isOpen) return null;

    return createPortal(
        <div className={style.modalOverlay} onClick={onClose}>
            <div className={`${style.modalContent} ${className}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById('portal-root') || document.body
    );
};