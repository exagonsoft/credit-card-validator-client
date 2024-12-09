import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardValidatorForm from "../src/components/CardValidatorForm";
import '@testing-library/jest-dom';


describe("CardValidatorForm", () => {
  let onValidateMock: jest.Mock;
  let resetValidationMock: jest.Mock;

  beforeEach(() => {
    onValidateMock = jest.fn();
    resetValidationMock = jest.fn();
  });

  it("renders the form correctly", () => {
    render(<CardValidatorForm onValidate={onValidateMock} resetValidation={resetValidationMock} />);

    expect(screen.getByLabelText(/credit card number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/card holder/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/exp date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/csv/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /validate/i })).toBeInTheDocument();
  });

  it("shows error messages when fields are empty", async () => {
    render(<CardValidatorForm onValidate={onValidateMock} resetValidation={resetValidationMock} />);

    // Submit form without filling inputs
    fireEvent.click(screen.getByRole("button", { name: /validate/i }));

    expect(await screen.findByText(/credit card number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/card holder name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/expiration date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/security number is required/i)).toBeInTheDocument();
  });

  it("calls onValidate with valid inputs", async () => {
    render(<CardValidatorForm onValidate={onValidateMock} resetValidation={resetValidationMock} />);

    // Fill inputs
    userEvent.type(screen.getByLabelText(/credit card number/i), "4111111111111111");
    userEvent.type(screen.getByLabelText(/card holder/i), "John Doe");
    userEvent.type(screen.getByLabelText(/exp date/i), "12/25");
    userEvent.type(screen.getByLabelText(/csv/i), "123");

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /validate/i }));

    expect(onValidateMock).toHaveBeenCalledWith("4111111111111111", "John Doe");
  });

  it("sets card type correctly based on input", async () => {
    render(<CardValidatorForm onValidate={onValidateMock} resetValidation={resetValidationMock} />);

    // Enter Visa card number
    userEvent.type(screen.getByLabelText(/credit card number/i), "4111111111111111");
    expect(screen.getByAltText(/visa logo/i)).toBeInTheDocument();

    // Enter MasterCard number
    userEvent.clear(screen.getByLabelText(/credit card number/i));
    userEvent.type(screen.getByLabelText(/credit card number/i), "5111111111111118");
    expect(screen.getByAltText(/master logo/i)).toBeInTheDocument();

    // Enter unknown card number
    userEvent.clear(screen.getByLabelText(/credit card number/i));
    userEvent.type(screen.getByLabelText(/credit card number/i), "9999999999999999");
    expect(screen.getByAltText(/unknown logo/i)).toBeInTheDocument();
  });

  it("calls resetValidation on card number change", async () => {
    render(<CardValidatorForm onValidate={onValidateMock} resetValidation={resetValidationMock} />);

    // Change card number
    userEvent.type(screen.getByLabelText(/credit card number/i), "4111");
    expect(resetValidationMock).toHaveBeenCalled();
  });
});
