import { createPortal } from "react-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onCancel: () => void;
}

export const DeleteUserPlantModal = ({ isOpen, onClose, onAccept, onCancel }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-green-200 opacity-92 rounded-lg shadow-lg p-4 relative w-[90%] max-w-md">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          ✕
        </button>

        <button onClick={onAccept}>Accept</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>,
    document.getElementById("delete-user-plant-modal") as HTMLElement
  );
};
