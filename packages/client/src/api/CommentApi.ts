import { ApiUtils } from "./ApiUtils";

export class CommentApi {
  public static getComments() {
    return fetch(`${ApiUtils.getBaseApiUrl()}/getComments`);
  }

  public static getCommentById(id: number) {
    return fetch(`${ApiUtils.getBaseApiUrl()}/getComment/${id}`, {
      headers: ApiUtils.getBaseApiHeaders(),
    });
  }

  public static createComment(comment: Partial<CommentType>) {
    return fetch(`${ApiUtils.getBaseApiUrl()}/createComment`, {
      method: "POST",
      headers: ApiUtils.getBaseApiHeaders(),
      body: JSON.stringify(comment),
    });
  }
}

export type CommentType = {
  id?: number;
  name: string;
  created: string;
  message: string;
};
