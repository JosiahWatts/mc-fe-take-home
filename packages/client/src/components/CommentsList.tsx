import React from "react";
import { CommentType } from "../api/CommentApi";
import Comment from "./Comment";

import "../assets/comment/CommentsList.css";

export interface CommentsListProps {
  comments: CommentType[];
}

function CommentsList({ comments }: CommentsListProps) {
  return (
    <section>
      <ul className="comments-list">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </section>
  );
}

export default CommentsList;
