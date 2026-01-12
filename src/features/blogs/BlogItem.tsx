import Button from "../../ui/Button";

type Blog = {
  id: string;
  title: string;
  content: string;
  author_email: string;
  author_name: string;
  user_id: string;
  created_at: string;
};

type BlogsItemProps = {
  data: Blog;
};

export default function BlogsItem({ data }: BlogsItemProps) {
  return (
    <>
      <article className="bg-white p-5 space-y-3 my-5 rounded-sm">
        <h2 className="text-lg font-semibold text-slate-900">{data.title}</h2>
        <p className="text-md text-slate-800 line-clamp-3">{data.content}</p>

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className=" text-slate-700 text-sm">
              <span className="font-semibold">Posted from: </span>
              {data.author_name}
            </p>

            <p className=" text-slate-700 text-sm">
              <span className="font-semibold">Created on: </span>
              {data.created_at}
            </p>
          </div>

          <div className="space-x-3">
            <Button type="button" className="bg-blue-500 hover:bg-blue-600">
              Edit
            </Button>
            <Button type="button" className="bg-red-500 hover:bg-red-600">
              Delete
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
