import React from "react";
import { CommentType } from "../api/CommentApi";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

import "../styles/comment/CommentsList.css";

export interface CommentsListProps {
  comments: CommentType[];
  newComments: CommentType[];
  onClearNewComments: () => void;
  onAddComment: (message: string, name: string) => Promise<void>;
}

function CommentsList(props: CommentsListProps) {
  const { comments, newComments, onClearNewComments, onAddComment } = props;
  const commentsListRef = React.useRef<HTMLUListElement>(null);

  const scrollToBottomOfList = () => {
    if (commentsListRef.current) {
      commentsListRef.current.scrollTop = commentsListRef.current.scrollHeight;
    }
  };

  const onNotificationButtonClick = () => {
    scrollToBottomOfList();
    onClearNewComments();
  };

  const handleAddComment = async (message: string, name: string) => {
    await onAddComment(message, name);
    scrollToBottomOfList();
  };

  return (
    <section className="comments-list-container">
      <div className="comments-list-container__heading">
        <h2 className="feed__inner-wrapper__heading__title">The Feed</h2>
        {newComments.length > 0 && (
          <button
            title={`${newComments.length} new comment`}
            aria-label={`${newComments.length} new comment`}
            className="comments-list-container__heading__new-comments-btn"
            onClick={onNotificationButtonClick}
          >
            <svg
              className="comments-list-container__heading__new-comments-btn__icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </button>
        )}
      </div>
      <div>
        {comments.length < 1 ? (
          <div className="comments-list--empty">
            <p className="comments-list--empty__title">No Comments Found</p>
            <p className="comments-list--empty__subtitle">
              Go ahead, leave a comment
            </p>
          </div>
        ) : (
          <ul
            ref={commentsListRef}
            className="comments-list"
            aria-label="list of comments"
          >
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </ul>
        )}
      </div>
      <CreateComment onSubmit={handleAddComment} />
    </section>
  );
}

export default CommentsList;
