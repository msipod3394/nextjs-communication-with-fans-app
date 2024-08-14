import { toast } from "@/components/ui/use-toast";

// 投稿削除関数
async function deletePost(postId: string) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("削除エラー");
  }
}

// 削除処理のハンドラー
export function useHandleDelete(
  postId: string,
  setShowDeleteAlert: (value: boolean) => void,
  refreshData: () => void
) {
  const handleDelete = async () => {
    try {
      await deletePost(postId);
      toast({
        title: "削除完了",
        description: "記事を削除しました。",
      });
      setShowDeleteAlert(false);
      refreshData(); // データ更新のコールバック
    } catch {
      toast({
        title: "削除エラー",
        description: "記事の削除できませんでした。もう一度お試しください。",
        variant: "destructive",
      });
    }
  };

  return handleDelete;
}
