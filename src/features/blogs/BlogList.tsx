import { useAppSelector } from "../../hooks/hooks";
import BlogsItem from "./BlogItem";

export default function BlogsList() {
  const { blogs } = useAppSelector((state) => state.blogs);

  return (
    <>
      {blogs.map((data) => (
        <BlogsItem data={data} key={data.id} />
      ))}
    </>
  );
}
