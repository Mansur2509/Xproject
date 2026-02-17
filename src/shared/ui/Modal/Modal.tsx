import { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import './Modal.css';

export type ModalProps = {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: (reason: 'backdrop' | 'close_button' | 'escape') => void;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
};

export const Modal = ({
  open,
  title,
  children,
  onClose,
  closeOnBackdrop = true,
  closeOnEsc = true,
}: ModalProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const previousActive = useRef<HTMLElement | null>(null);

  const modalRoot = useMemo(() => (typeof document !== 'undefined' ? document.body : null), []);

  useEffect(() => {
    if (!open) return;

    previousActive.current = document.activeElement as HTMLElement | null;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (!closeOnEsc) return;
      if (e.key === 'Escape') onClose('escape');
    };

    window.addEventListener('keydown', onKeyDown);
    // focus modal content (basic a11y)
    contentRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      previousActive.current?.focus?.();
    };
  }, [open, closeOnEsc, onClose]);

  if (!open || !modalRoot) return null;

  return createPortal(
    <div className="modal-backdrop" onMouseDown={() => closeOnBackdrop && onClose('backdrop')}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={title || 'dialog'}
        tabIndex={-1}
        ref={contentRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-top">
          {title ? <h3 className="modal-title">{title}</h3> : <div />}
          <button type="button" className="modal-close" onClick={() => onClose('close_button')} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    modalRoot
  );
};

