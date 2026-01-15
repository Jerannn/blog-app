import { useState } from "react";
import Button from "../ui/Button";
import Title from "../ui/Title";
import { useCreateBlog } from "../hooks/useCreateBlog";
import TextInput from "../ui/TextInput";
import TextArea from "../ui/TextArea";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { create, isCreating } = useCreateBlog();

  const handleCreateBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await create({ title, content });

    if (success) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="p-10">
      <Title>Create New Blog</Title>

      <form
        onSubmit={handleCreateBlog}
        className="mt-4 bg-white rounded-sm p-5 space-y-5"
      >
        <TextInput
          label="Title"
          id="title"
          placeholder="Enter your blog title"
          value={title}
          onChange={setTitle}
        />

        <TextArea
          label="Content"
          id="content"
          placeholder="Enter your blog content here"
          value={content}
          onChange={setContent}
        />

        <Button
          type="submit"
          className="bg-amber-600 hover:bg-amber-700"
          isDisabled={isCreating}
        >
          {isCreating ? "Creating..." : "Create Blog"}
        </Button>
      </form>
    </div>
  );
}
