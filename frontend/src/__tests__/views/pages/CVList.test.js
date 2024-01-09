import React from "react";
import { render, fireEvent, screen, waitFor } from "../../../testUtils";
import CVList from "../../../views/pages/CVList";
import userEvent from "@testing-library/user-event";

jest.spyOn(window, "alert").mockImplementation(() => {});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
}));

describe("testing CVList", () => {
    // test('trigger some awesome feature when clicking the button', async () => {
    //     const user = userEvent.setup()

    //     render(
    //         <CVList />
    //     )

    //     let addButton = screen.getByRole("button", {
    //         name: /add cv/i,
    //     });

    //     await user.click(addButton)

    //   })
    test("CVList component renders correctly", () => {
        render(<CVList />);

        let addButton = screen.getByRole("button", {
            name: /add cv/i,
        });
        expect(addButton).toBeInTheDocument();
    });

    test("Test to add Page", () => {
        const navigate = jest.fn();
        jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(
            navigate
        );

        render(<CVList />);

        let addButton = screen.getByRole("button", {
            name: /add cv/i,
        });

        fireEvent.click(addButton);
        expect(navigate).toHaveBeenCalledWith("/cv-page");
    });

    test("Test to Delete CV", () => {
        const navigate = jest.fn();
        jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(
            navigate
        );

        render(<CVList />);

        // screen.debug();
        // let addButton = screen.getByRole("button");

        // fireEvent.click(addButton);
        // expect(navigate).toHaveBeenCalledWith('/cv-page');
    });
});
