import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import visaLogo from "../assets/v-signature.png";
import masterLogo from "../assets/m-signature.png";
import unKnownLogo from "../assets/u-signature.png";

interface CardValidatorFormProps {
  onValidate: (cardNumber: string, cardHolder: string) => void;
  resetValidation: () => void;
}

const CardValidatorForm: React.FC<CardValidatorFormProps> = ({
  onValidate,
  resetValidation,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<{
    cardNumber: string;
    cardHolder: string;
    expDate: string;
    csv: number;
  }>();
  const cardNumber = watch("cardNumber");
  const [cardType, setCardType] = useState("");

  const onSubmit = (data: { cardNumber: string; cardHolder: string }) => {
    onValidate(data.cardNumber, data.cardHolder);
  };

  const getImage = () => {
    let _image = unKnownLogo;
    switch (cardType) {
      case "master":
        _image = masterLogo;
        break;
      case "visa":
        _image = visaLogo;
        break;
      case "unknown":
        _image = unKnownLogo;
        break;
      default:
        _image = "";
        break;
    }

    return _image;
  };

  const checkCardType = (cardNumber: string) => {
    if (cardNumber === "") {
      setCardType("");
      return;
    }

    const sanitizedCardNumber = cardNumber.replace(/\s|-/g, ""); // Remove spaces and dashes
    const firstFourDigits = sanitizedCardNumber.slice(0, 4); // Extract the first 4 digits

    if (/^4/.test(firstFourDigits)) {
      // Visa starts with 4
      setCardType("visa");
    } else if (/^(5[1-5]|2[2-7])/.test(firstFourDigits)) {
      // MasterCard starts with 51-55 or 2221-2720
      setCardType("master");
    } else {
      setCardType("unknown");
    }
  };

  useEffect(() => {
    if (cardNumber) {
      checkCardType(cardNumber);
      resetValidation();
    } else {
      setCardType("");
    }
  }, [cardNumber]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-transparent p-2 md:p-6 rounded-lg w-full md:w-2xl"
    >
      <div className="rounded-lg bg-white shadow-md p-0 md:p-4 pt-12 pb-8 md:py-16 gap-4 px-2 w-full flex relative">
        <div className="absolute z-10 top-0 left-0 w-40 h-40 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute z-10 bottom-0 right-0 w-60 h-60 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full blur-3xl opacity-50"></div>
        <div className="flex relative z-20 flex-col gap-8 w-4/5">
          <div className="flex flex-col w-full items-start justify-start">
            <label
              htmlFor="cardNumber"
              className="block text-[.75rem] font-medium text-gray-700"
            >
              Credit Card Number <span className="text-red-500">*</span>
            </label>
            <input
              id="cardNumber"
              {...register("cardNumber", {
                required: "Credit card number is required",
              })}
              type="text"
              placeholder="ex./ xxxx-xxxx-xxxx-xxxx"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.cardNumber
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              } text-black dark:text-white rounded-md shadow-sm`}
            />
          </div>
          <div className="flex flex-col w-full items-start justify-start">
            <label
              htmlFor="cardHolder"
              className="block text-[.75rem] font-medium text-gray-700"
            >
              Card Holder <span className="text-red-500">*</span>
            </label>
            <input
              id="cardHolder"
              {...register("cardHolder", {
                required: "Card holder name is required",
              })}
              type="text"
              placeholder="ex./ John Smith"
              className={`mt-1 block w-3/4 px-3 py-2 border ${
                errors.cardHolder
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              } text-black dark:text-white rounded-md shadow-sm`}
            />
          </div>
        </div>
        <div className="flex relative z-20 flex-col gap-2 w-1/5 items-end justify-start">
          <div className="flex flex-col w-full items-end justify-start">
            <label
              htmlFor="expDate"
              className="block text-[.75rem] font-medium text-gray-700 w-full text-left md:text-right pl-4 md:px-4"
            >
              Exp Date <span className="text-red-500">*</span>
            </label>
            <input
              id="expDate"
              {...register("expDate", {
                required: "Expiration date is required",
              })}
              type="text"
              placeholder="--/--"
              className={`mt-1 flex w-16 text-center px-1 py-2 border ${
                errors.expDate
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              } text-black dark:text-white rounded-md shadow-sm`}
            />
          </div>
          <div className="flex flex-col w-full items-end justify-start">
            <label
              htmlFor="csv"
              className="block text-[.75rem] font-medium text-gray-700 w-full text-left md:text-right pl-4 md:px-4"
            >
              CSV <span className="text-red-500">*</span>
            </label>
            <input
              id="csv"
              {...register("csv", {
                required: "Security number is required",
              })}
              type="text"
              placeholder="---"
              className={`mt-1 flex w-16 text-right px-4 py-2 border ${
                errors.csv
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              } text-black dark:text-white rounded-md shadow-sm`}
            />
          </div>
        </div>
        {cardType != "" && (
          <img
            src={getImage()}
            alt=""
            className="absolute w-16 h-8 md:w-20 md:h-10 right-2 bottom-2 md:right-4 md:bottom-4 transition-all ease-in-out"
          />
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none"
      >
        Validate
      </button>
    </form>
  );
};

export default CardValidatorForm;
