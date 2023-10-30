"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
};

function Modal({
  isOpen,
  onClose,
  onSubmit,
  secondaryAction,
  secondaryLabel,
  title,
  body,
  footer,
  disabled,
  actionLabel,
}: Props) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-neutral-800/70 z-50 flex items-center justify-center 
      overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
      >
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 h-full md:h-auto my-6 mx-auto">
          {/* CONTENT */}
          <div
            className={`translate duration-300 h-full ${
              showModal
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <div
              className="translate h-full md:h-auto lg:h-auto border-0 rounded-lg shadow-lg 
            relative flex flex-col w-full bg-white outline-none focus:outline-none"
            >
              {/* HEADER */}
              <div className="flex items-center rounded-t p-6 justify-center relative border-b">
                <button
                  onClick={handleClose}
                  className="
                    p-1
                    border-0 
                    transition 
                    absolute 
                    left-9 
                    hover:bg-neutral-100 
                    rounded-full
                  "
                >
                  <IoMdClose size={18} />
                </button>

                <div className="text-lg font-semibold">{title}</div>
              </div>

              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>

              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex items-center gap-4 w-full">
                  {secondaryAction && secondaryLabel && (
                    <Button
                      outline
                      label={secondaryLabel}
                      onClick={handleSecondaryAction}
                      disabled={disabled}
                    />
                  )}

                  <Button
                    label={actionLabel}
                    disabled={disabled}
                    onClick={handleSubmit}
                  />
                </div>

                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
