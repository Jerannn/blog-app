export type Comment = {
  id: string;
  post_id: string;
  parent_id: string | null;
  user_id: string;
  content: string;
  image?: string | null;
  authorName: string;
  created_at: string;
  children?: Comment[];
};
