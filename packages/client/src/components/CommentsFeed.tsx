import React, { useEffect } from "react";
import { CommentApi, CommentType } from "../api/CommentApi";
import useInterval from "../hooks/useInterval";
import "../styles/comment/CommentsFeed.css";
import CommentsList from "./CommentsList";
import CreateComment from "./CreateComment";

const COMMENT_REFRESH_INTERVAL = 3000;

function CommentsFeed() {
  const [comments, setComments] = React.useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useInterval(async () => {
    if (isLoading) return;

    await fetchComments();
  }, COMMENT_REFRESH_INTERVAL);

  const fetchComments = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await CommentApi.getComments();
      const comments = await result.json();
      setComments(comments);
      setIsLoading(false);
    } catch (error) {
      console.error("could not fetch comments", error);
      setIsLoading(false);
    }
  }, []);

  const addComment = async (message: string, name: string) => {
    try {
      await CommentApi.createComment({ message, name });
      await fetchComments();
    } catch (err) {
      console.error("could not create comment", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

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
