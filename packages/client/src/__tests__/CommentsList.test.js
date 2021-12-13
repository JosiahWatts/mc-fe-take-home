import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import CommentsList from "../components/CommentsList";
import { mockComments } from "../data/mockComments";

afterEach(cleanup);

it("renders empty list text when there are no comments", () => {
    render(<CommentsList newComments={[]} comments={[]} />);
    
    expect(screen.getByText("No Comments Found")).toBeInTheDocument();
    expect(screen.queryByText("comments-list", { selector: 'ul'})).toBeNull();
});

it("renders a list of comments", () => {
    render(<CommentsList newComments={[]} comments={mockComments} />);
    
    const list = screen.getByRole("list", { selector: 'ul'});
    
    expect(list).toBeInTheDocument();
});

it("renders a list of comments with the correct number of comments", () => {
    render(<CommentsList newComments={[]} comments={mockComments} />);
    
    const list = screen.getByRole("list", { selector: 'ul'});
    
    expect(list).toBeInTheDocument();
    expect(list.children.length).toBe(mockComments.length);
});