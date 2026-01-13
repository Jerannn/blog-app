export interface Blog {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  userId: string;
  createdAt: string;
}

export interface CreateBlogInput {
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  userId: string;
}
