import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useFileChange from "../../hooks/useFileChange";
import toast from "react-hot-toast";
import { FaRegImage } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { clearSelectedComment } from "./CommentSlice";
import { IoIosClose } from "react-icons/io";

type CommentFormBaseProps = {
  id?: string;
  onSubmit: (payload: {
    post_id?: string;
    parent_id: string;
    content: string;
    image: File | null;
    authorName?: string;
    removeImage?: boolean;
  }) => void;
};

export function CommentFormBase({ id, onSubmit }: CommentFormBaseProps) {
  const selectedComment = useAppSelector((state) => state.comments.comment);
  const [comment, setComment] = useState(() => {
    return selectedComment ? selectedComment.content : "";
  });
  const [isRemovingImage, setIsRemovingImage] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const blog = useAppSelector((state) => state.blogs.blog);
  const { isCommenting, updatingCommentId } = useAppSelector(
    (state) => state.comments,
  );
  const { file, setFile, handleFileChange } = useFileChange();

  const isEditingThisComment = selectedComment?.id === id;
  const isUpdatingThisComment = updatingCommentId === id;

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment && !file) {
      toast.error("Please provide a comment!");
      return;
    }

    onSubmit({
      post_id: blog?.id,
      parent_id: id || "",
      content: comment,
      image: file,
      authorName: user?.fullName,
      removeImage: isRemovingImage,
    });

    setComment("");
    setFile(null);
    dispatch(clearSelectedComment());
  };

  const handleRemoveImage = () => {
    setFile(null);
    setIsRemovingImage(true);
    dispatch(clearSelectedComment());
  };

  return (
    <div className="border border-slate-300 bg-slate-100 rounded-md p-5">
      <form onSubmit={handleSubmitComment}>
        <textarea
          placeholder="Add comment..."
          className="outline-0 w-full resize-none bg-slate-100 font-semibold text-slate-700"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex justify-between">
          <label className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 cursor-pointer">
            <FaRegImage size={20} className="text-slate-700" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <button
            type="submit"
            disabled={isCommenting || isUpdatingThisComment}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200"
          >
            {isUpdatingThisComment ? (
              <span className="text-sm pe-3 text-slate-700">Updating...</span>
            ) : (
              <IoSend size={20} className="text-slate-700 cursor-pointer" />
            )}
          </button>
        </div>

        {file ? (
          <div className="inline-block relative">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="max-w-30 w-full object-cover rounded-md mt-3"
            />
            <button
              type="button"
              className="absolute top-1 -right-2 bg-slate-700 rounded-full text-white cursor-pointer"
            >
              <IoIosClose size={20} />
            </button>
          </div>
        ) : isEditingThisComment && selectedComment?.image ? (
          <div className="inline-block relative">
            <img
              src={selectedComment?.image}
              alt="Preview"
              className="max-w-30 w-full object-cover rounded-md mt-3"
            />
            <button
              type="button"
              className="absolute top-1 -right-2 bg-slate-700 rounded-full text-white cursor-pointer"
              onClick={handleRemoveImage}
            >
              <IoIosClose size={20} />
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
