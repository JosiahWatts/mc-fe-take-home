import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import CreateComment from "../components/CreateComment";

afterEach(cleanup);

it("submit button is disabled on load", () => {
    render(<CreateComment />);
    
    const submitButton = screen.getByText('Create Comment');

    expect(submitButton).toBeDisabled();
});

it("submit button is disabled when name is entered with no message", () => {
    render(<CreateComment />);
    
    const nameInput = screen.getByLabelText("Name", { selector: "input" });
    const submitButton = screen.getByText('Create Comment');
    
    fireEvent.change(nameInput, { target: { value: "Test Name" } });
    
    expect(submitButton).toBeDisabled();
});

it("submit button is disabled when message is entered with no name", () => {
    render(<CreateComment />);
    
    const messageInput = screen.getByLabelText("Message", { selector: "textarea" });
    const submitButton = screen.getByText('Create Comment');
    fireEvent.change(messageInput, { target: { value: "Test Message" } });
    
    expect(submitButton).toBeDisabled();
});

it("submit button is enabled when message and name are entered", () => {
    render(<CreateComment />);
    
    const nameInput = screen.getByLabelText("Name", { selector: "input" });
    const messageInput = screen.getByLabelText("Message", { selector: "textarea" });
    const submitButton = screen.getByText('Create Comment');

    fireEvent.change(nameInput, { target: { value: "Test Name" } });
    fireEvent.change(messageInput, { target: { value: "Test Message" } });

    expect(submitButton).not.toBeDisabled();
});