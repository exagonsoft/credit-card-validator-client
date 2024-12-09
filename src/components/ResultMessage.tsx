import React from 'react';

interface ResultMessageProps {
  result: { isValid: boolean; message: string } | null;
}

const ResultMessage: React.FC<ResultMessageProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div
      className={`p-2 mt-4 rounded-md absolute top-0 right-4 md:right-8 md:top-4 text-[.8rem] z-30 ${
        result.isValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}
    >
      {result.message}
    </div>
  );
};

export default ResultMessage;
