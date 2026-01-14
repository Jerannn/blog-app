import { useAppSelector } from "../../hooks/reduxHooks";
import NoData from "../../ui/NoData";
import BlogsItem from "./BlogItem";
import type { Blog } from "./types";

export default function BlogsList() {
  const blogs = useAppSelector((state) => state.blogs.blogs);

  if (!blogs.length) return <NoData />;

  return (
    <>
      {blogs.map((data: Blog) => (
        <BlogsItem data={data} key={data.id} />
      ))}
    </>
  );
}
