"use client";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "../icon/icon";
import { Button, buttonVariants } from "../ui/button";
import { toast } from "../ui/use-toast";

export default function UploadImage({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) {
  // 画像URL
  const public_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/public-image-bucket/`;
  // 投稿に紐づく画像リスト
  const [urlList, setUrlList] = useState<string[]>([]);
  // セットした画像URL
  const [file, setFile] = useState<File | null>(null);
  // storageアップ中のローディング
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 画像リストを取得
  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("images")
        .select("imageUrl")
        .eq("userId", userId)
        .eq("postId", postId);
      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        setUrlList(data.map((item) => item.imageUrl));
      }
    } catch (error) {
      console.error("画像の取得中にエラーが発生しました:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [userId, postId]);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // 画像送信
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      // alert("ファイルを選択してください。");
      toast({
        title: "ファイルを選択してください。",
        variant: "destructive",
      });
      return;
    }

    console.log("file", file);

    if (file.type.match("image.*")) {
      setLoading(true);
      const fileExtension = file.name.split(".").pop();
      const filePath = `img/${uuidv4()}.${fileExtension}`;

      // Supabase ストレージに画像をアップロード
      const { error: uploadError } = await supabase.storage
        .from("public-image-bucket")
        .upload(filePath, file);

      if (uploadError) {
        return toast({
          title: "アップロード中にエラーが発生しました：",
          description:
            "画像がアップロードされませんでした。もう一度お試しください。",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // 画像 URL の作成
      const imageUrl = `${public_url}${filePath}`;

      // 画像情報を Images テーブルに追加
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          postId,
          imageName: file.name,
          imageUrl,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        console.error("画像情報の追加中にエラーが発生しました：" + error);

        toast({
          title: "送信エラー",
          description: "画像情報の追加中にエラーが発生しました：",
          variant: "destructive",
        });

        setLoading(false);
        return;
      }

      // 成功した場合、画像リストを再取得
      fetchImages();
      router.refresh();
      router.push(`${postId}`);

      toast({
        title: "更新しました",
        description: "記事が正常に更新されました。",
      });

      setFile(null);
      setLoading(false);
    } else {
      toast({
        title: "送信エラー",
        description: "画像ファイル以外はアップロードできません。",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <form className="mb-4 text-center" onSubmit={onSubmit}>
        <input
          className="relative mb-4 block w-full min-w-0 flex-auto border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
          type="file"
          id="formFile"
          accept="image/*"
          onChange={handleChangeFile}
        />
        <Button
          className={cn(buttonVariants())}
          type="submit"
          disabled={!file || loading}
        >
          {loading && <Icon.spinner className="w-4 h-4 mr-2 animate-spin" />}
          <span>画像を登録</span>
        </Button>
      </form>
      <ul className="grid gap-10 my-12 sm:grid-cols-2 md:grid-cols-3">
        {urlList.map((item) => (
          <li key={item} className="group relative flex flex-col space-y-4">
            <div className="relative aspect-w-9 aspect-h-16 group">
              <div className="absolute inset-0">
                <Image
                  src={item}
                  alt={`Image`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 ease-in-out"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
