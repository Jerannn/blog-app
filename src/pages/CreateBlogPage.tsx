import { useState } from "react";
import Button from "../ui/Button";
import Title from "../ui/Title";
import { useCreateBlog } from "../hooks/useCreateBlog";
import TextInput from "../ui/TextInput";
import TextArea from "../ui/TextArea";
import { MdAddPhotoAlternate } from "react-icons/md";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { create, isCreating } = useCreateBlog();

  const handleCreateBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await create({ title, content, file });

    if (success) {
      setTitle("");
      setContent("");
      setFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
    console.log(selectedFile);
  };

  return (
    <div className="p-10 max-w-7xl m-auto">
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

        <fieldset className="mb-4">
          <legend className="text-slate-700 text-sm font-medium mb-2">
            Upload Photo
          </legend>

          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="file_input"
              className="flex flex-col items-center justify-center p-4 cursor-pointer bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
            >
              <span className="flex flex-col items-center gap-1 text-blue-500">
                <MdAddPhotoAlternate size={50} />
                <span className="text-lg font-medium">Choose Photo</span>
              </span>
              <input
                id="file_input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            <p
              id="file_input_help"
              className="text-sm text-gray-500 dark:text-gray-300"
            >
              SVG, PNG, JPG or GIF
            </p>
          </div>

          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-full max-h-400px object-cover rounded-md mt-3"
            />
          )}
        </fieldset>

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
