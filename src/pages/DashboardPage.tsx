import { useEffect } from "react";
import BlogsList from "../features/blogs/BlogList";
import Title from "../ui/Title";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Loading from "../ui/Loading";
import { getBlogs } from "../services/apiBlogs";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.blogs);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div className="p-10">
      <p className="mb-5 font-semibold text-slate-700">
        Welcome, {user?.fullName}
      </p>

      <Title>Recent Blog Posts</Title>
      {isLoading ? <Loading /> : <BlogsList />}
    </div>
  );
}
