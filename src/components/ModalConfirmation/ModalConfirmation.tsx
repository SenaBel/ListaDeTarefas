import { X } from "lucide-react";

interface IModalConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

function ModalConfirmation({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: IModalConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className=" fixed inset-0 flex items-start justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg mt-[12rem] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-slate-500 mb-4">{title}</h2>
        <p className="mb-4 font-medium text-slate-600 ">{description}</p>
        <div className="flex justify-end space-x-2 gap-1">
          <button
            onClick={onClose}
            className="bg-red-500 text-white font-medium px-4 py-2 rounded-md"
          >
            Não
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white font-medium px-4 py-2 rounded-md"
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmation;
