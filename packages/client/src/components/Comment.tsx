import { format, parseISO } from "date-fns";
import React, { useMemo } from "react";
import { CommentType } from "../api/CommentApi";
import "../styles/comment/Comment.css";

export interface CommentProps {
  comment: CommentType;
}

function Comment(props: CommentProps) {
  const { comment } = props;
  const { name, created, message } = comment;

  const createdDate = useMemo(() => {
    const parsedTime = parseISO(created);
    return format(parsedTime, "EEEE 'at' h:mmaaa");
  }, [created]);

  return (
    <article className="comment">
      <div className="comment__header">
        <div className="comment__header__name-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="comment__header__name-wrapper__avatar"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="comment__header__name-wrapper__name">{name}</span>
        </div>
        <span className="comment__date">{createdDate}</span>
      </div>
      <p className="comment__body">{message}</p>
    </article>
  );
}

export default Comment;
