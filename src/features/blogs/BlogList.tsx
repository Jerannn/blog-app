import BlogsItem from "./BlogItem";

type Blog = {
  id: string;
  title: string;
  content: string;
  author_email: string;
  author_name: string;
  user_id: string;
  created_at: string;
};

type BlogsListProps = {
  blogsData: Blog[];
};

export default function BlogsList({ blogsData }: BlogsListProps) {
  return (
    <>
      {blogsData.map((data) => (
        <BlogsItem data={data} key={data.id} />
      ))}
    </>
  );
}
