import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { closeModal } from "../features/ui/UiSlice";
import Title from "./Title";
import Button from "./Button";
import useUpdateBlog from "../hooks/useUpdateBlog";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import { MdAddPhotoAlternate } from "react-icons/md";
import { getBlog } from "../services/apiBlogs";

export default function UpdateBlogForm() {
  const {
    id,
    title: initialTitle,
    content: initialContent,
    image,
    update,
    dispatch,
    isUpdating,
  } = useUpdateBlog();

  const [title, setTitle] = useState(() => initialTitle ?? "");
  const [content, setContent] = useState(() => initialContent ?? "");
  const [file, setFile] = useState<File | null>(null);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await update({ title, content, file });

    if (success) {
      setTitle("");
      setContent("");
      setFile(null);
      dispatch(closeModal());
      dispatch(getBlog(id));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
  };

  return (
    <div className="h-full overflow-auto bg-slate-100 md:max-h-[600px] md:max-w-8/12 w-full md:bg-white p-10 md:rounded-md relative ">
      <button
        onClick={() => dispatch(closeModal())}
        type="button"
        className="absolute top-7 right-7 cursor-pointer  rounded-full hover:bg-slate-200 duration-200"
      >
        <IoIosClose size={30} className="text-slate-800" />
      </button>

      <Title>Update Blog</Title>

      <form
        onSubmit={handleUpdate}
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
              src={URL.createObjectURL(file) || image}
              alt="Preview"
              className="object-cover rounded-md mt-3"
            />
          )}
        </fieldset>

        <Button
          type="submit"
          className="bg-amber-600 hover:bg-amber-700"
          isDisabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Blog"}
        </Button>
      </form>
    </div>
  );
}
