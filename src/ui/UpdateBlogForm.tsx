import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { closeModal } from "../features/ui/UiSlice";
import Title from "./Title";
import Button from "./Button";
import useUpdateBlog from "../hooks/useUpdateBlog";
import TextInput from "./TextInput";
import TextArea from "./TextArea";

// todo:
// navigate to dashboard once the user successfully created a new blog
// make sure the data is ascending
// make the first letter of the title a capital

export default function UpdateBlogForm() {
  const {
    title: initialTitle,
    content: initialContent,
    update,
    dispatch,
    isUpdating,
  } = useUpdateBlog();

  const [title, setTitle] = useState(() => initialTitle ?? "");
  const [content, setContent] = useState(() => initialContent ?? "");

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await update({ title, content });

    if (success) {
      setTitle("");
      setContent("");
      dispatch(closeModal());
    }
  };

  return (
    <div className="max-w-8/12 w-full bg-slate-100 p-10 rounded-md relative">
      <button
        onClick={() => dispatch(closeModal())}
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
