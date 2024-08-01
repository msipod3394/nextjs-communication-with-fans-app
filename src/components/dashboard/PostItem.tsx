import { Post } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { PostOperations } from "./PostOperations";

interface PostItemProps {
  post: Pick<Post, "id" | "title" | "published" | "createdAt">;
}

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 ">
      <div className="grid gap-1">
        <Link
          href={`/editor/${post.id}`}
          className="text-md font-bold hover:underline"
        >
          {post.title}
        </Link>
        <div className="text-xs text-muted-foreground">
          <p>{format(post.createdAt, "yyyy/MM/dd")}</p>
        </div>
      </div>
      <PostOperations post={post} />
    </div>
  );
};
