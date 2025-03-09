import React from 'react';
import { createPortal } from 'react-dom';
import style from "./modal.module.css"; // предполагаем, что стили модального окна в отдельном файле

interface ModalPortalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export const ModalPortal: React.FC<ModalPortalProps> = ({isOpen, onClose, children, className}) => {
    // Если модальное окно закрыто, не рендерим ничего
    if (!isOpen) return null;

    // Создаем портал, который будет рендерить содержимое в указанный DOM-элемент
    return createPortal(
        <div className={style.modalOverlay} onClick={onClose}>
            <div className={`${style.modalContent} ${className}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById('portal-root') || document.body // рендерим в специальный div или body
    );
};