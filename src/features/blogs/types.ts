export interface Blog {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  user_id: string;
  createdAt: string;
}

export interface CreateBlogInput {
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  user_id: string;
}
