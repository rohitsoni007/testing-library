import React from "react";
import { render, fireEvent, screen, waitFor } from "../../../testUtils";
import { BrowserRouter as Router } from "react-router-dom";
import BasicDetail from "../../../views/pages/cv-page/cv-form/BasicDetail";

let id = "658afc25f8940180643fe5da";

jest.spyOn(window, "alert").mockImplementation(() => {});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
    useParams: jest.fn(),
}));

jest.mock("../../../utils/service", () => ({
    __esModule: true,
    ...jest.requireActual("../../../utils/service"),
    addResume: jest.fn(),
}));

// addResume

describe("testing Basic Detail", () => {
    test("BasicDetail component renders correctly", () => {
        let paramsValue = {
            id: null,
        };
        jest.spyOn(require("react-router-dom"), "useParams").mockReturnValue(
            paramsValue
        );

        render(<BasicDetail />);

        let name = screen.getByRole("textbox", {
            name: /name/i,
        });
        expect(name).toBeInTheDocument();

        let email = screen.getByRole("textbox", {
            name: /email/i,
        });
        expect(email).toBeInTheDocument();

        let phone = screen.getByRole("textbox", {
            name: /phone/i,
        });
        expect(phone).toBeInTheDocument();

        let submit = screen.getByRole("button", {
            name: /submit/i,
        });
        expect(submit).toBeInTheDocument();
    });

    test("Test to add functionality", async () => {
        const navigate = jest.fn();
        jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(
            navigate
        );

        let paramsValue = {
            id: null,
        };

        const useParams = jest
            .spyOn(require("react-router-dom"), "useParams")
            .mockReturnValue(paramsValue);
        
        let apiResponse = {
            data: {
                success: true,
            },
        };

        const addResume = jest
            .spyOn(require("../../../utils/service"), "addResume")
            .mockReturnValue(apiResponse)

        render(<BasicDetail />);

        expect(useParams).toHaveBeenCalled();
        let name = screen.getByRole("textbox", {
            name: /name/i,
        });

        let email = screen.getByRole("textbox", {
            name: /email/i,
        });

        let phone = screen.getByRole("textbox", {
            name: /phone/i,
        });

        let submit = screen.getByRole("button", {
            name: /submit/i,
        });

        fireEvent.change(name, { target: { value: "test" } });
        fireEvent.change(email, { target: { value: "test@yopmail.com" } });
        fireEvent.change(phone, { target: { value: "1234567890" } });

        fireEvent.click(submit);

        await waitFor(() => {
            expect(addResume).toHaveBeenCalledWith({
                name: "test",
                email: "test@yopmail.com",
                phone: "1234567890",
            });
        });

        expect(navigate).toHaveBeenCalledWith("/");
    });

    test("test Add button calls with missing fields", async () => {
        let paramsValue = {
            id: null,
        };

        const useParams = jest
            .spyOn(require("react-router-dom"), "useParams")
            .mockReturnValue(paramsValue);
        render(<BasicDetail />);

        expect(useParams).toHaveBeenCalled();

        let submit = screen.getByRole("button", {
            name: /submit/i,
        });

        fireEvent.click(submit);

        await waitFor(()=>{
            
            let nameError = screen.getByText(/name is required/i);
            let emailError = screen.getByText(/email is required/i)
            let phoneError = screen.getByText(/phone is required/i);
    
            expect(nameError).toBeInTheDocument();
            expect(emailError).toBeInTheDocument();
            expect(phoneError).toBeInTheDocument();
        })
    })

    test("Test to edit functionality", async () => {
        const navigate = jest.fn();
        jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(
            navigate
        );

        const useParams = jest
            .spyOn(require("react-router-dom"), "useParams")
            .mockImplementation(() => {
                return {
                    id: id,
                };
            });

        const editResume = jest
            .spyOn(require("../../../utils/service"), "editResume")
            .mockImplementation(() => {
                return {
                    data: {
                        success: true,
                    },
                };
            });

        render(<BasicDetail />);

        expect(useParams).toHaveBeenCalled();

        let name = screen.getByRole("textbox", {
            name: /name/i,
        });

        let email = screen.getByRole("textbox", {
            name: /email/i,
        });

        let phone = screen.getByRole("textbox", {
            name: /phone/i,
        });

        let submit = screen.getByRole("button", {
            name: /submit/i,
        });

        fireEvent.change(name, { target: { value: "test" } });
        fireEvent.change(email, { target: { value: "test@yopmail.com" } });
        fireEvent.change(phone, { target: { value: "1234567890" } });

        fireEvent.click(submit);

        await waitFor(() => {
            expect(editResume).toHaveBeenCalledWith(id, {
                name: "test",
                email: "test@yopmail.com",
                phone: "1234567890",
            });
        });

        expect(navigate).toHaveBeenCalledWith("/");
    });
});
