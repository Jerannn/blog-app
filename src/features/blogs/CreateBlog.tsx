import { useState } from "react";
import { useCreateBlog } from "../../hooks/useCreateBlog";
import useFileChange from "../../hooks/useFileChange";
import TextInput from "../../ui/TextInput";
import TextArea from "../../ui/TextArea";
import Button from "../../ui/Button";
import ImageUploadFieldset from "../../ui/ImageUploadFieldset";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { create, isCreating } = useCreateBlog();
  const { file, setFile, handleFileChange } = useFileChange();

  const handleCreateBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await create({ title, content, file });

    if (success) {
      setTitle("");
      setContent("");
      setFile(null);
    }
  };

  return (
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

      <ImageUploadFieldset file={file} onChange={handleFileChange} />

      <Button
        type="submit"
        className="bg-amber-600 hover:bg-amber-700"
        isDisabled={isCreating}
      >
        {isCreating ? "Creating..." : "Create Blog"}
      </Button>
    </form>
  );
}
