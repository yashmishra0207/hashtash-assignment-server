export interface TweetCreateDTO {
  userId: number,
  title: string,
  content?: string,
  imageUrl?: string,
  hashtags?: string,
}