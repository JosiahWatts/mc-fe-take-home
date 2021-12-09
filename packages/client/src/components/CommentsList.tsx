import React from "react";
import { CommentType } from "../api/CommentApi";
import Comment from "./Comment";

import "../styles/comment/CommentsList.css";

export interface CommentsListProps {
  comments: CommentType[];
}

function CommentsList({ comments }: CommentsListProps) {
  return (
    <section>
      {comments.length < 1 ? (
        <div className="comments-list--empty">
          <p className="comments-list--empty__title">No Comments Found</p>
          <p className="comments-list--empty__subtitle">
            Go ahead, leave a comment
          </p>
        </div>
      ) : (
        <ul className="comments-list">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default CommentsList;
