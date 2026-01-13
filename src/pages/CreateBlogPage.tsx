import { useState } from "react";
import Button from "../ui/Button";
import Title from "../ui/Title";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { createBlog } from "../services/apiBlogs";
import type { CreateBlogInput } from "../features/blogs/types";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);
  const handleCreateBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content) return;

    const newBlogData: CreateBlogInput = {
      title,
      content,
      authorName: user?.fullName || "",
      authorEmail: user?.email || "",
      userId: user?.id || "",
    };

    dispatch(createBlog(newBlogData));
  };

  return (
    <div className="p-10">
      <Title>Create New Blog</Title>

      <form
        onSubmit={handleCreateBlog}
        className="mt-4 bg-white rounded-sm p-5 space-y-5"
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-slate-700 text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter your blog title"
            className=" border border-slate-300 p-1 rounded-sm text-sm text-slate-800  placeholder:text-slate-400 outline-0 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="content"
            className="text-slate-700 text-sm font-medium"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            placeholder="Enter your blog content here..."
            className=" border border-slate-300 p-1 rounded-sm text-sm text-slate-800  placeholder:text-slate-400 outline-0 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
          Create Blog
        </Button>
      </form>
    </div>
  );
}
