import Title from "../ui/Title";

export default function CreateBlogPage() {
  return (
    <div className="p-10">
      <Title>Create New Blog</Title>

      <form className="mt-4 bg-white rounded-sm p-5 space-y-5">
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
          />
        </div>

        <button
          type="submit"
          className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-2.5 rounded-md transition cursor-pointer"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}
