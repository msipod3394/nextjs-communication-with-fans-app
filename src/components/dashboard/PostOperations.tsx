"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHandleDelete } from "@/hooks/useHandleDelete";
import { Post } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteConfirmationDialog } from "../editor/DeleteConfirmationDialog";
import { Icon } from "../icon/icon";

interface PostOperationsProps {
  post: Pick<Post, "id" | "title">;
}

export const PostOperations = ({ post }: PostOperationsProps) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  // 削除の状態管理
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = useHandleDelete(post.id, setShowDeleteAlert);

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
          <DropdownMenuItem
            onClick={() => setShowDeleteAlert(true)}
            className="text-destructive cursor-pointer focus:text-destructive"
          >
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 削除確認ダイアログ */}
      <DeleteConfirmationDialog
        open={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};
