import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

// 投稿削除関数
async function deletePost(postId: string) {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("削除エラー");
    }

    toast({
      title: "削除完了",
      description: "記事を削除しました。",
    });

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

// 削除処理のハンドラー
export function useHandleDelete(
  postId: string,
  setShowDeleteAlert: (value: boolean) => void
) {
  const router = useRouter();

  const handleDelete = async () => {
    const deleted = await deletePost(postId);

    if (deleted) {
      setShowDeleteAlert(false);
      router.refresh();
      router.push("/dashboard");
    }
  };

  return handleDelete;
}
