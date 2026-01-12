import { useEffect } from "react";
import BlogsList from "../features/blogs/BlogList";
import Title from "../ui/Title";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getBlogs } from "../features/blogs/blogThunks";
import Loading from "../ui/Loading";

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
  const { isLoading } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div className="p-10">
      <p className="mb-5 font-semibold text-slate-700">
        Welcome, user@example.com
      </p>

      <Title>Recent Blog Posts</Title>
      {isLoading ? <Loading /> : <BlogsList />}
    </div>
  );
}
