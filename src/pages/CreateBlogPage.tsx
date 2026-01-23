import Title from "../ui/Title";
import CreateBlog from "../features/blogs/CreateBlog";

export default function CreateBlogPage() {
  return (
    <div className="p-10 max-w-7xl m-auto">
      <Title>Create New Blog</Title>
      <CreateBlog />
    </div>
  );
}
