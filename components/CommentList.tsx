import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function CommentList({
  comment,
  timestamp,
  imageUrl,
  username,
}: {
  id: number;
  comment: string;
  timestamp: Date;
  imageUrl: string;
  username: string;
}) {
  return (
    <div>
      <li className="mb-2">
        <div className=" flex gap-2">
          <div>
            <Avatar className="size-8">
              <AvatarImage src={imageUrl} alt="@me" />
              <AvatarFallback>.</AvatarFallback>
            </Avatar>{" "}
          </div>
          <div className=" flex flex-col w-full border rounded-md  border-blue-950  text-wrap text-left">
            <span className="text-xs  text-neutral-900 dark:text-neutral-400 font-extralight  border-b  border-b-blue-950 p-2">
              {" "}
              <span className=" text-sm font-semibold   text-black dark:text-white ">
                {username}
              </span>{" "}
              created at:{timestamp.toLocaleString()}{" "}
            </span>
            <span className=" text-sm p-5">{comment}</span>
          </div>

          {/* <span className="text-xs text-gray-400">
                        {' '}
                        - {new Date(comment.createdAt).toLocaleDateString()}
                      </span> */}
        </div>
      </li>
    </div>
  );
}
