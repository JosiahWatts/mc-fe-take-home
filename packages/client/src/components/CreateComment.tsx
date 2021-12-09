import React, { useEffect } from "react";

import "../styles/comment/CreateComment.css";

export interface CreateCommentProps {
  onSubmit: (message: string, name: string) => void;
}

function CreateComment({ onSubmit }: CreateCommentProps) {
  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [isFormDisabled, setFormDisabled] = React.useState(true);

  const addComment = () => {
    if (message.trim().length < 1 && name.trim().length < 1) {
      return;
    }

    onSubmit(message, name);
    setMessage("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addComment();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addComment();
    }
  };

  useEffect(() => {
    setFormDisabled(message.trim().length < 1 || name.trim().length < 1);
  }, [name, message]);

  return (
    <>
      <h5 style={{ marginBottom: "1rem", marginTop: "2rem" }}>
        Leave a Comment
      </h5>
      <form className="create-comment" onSubmit={handleSubmit}>
        <div className="create-comment__body">
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="What's your name?"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="message">
              Message
            </label>

            <textarea
              name="message"
              id="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder={`Hey, what's on your mind?`}
              onKeyDown={handleKeyPress}
            ></textarea>
          </div>
        </div>

        <div className="create-comment__footer">
          <button
            className="button primary"
            type="submit"
            disabled={isFormDisabled}
          >
            Create Comment
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateComment;
