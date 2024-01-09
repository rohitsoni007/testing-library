import React from "react";
import { render, fireEvent, screen, waitFor } from "../../../testUtils";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../../layout/MainLayout/Header";

jest.spyOn(window, "alert").mockImplementation(() => {});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
}));

describe("testing Header", () => {
    test("Header component renders correctly", () => {
        render(
                <Header />
        );

        let logoutButton = screen.getByRole("button", {
            name: /logout/i,
        });

        expect(logoutButton).toBeInTheDocument();
    });

    test("Test logout functionality", () => {
        const navigate = jest.fn();
        jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(
            navigate
        );

        render(
                <Header />
        );

        let logoutButton = screen.getByRole("button", {
            name: /logout/i,
        });

        fireEvent.click(logoutButton);

        expect(navigate).toHaveBeenCalledWith("/login");
    });
});
