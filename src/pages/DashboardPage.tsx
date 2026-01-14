import { useEffect } from "react";
import BlogsList from "../features/blogs/BlogList";
import Title from "../ui/Title";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import Loading from "../ui/Loading";
import { getBlogs } from "../services/apiBlogs";
import User from "../ui/User";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { isFetching } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div className="p-10">
      <User />

      <Title>Recent Blog Posts</Title>
      {isFetching ? (
        <div className="mt-10">
          <Loading />
        </div>
      ) : (
        <BlogsList />
      )}
    </div>
  );
}
