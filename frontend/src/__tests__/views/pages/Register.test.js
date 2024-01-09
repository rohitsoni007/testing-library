// Register.test.js
import React from "react";
import { render, fireEvent, screen, waitFor } from "../../../testUtils";
import { BrowserRouter as Router } from "react-router-dom";
import { login, signUp } from "../../../utils/service";
import Register from "../../../views/pages/Register";
// import { setToken } from '../../utils/session';


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
}));

jest.mock("../../../utils/service", () => ({
    __esModule: true,
    ...jest.requireActual("../../../utils/service"),
    signUp: jest.fn(),
}));

jest.mock("../../../utils/session", () => ({
    __esModule: true,
    ...jest.requireActual("../../../utils/session"),
    setToken: jest.fn(),
}));

describe("testing register form", () => {
    test("Register component renders correctly", () => {
        render(
                <Register />
        );

        let firstName = screen.getByLabelText(/First Name/i);
        let lastName = screen.getByLabelText(/Last Name/i);
        let email = screen.getByLabelText(/email/i);
        let password = screen.getByLabelText(/password/i);
        let register = screen.getByTestId("register");

        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(register).toBeInTheDocument();

        // console.log('~ debug', screen.debug());
    });

    test("Register button calls with correct values", async () => {
        signUp.mockImplementation(() => {
            return {
                data: {
                    success: true,
                },
            };
        });
        const navigate = jest.fn();
        jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(
            navigate
        );
        render(
                <Register />
        );

        let firstName = screen.getByLabelText(/First Name/i);

        let lastName = screen.getByLabelText(/Last Name/i);
        let email = screen.getByLabelText(/email/i);
        let password = screen.getByLabelText(/password/i);
        let register = screen.getByTestId("register");

        fireEvent.change(firstName, { target: { value: "test" } });
        fireEvent.change(lastName, { target: { value: "tname" } });
        fireEvent.change(email, { target: { value: "test@yopmail.com" } });
        fireEvent.change(password, { target: { value: "123456" } });

        fireEvent.click(register);

        await waitFor(() => {
            expect(signUp).toHaveBeenCalledWith({
                firstName: "test",
                lastName: "tname",
                email: "test@yopmail.com",
                password: "123456",
            });
        });

        expect(navigate).toHaveBeenCalledWith("/login");
    });

    test("Register button calls with missing fields", async () => {
        render(<Register />);

        let register = screen.getByTestId("register");

        fireEvent.click(register);

        await waitFor(()=>{
            
            let firstNameError = screen.getByText(/first name is required/i)
            let flastNameError = screen.getByText(/last name is required/i)
            let emailError = screen.getByText(/email is required/i)
            let passwordError = screen.getByText(/password is required/i);
    
            expect(firstNameError).toBeInTheDocument();
            expect(flastNameError).toBeInTheDocument();
            expect(emailError).toBeInTheDocument();
            expect(passwordError).toBeInTheDocument();
        })
    })
});
