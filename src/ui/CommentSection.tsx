import CommentItem from "./CommentItem";

const comments = [
  {
    id: "c1",
    blog_id: "blog-1",
    user_id: "user-1",
    parent_id: null,
    content: "This blog post is really helpful!",
    post_id: "123",
  },

  {
    id: "c2",
    blog_id: "blog-1",
    user_id: "user-2",
    parent_id: "c1",
    content: "I agree, especially the part about Supabase.",
    post_id: "123",
  },

  {
    id: "c3",
    blog_id: "blog-1",
    user_id: "user-3",
    parent_id: "c2",
    content: "Same here! Supabase auth is awesome.",
    post_id: "123",
  },

  {
    id: "c4",
    blog_id: "blog-1",
    user_id: "user-4",
    parent_id: null,
    content: "Can you add an example for image uploads?",
    post_id: "123",
  },

  {
    id: "c5",
    blog_id: "blog-1",
    user_id: "user-1",
    parent_id: "c4",
    content: "Good idea, I’ll update the post soon.",
    post_id: "123",
  },

  {
    id: "c6",
    blog_id: "blog-1",
    user_id: "user-5",
    parent_id: "c5",
    content: "Thanks! Looking forward to it.",
    post_id: "123",
  },
];

type Comment = {
  id: string;
  post_id: string;
  parent_id: string | null;
  content: string;
  image?: string | null;
  children?: Comment[];
};

export default function CommentSection() {
  const commentsTree = buildCommentTree(comments);
  console.log(commentsTree);
  return commentsTree.map((comment) => (
    <CommentItem key={comment.id} comment={comment} />
  ));
}

function buildCommentTree(comments: Comment[]) {
  const map = new Map<string, Comment>();
  const roots: Comment[] = [];

  comments.forEach((c) => {
    map.set(c.id, { ...c, children: [] });
  });

  map.forEach((comment) => {
    if (comment.parent_id) {
      map.get(comment.parent_id)?.children?.push(comment);
      console.log(map.get(comment.parent_id));
      console.log(comment);
    } else {
      roots.push(comment);
    }
  });

  return roots;
}
