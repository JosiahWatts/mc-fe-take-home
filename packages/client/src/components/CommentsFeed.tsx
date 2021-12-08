import React, { useEffect } from "react";
import { CommentApi, CommentType } from "../api/CommentApi";
import { mockComments } from "../data/mockComments";
import useInterval from "../hooks/useInterval";
import CommentsList from "./CommentsList";
import CreateComment from "./CreateComment";

import "../assets/comment/CommentsFeed.css";

const COMMENT_REFRESH_INTERVAL = 5000;

const fetchComments = CommentApi.getComments();

function CommentsFeed() {
  const [comments, setComments] = React.useState<CommentType[]>(mockComments);

  // useInterval(async () => {
  //   console.log("Checking for new comments");
  //   const result = await CommentApi.getComments();
  //   const comments = await result.json();
  //   setComments(comments);
  // }, COMMENT_REFRESH_INTERVAL);

  useEffect(() => {
    fetchComments
      .then((res) => res.json())
      .then((comments) => setComments(comments))
      .catch((err) => console.error(err));
  }, []);

  const addComment = (message: string) => {
    const newComment = {
      id: comments.length + 1,
      name: "John Doe",
      created: new Date().toISOString(),
      message,
    };

    setComments([...comments, newComment]);
  };

  return (
    <section className="feed">
      <div className="feed__inner-wrapper">
        <h2 className="feed__title">The Feed</h2>
        <CommentsList comments={comments} />
        <CreateComment onSubmit={addComment} />
      </div>
    </section>
  );
}

export default CommentsFeed;
