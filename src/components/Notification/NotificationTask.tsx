import React, { useEffect } from "react";
import { XCircle } from "lucide-react";

interface NotificationTaskProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

const NotificationTask: React.FC<NotificationTaskProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    // Fechar a notificação automaticamente após 3 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer); // Limpar o timeout ao desmontar o componente
  }, [onClose]);

  return (
    <div
      className={`flex fjustify-between items-center fixed top-8 right-10 p-4 rounded shadow-md text-white font-medium ${
        //type === "success" ? "bg-green-500" : "bg-red-400"
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : type === "warning"
          ? "bg-yellow-500"
          : "bg-blue-500"
      }`}
    >
      {message}
      <XCircle className="ml-4 cursor-pointer" onClick={onClose} />
    </div>
  );
};

export default NotificationTask;
