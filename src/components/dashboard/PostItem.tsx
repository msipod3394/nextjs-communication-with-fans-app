import { Post } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { pagesPath } from "../../../utils/$path";
import { PostOperations } from "./PostOperations";

interface PostItemProps {
  post: Pick<Post, "id" | "title" | "published" | "createdAt">;
}

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 ">
      <div className="grid gap-1">
        <Link
          href={pagesPath.editor._postId(post.id).$url().path}
          className="text-md font-medium hover:underline"
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
