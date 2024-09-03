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
      <div className="bg-white p-6 rounded-lg shadow-lg mt-[12rem]">
        <h2 className="text-xl font-bold text-slate-700 mb-4">{title}</h2>
        <p className="mb-4 text-slate-800 ">{description}</p>
        <div className="flex justify-end space-x-2">
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
