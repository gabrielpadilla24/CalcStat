import React from "react";

type GreyHintLinkProps = {
  to: string; // ruta destino (ej. "/calculus/derivatives")
  children: React.ReactNode; // el texto
  className?: string;
};

const GreyHintLink: React.FC<GreyHintLinkProps> = ({
  to,
  children,
  className = "",
}) => {
  return (
    <a
      href={to}
      className={
        "inline-flex items-center justify-center gap-1 " +
        "text-sm text-gray-500 hover:text-gray-700 " +
        "cursor-pointer transition-colors underline underline-offset-4 decoration-gray-300 hover:decoration-gray-500 " +
        className
      }
    >
      {children}
      <span aria-hidden>›</span>
    </a>
  );
};

export default GreyHintLink;
