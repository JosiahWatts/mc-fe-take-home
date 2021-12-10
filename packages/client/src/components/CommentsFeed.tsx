import React, { useEffect } from "react";
import { CommentApi, CommentType } from "../api/CommentApi";
import useInterval from "../hooks/useInterval";
import "../styles/comment/CommentsFeed.css";
import CommentsList from "./CommentsList";

const COMMENT_REFRESH_INTERVAL = 3000;

function CommentsFeed() {
  const [comments, setComments] = React.useState<CommentType[]>([]);
  const [newComments, setNewComments] = React.useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useInterval(async () => {
    if (isLoading) return;

    const incomingComments = await fetchComments();

    setNewComments([
      ...newComments,
      ...findDiffBetweenCurrentAndIncoming(incomingComments, comments),
    ]);
  }, COMMENT_REFRESH_INTERVAL);

  const findDiffBetweenCurrentAndIncoming = (
    newComments: CommentType[],
    comments: CommentType[]
  ) => {
    const currentCommentsIds = comments.map((comment) => comment.id);
    const difference = newComments.filter(
      (newComment) => !currentCommentsIds.includes(newComment.id)
    );
    return difference;
  };

  const fetchComments = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await CommentApi.getComments();
      const incomingComments = await result.json();
      setComments(incomingComments);
      setIsLoading(false);
      return incomingComments;
    } catch (error) {
      console.error("could not fetch comments", error);
      setIsLoading(false);
    }

    return [];
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
        <CommentsList
          newComments={newComments}
          comments={comments}
          onAddComment={addComment}
          onClearNewComments={() => {
            setNewComments([]);
          }}
        />
      </div>
    </section>
  );
}

export default CommentsFeed;
