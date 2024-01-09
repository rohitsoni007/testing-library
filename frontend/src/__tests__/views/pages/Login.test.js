import React from "react";
import { render, fireEvent, screen, waitFor } from "../../../testUtils";
import Login from "../../../views/pages/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { login } from "../../../utils/service";

const alertMock = jest.spyOn(window,'alert').mockImplementation();

// jest.mock('axios', () => ({
//   post: jest.fn(() => Promise.resolve({ data: {} })),
//   create: jest.fn(() => Promise.resolve({ data: {} })),
// }));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
}));

jest.mock("../../../utils/service", () => ({
    __esModule: true,
    ...jest.requireActual("../../../utils/service"),
    default: jest.fn(() => "mocked baz"),
    login: jest.fn(),
}));

jest.mock("../../../utils/session", () => ({
    __esModule: true,
    ...jest.requireActual("../../../utils/session"),
    setToken: jest.fn(),
}));

describe("testing logging form", () => {
    test("Login component renders correctly", () => {
        render(<Login />);

        let email = screen.getByLabelText(/email/i);
        let password = screen.getByLabelText(/password/i);
        let signInButton = screen.getByTestId("sign-in");

        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(signInButton).toBeInTheDocument();

        // console.log('~ debug', screen.debug());
    });

    test("Login button calls with correct values", async () => {
        const mockedToken = "mockedToken123";

        let apiResp = {
            data: {
                success: true,
                data: {
                    token: mockedToken,
                },
            },
        };

        login.mockReturnValue(apiResp);
        const navigate = jest.fn();
        jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(
            navigate
        );
        render(<Login />);

        let email = screen.getByLabelText(/email/i);
        let password = screen.getByLabelText(/password/i);
        let signInButton = screen.getByTestId("sign-in");
        
        fireEvent.change(email, { target: { value: "test@yopmail.com" } });
        fireEvent.change(password, { target: { value: "123456" } });
        
        // let dummyEmail = screen.getByLabelText(/dummy-email/i);

        // let dummyEmail = screen.getByRole('textbox', {
        //     name: /dummy-email/i
        //   })

          let dummyEmail = screen.getByPlaceholderText('dummy-email')
        
        let classEmail = dummyEmail.className;

        console.log('~ classEmail', classEmail);

        expect(classEmail).toEqual('test-dummy')
        fireEvent.keyPress(password, {key: 'Enter', code: 'Enter', charCode: 13})

        // fireEvent.keyDown(domNode, {key: 'A', code: 'KeyA'})

        // let test = screen.getByPlaceholderText('Email');
        // console.log('~ test', test.value);
        // let role = screen.getByRole('textbox', {
        //   name: /email/i
        // })

        // expect(role).toHaveValue('test@yopmail.com')

        // let signInText = screen.getByText('Sign In');
        // let signInDisplayValue = screen.getByDisplayValue('test@yopmail.com');
        // let signInAltText = screen.getByAltText('user');
        // let signInAltTitle = screen.getByTitle('submit');
        // console.log('~ signInAltTitle', signInAltTitle);

        // let emailEntered = screen.getByLabelText(/email/i);
        // console.log('~ emailEntered', emailEntered.target.value);

        // fireEvent.click(signInButton);

        await waitFor(() => {
            expect(login).toHaveBeenCalledWith({
                email: "test@yopmail.com",
                password: "123456",
            });
        });

        const setToken = jest.spyOn(
            require("../../../utils/session"),
            "setToken"
        );

        expect(setToken).toHaveBeenCalledWith(mockedToken);
        expect(navigate).toHaveBeenCalledWith("/");
    });

    test("Login button calls with incorrect password", async () => {
        let apiResp = {
            response: {
                data: {
                    success: false,
                    message: "Invalid credentials",
                },
            }
        };

        login.mockReturnValue(apiResp);
        const navigate = jest.fn();
        jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(
            navigate
        );
        render(<Login />);

        let email = screen.getByLabelText(/email/i);
        let password = screen.getByLabelText(/password/i);
        let signInButton = screen.getByTestId("sign-in");

        fireEvent.change(email, { target: { value: "test@yopmail.com" } });
        fireEvent.change(password, { target: { value: "123457" } });

        fireEvent.click(signInButton);

        await waitFor(() => {
            expect(login).toHaveBeenCalledWith({
                email: "test@yopmail.com",
                password: "123457",
            });
        });

        expect(alertMock).toHaveBeenCalledWith('Invalid credentials')
    });


    test("Login button calls with missing fields", async () => {
        render(<Login />);

        let signInButton = screen.getByTestId("sign-in");

        fireEvent.click(signInButton);

        await waitFor(()=>{
            
            let emailError = screen.getByText(/email is required/i)
            let passwordError = screen.getByText(/password is required/i);
    
            expect(emailError).toBeInTheDocument();
            expect(passwordError).toBeInTheDocument();
        })
    })
});
