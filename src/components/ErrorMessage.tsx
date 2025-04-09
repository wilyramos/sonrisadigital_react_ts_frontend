import { FaExclamationCircle } from "react-icons/fa"; // Importar el ícono
import React from "react";

type ErrorMessageProps = {
    children: React.ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
    return (
      <div className="flex items-center gap-2 p-2 text-xs font-medium bg-red-100 rounded-xl m-1">
          <FaExclamationCircle className="w-5 h-5 text-red-500" />
          <span>{children}</span>
      </div>
  );
}
