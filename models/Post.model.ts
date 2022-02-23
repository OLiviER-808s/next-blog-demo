export default interface Post {
  id?: string
  title?: string
  content?: string
  createdAt?: any
  likeCount?: number
  dislikeCount?: number
  state?: 'posted' | 'draft'
  authorname?: string
  photo?: string
}