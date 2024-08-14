"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "../icon/icon";
import { toast } from "../ui/use-toast";

interface PostOperationsProps {
  post: Pick<Post, "id" | "title">;
}

async function deletePost(postId: string) {
  try {
    // 削除用のAPI送信
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error();
    }

    return true;
  } catch (error) {
    console.error("削除エラー:", error);

    toast({
      title: "削除エラー",
      description: "記事の削除できませんでした。もう一度お試しください。",
      variant: "destructive",
    });
  }
}

export const PostOperations = ({ post }: PostOperationsProps) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDeleting(true);
    const deleted = await deletePost(post.id);
    if (deleted) {
      setShowDeleteAlert(false);
      router.refresh();
    }
    setIsDeleting(false);
  };

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

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>この記事を削除しますか？</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              // onClick={handleDelete}
              onClick={async (e) => {
                e.preventDefault();
                setIsDeleting(true);
                const deleted = await deletePost(post.id);
                if (deleted) {
                  setShowDeleteAlert(false);
                  setIsDeleting(false);
                  router.refresh();
                }
              }}
            >
              {isDeleting ? (
                <Icon.spinner className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Icon.trash className="w-4 h-4 mr-1" />
              )}
              削除する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
