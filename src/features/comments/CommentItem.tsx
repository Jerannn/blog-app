import { useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { TbMessageFilled } from "react-icons/tb";
import type { Comment } from "./types";
import CommentForm from "./AddComment";
import ThreeDotMenu from "../../ui/ThreeDotMenu";
import UpdateComment from "./UpdateComment";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { clearSelectedComment, selectComment } from "./CommentSlice";
import { openModal } from "../ui/UiSlice";

export default function CommentItem({ comment }: { comment: Comment }) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div
      className={`${comment.parent_id ? "ml-10 mt-5 p-3 rounded-2xl bg-white" : " mt-3 bg-slate-100 p-5 rounded-3xl"} mt-3`}
    >
      {isEditing ? (
        <>
          <UpdateComment id={comment.id} onIsEditing={setIsEditing} />
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              dispatch(clearSelectedComment());
            }}
            className="text-blue-600 text-sm font-semibold cursor-pointer"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          {/* User details */}
          <div className="flex items-center gap-3">
            <FaUserCircle size={30} className="text-red-400" />
            <p className="text-slate-700">
              <span className="font-semibold">{comment.authorName}</span>
            </p>
          </div>

          <div className="ms-10 space-y-2">
            {/* Comment content */}
            <p className="text-slate-800">{comment.content}</p>
            {comment.image && (
              <img
                src={comment.image}
                className="mt-2 rounded-md max-w-xs w-full"
              />
            )}

            {/* Interactive buttons */}
            <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold">
              <button className="flex items-center gap-1">
                <AiFillLike /> <span>12</span>
              </button>

              <button className="flex items-center gap-1">
                <AiFillDislike /> <span>3</span>
              </button>

              <button
                onClick={() => setIsReplying(!isReplying)}
                className="flex items-center gap-1 cursor-pointer"
              >
                {isReplying ? (
                  "Cancel"
                ) : (
                  <>
                    <TbMessageFilled /> Reply
                  </>
                )}
              </button>

              {user?.id === comment.user_id && (
                <ThreeDotMenu
                  renderContent={() => (
                    <>
                      <button
                        className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-sm"
                        onClick={() => {
                          setIsEditing(!isEditing);
                          dispatch(selectComment(comment));
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-sm"
                        onClick={() => {
                          dispatch(openModal("deleteComment"));
                          dispatch(selectComment(comment));
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                >
                  <button className="w-4 h-6 flex justify-center items-center cursor-pointer hover:bg-slate-100 rounded-full transition duration-200 ease-in-out">
                    <BsThreeDots />
                  </button>
                </ThreeDotMenu>
              )}
            </div>

            {/* Comment form */}
            {isReplying && <CommentForm id={comment.id} />}
          </div>
        </>
      )}

      {/* Render children recursively */}
      {comment.children?.map((child) => (
        <CommentItem key={child.id} comment={child} />
      ))}
    </div>
  );
}
