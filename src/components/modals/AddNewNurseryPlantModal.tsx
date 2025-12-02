import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const AddNewNurseryPlantModal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#E4E0D8] opacity-92 rounded-lg shadow-lg p-4 relative max-w-md">
        <button onClick={onClose} className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-black">
          ✕
        </button>

        {children}
      </div>
    </div>,
    document.getElementById("nursery-plant-modal") as HTMLElement
  );
};
