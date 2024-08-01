"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@prisma/client";
import Link from "next/link";
import { Icon } from "../icon/icon";

interface PostOperationsProps {
  post: Pick<Post, "id" | "title">;
}

export const PostOperations = ({ post }: PostOperationsProps) => {
  return (
    <div className="mr-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icon.ellipsis className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={`/editor/${post.id}`} className="block w-full">
              編集
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive cursor-pointer focus:text-destructive">
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
