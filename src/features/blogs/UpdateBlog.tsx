import { useState } from "react";
import { closeModal } from "../ui/UiSlice";
import { getBlog } from "../../services/apiBlogs";
import { IoIosClose } from "react-icons/io";
import useUpdateBlog from "../../hooks/useUpdateBlog";
import Title from "../../ui/Title";
import TextInput from "../../ui/TextInput";
import TextArea from "../../ui/TextArea";
import Button from "../../ui/Button";
import ImageUploadFieldset from "../../ui/ImageUploadFieldset";

export default function UpdateBlog() {
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

        <ImageUploadFieldset
          file={file}
          onChange={handleFileChange}
          previewUrl={image}
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
