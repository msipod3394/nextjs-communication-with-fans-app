import { WorkImages } from "@/components/front/works/WorkImages";
import { Icon } from "@/components/icon/icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { microcmsClient } from "@/lib/microcmsClient";
import { getUserCurrent } from "@/lib/session";
import { cn } from "@/lib/utils";
import { Content } from "@/types/works";
import { getUserData } from "@/utils/getUserData";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type Params = {
  params: {
    id: string;
  };
};

export default async function WorksDetailPage({ params }: Params) {
  const contentId = params.id;
  let content: Content;
  let session, user;

  try {
    [content, session, user] = await Promise.all([
      // コンテンツの取得
      microcmsClient.get<Content>({
        endpoint: "works",
        contentId,
      }),
      // ユーザーセッションの取得
      getUserCurrent(),
      // ユーザーデータの取得
      getUserData(),
    ]);
  } catch (error) {
    console.error("Failed:", error);
    return <p>コンテンツの取得に失敗しました。</p>;
  }

  // セッションが存在している & サブスク契約している場合
  const isShowPremium = !!session && !!user?.isSubscribed;

  return (
    <>
      <article className="grid gap-2">
        {/* 説明文 */}
        <section className="space-y-6">
          <h1 className="font-heading border-b pb-6 font-semibold text-3xl leading-tight lg:text-4xl">
            {content.title}
          </h1>
          <div className="flex justify-end gap-4">
            <p className="text-sm text-muted-foreground">
              更新日：
              <time
                dateTime={format(new Date(content.createdAt), "yyyy-MM-dd")}
              >
                {format(new Date(content.createdAt), "yyyy/MM/dd")}
              </time>
            </p>
            <p className="text-sm text-muted-foreground">
              撮影日：
              <time
                dateTime={format(new Date(content.shooting_date), "yyyy-MM-dd")}
              >
                {format(new Date(content.shooting_date), "yyyy/MM/dd")}
              </time>
            </p>
          </div>
          <p className="leading-7">{content.content}</p>
        </section>
        {/* 画像 */}
        <section className="space-y-8">
          <div>
            <ul className="grid gap-10 my-12 sm:grid-cols-2 md:grid-cols-3">
              {content.photo_default.map((photo, index) => (
                <li key={index}>
                  <Image
                    src={photo.url}
                    width={photo.width}
                    height={photo.height}
                    alt={`${content.title} Photo${index + 1}`}
                    className="w-full"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="inline-block font-heading font-semibold text-2xl leading-tight lg:text-3xl">
              メンバーシップ限定
            </h2>
            <div className="mt-8">
              {isShowPremium ? (
                <WorkImages items={content.photo_premium} />
              ) : (
                <div className="grid gap-8">
                  <p>
                    こちらはメンバーシップ限定です。
                    <br />
                    メンバーシップに登録することで、全てのコンテンツを閲覧することができます。
                  </p>
                  <Link href="/membership" passHref>
                    <Button className="w-[240px] text-white hover:bg-gray-700">
                      メンバーシップに登録する
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </article>
      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/works"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Icon.chevronLeft className="w-4 h-4 mr-2" />
          Back to Works
        </Link>
      </div>
    </>
  );
}
