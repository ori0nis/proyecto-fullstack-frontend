import { createPortal } from "react-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteModal = ({ isOpen, onClose, onAccept, onCancel }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#E4E0D8] opacity-92 rounded-lg shadow-lg p-4 relative max-w-md">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black cursor-pointer">
          ✕
        </button>

        <h3 className="underline text-center font-semibold mt-3">Are you sure you want to proceed?</h3>

        {/* Buttons */}
        <div className="flex gap-2 justify-center mt-3">
          <button onClick={onAccept} className="cursor-pointer font-medium border border-gray-900 rounded-md p-1">
            Accept
          </button>
          <button onClick={onCancel} className="cursor-pointer font-medium border border-gray-900 rounded-md p-1">
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("delete-modal") as HTMLElement
  );
};
