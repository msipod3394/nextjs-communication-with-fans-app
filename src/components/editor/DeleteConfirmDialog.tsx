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
import { Icon } from "../icon/icon";

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export const DeleteConfirmDialog = ({
  open,
  onClose,
  onDelete,
  isDeleting,
}: DeleteConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>この記事を削除しますか？</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>キャンセル</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={onDelete}
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
  );
};
