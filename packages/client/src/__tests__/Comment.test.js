import React from "react";
import { cleanup, render, screen } from "@testing-library/react";

import Comment from "../components/Comment";

const mockComment = {
  id: 1,
  name: "Test",
  message: "This is a test message",
  created: '2021-12-09T04:31:24.322Z',
};

afterEach(cleanup);

it("renders with a name", () => {
    render(<Comment comment={mockComment} />);

    const name = screen.getByText(mockComment.name);

    expect(name).toBeInTheDocument();
});

it("renders a message", () => {
    render(<Comment comment={mockComment} />);

    const message = screen.getByText(mockComment.message);

    expect(message).toBeInTheDocument();
});

it("renders the correctly formatted date", () => {
    const formattedDateText = 'Wednesday at 11:31pm';

    render(<Comment comment={mockComment} />);

    const date = screen.getByText(formattedDateText);
    
    expect(date).toBeInTheDocument();
});
