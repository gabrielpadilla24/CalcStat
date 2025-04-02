import React from "react";

interface SubmitButtonProps {
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => (
  <button
    type="submit"
    className="bg-[#0BB489] border-[#0BB489] border rounded-md inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-[#0AA47A] hover:border-[#0AA47A] disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500"
  >
    {text}
  </button>
);

export default SubmitButton;
