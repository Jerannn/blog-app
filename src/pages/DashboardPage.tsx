import { useEffect } from "react";
import BlogsList from "../features/blogs/BlogList";
import Title from "../ui/Title";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getBlogs } from "../features/blogs/blogThunks";

const blogsData = [
  {
    id: "1",
    title: "Getting Started with React",
    content:
      "React is a JavaScript library for building user interfaces. In this post, we explore the basics of components, JSX, and props.",
    author_email: "user1@example.com",
    author_name: "Jane Doe",
    user_id: "user-001",
    created_at: "2026-01-01T10:30:00Z",
  },
  {
    id: "2",
    title: "Why TypeScript Matters",
    content:
      "TypeScript helps catch errors early by adding static typing to JavaScript. This improves maintainability and developer confidence.",
    author_email: "user2@example.com",
    author_name: "John Smith",
    user_id: "user-002",
    created_at: "2026-01-02T08:15:00Z",
  },
  {
    id: "3",
    title: "Understanding Redux in Simple Terms",
    content:
      "Redux centralizes your application state. Learn how actions, reducers, and the store work together.",
    author_email: "user1@example.com",
    author_name: "Jane Doe",
    user_id: "user-001",
    created_at: "2026-01-03T14:45:00Z",
  },
  {
    id: "4",
    title: "Supabase Authentication Basics",
    content:
      "Supabase provides an easy way to implement authentication with minimal setup. Let’s walk through login and registration.",
    author_email: "user3@example.com",
    author_name: "Alice Johnson",
    user_id: "user-003",
    created_at: "2026-01-04T09:20:00Z",
  },
  {
    id: "5",
    title: "Pagination in React Explained",
    content:
      "Pagination helps manage large data sets. This article explains limit, offset, and page-based pagination.",
    author_email: "user2@example.com",
    author_name: "John Smith",
    user_id: "user-002",
    created_at: "2026-01-05T11:10:00Z",
  },
  {
    id: "6",
    title: "Clean Folder Structure for React Apps",
    content:
      "A good folder structure keeps your project scalable. Let’s discuss feature-based organization.",
    author_email: "user1@example.com",
    author_name: "Jane Doe",
    user_id: "user-001",
    created_at: "2026-01-06T16:00:00Z",
  },
  {
    id: "7",
    title: "Protected Routes in React",
    content:
      "Protected routes prevent unauthorized access. Learn how to guard routes using authentication state.",
    author_email: "user3@example.com",
    author_name: "Alice Johnson",
    user_id: "user-003",
    created_at: "2026-01-07T13:30:00Z",
  },
  {
    id: "8",
    title: "Handling Forms the Right Way",
    content:
      "Forms are essential in web apps. This post covers controlled inputs and validation strategies.",
    author_email: "user2@example.com",
    author_name: "John Smith",
    user_id: "user-002",
    created_at: "2026-01-08T10:05:00Z",
  },
  {
    id: "9",
    title: "Deploying React Apps to Vercel",
    content:
      "Vercel makes deployment easy. Learn how to deploy your React app in minutes.",
    author_email: "user1@example.com",
    author_name: "Jane Doe",
    user_id: "user-001",
    created_at: "2026-01-09T15:40:00Z",
  },
  {
    id: "10",
    title: "Common Mistakes Beginners Make in React",
    content:
      "Avoid common pitfalls such as improper state updates, missing keys, and overusing effects.",
    author_email: "user3@example.com",
    author_name: "Alice Johnson",
    user_id: "user-003",
    created_at: "2026-01-10T09:50:00Z",
  },
];

// {
//   id: "1",
//   title: "Getting Started with React",
//   content:
//     "React is a JavaScript library for building user interfaces. In this post, we explore the basics of components, JSX, and props.",
//   author_email: "user1@example.com",
//   author_name: "",
//   user_id: "user-001",
//   created_at: "2026-01-01T10:30:00Z",
// },

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { blogs } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div className="p-10">
      <p className="mb-5 font-semibold text-slate-700">
        Welcome, user@example.com
      </p>

      <Title>Recent Blog Posts</Title>

      <BlogsList blogsData={blogs} />
    </div>
  );
}
