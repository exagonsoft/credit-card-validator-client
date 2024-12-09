import React, { useState } from "react";
import CardValidatorForm from "./components/CardValidatorForm";
import ResultMessage from "./components/ResultMessage";
import { validateCreditCard } from "./services/api";
import "./index.css";

const App: React.FC = () => {
  const [result, setResult] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);

  const handleValidate = async (cardNumber: string) => {
    const validationResponse = await validateCreditCard(cardNumber);
    setResult(validationResponse);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-600">
        Credit Card Validator
      </h1>
      <div className="relative w-full md:max-w-2xl flex flex-col justify-center items-center">
        <CardValidatorForm onValidate={handleValidate} resetValidation={() => setResult(null)}/>
        <ResultMessage result={result} />
      </div>
    </div>
  );
};

export default App;
