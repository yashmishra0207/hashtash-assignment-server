export interface TweetQueryStringDTO {
  search: string,
  isHashtag?: boolean,
  page?: number,
  limit?: number,
}