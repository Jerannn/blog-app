import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addComment } from "../../services/apiComment";
import { FaRegImage } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import useFileChange from "../../hooks/useFileChange";
import toast from "react-hot-toast";

type CommentFromProps = {
  id?: string;
};

export default function CommentForm({ id }: CommentFromProps) {
  const [comment, setComment] = useState("");

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const blog = useAppSelector((state) => state.blogs.blog);
  const { isCommenting } = useAppSelector((state) => state.comments);
  const { file, setFile, handleFileChange } = useFileChange();
  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment && !file) {
      toast.error("Please provide a comment!");
      return;
    }

    dispatch(
      addComment({
        post_id: blog?.id,
        parent_id: id || "",
        content: comment,
        image: file,
        authorName: user?.fullName,
      }),
    );

    setComment("");
    setFile(null);
  };

  return (
    <div className="border border-slate-300 bg-slate-100 rounded-md p-5">
      <form onSubmit={handleSubmitComment}>
        <textarea
          name="comment"
          id="comment"
          placeholder="Add comment..."
          className="outline-0 w-full resize-none bg-slate-100 font-semibold text-slate-700"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <div className="flex justify-between">
          <label
            id="file_input"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 cursor-pointer"
          >
            <FaRegImage
              size={20}
              className="text-slate-700 hover:text-slate-900 cursor-pointer"
            />
            <input
              id="file_input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <button
            type="submit"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 cursor-pointer"
            disabled={isCommenting}
          >
            <IoSend size={20} className="text-slate-700 hover:text-slate-900" />
          </button>
        </div>

        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="max-w-30 w-full object-cover rounded-md mt-3"
          />
        )}
      </form>
    </div>
  );
}
