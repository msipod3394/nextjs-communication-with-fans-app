import { WorkImages } from "@/components/front/works/WorkImages";
import { Icon } from "@/components/icon/icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { fontRoboto } from "@/configs/font";
import { microcmsClient } from "@/lib/microcmsClient";
import { getUserCurrent } from "@/lib/session";
import { cn } from "@/lib/utils";
import { WorksContents } from "@/types/cms";
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
  let content: WorksContents;
  let session, user;

  try {
    [content, session, user] = await Promise.all([
      // コンテンツの取得
      microcmsClient.get<WorksContents>({
        endpoint: "e5gfdwcn",
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
        <section className="space-y-4">
          <h1 className="font-heading border-b border-gray-500 pb-4 font-semibold text-xl leading-tight md:text-4xl">
            {content.title}
          </h1>
          {/* 更新・撮影日 */}
          <div className="flex justify-end gap-4">
            {content.createdAt && (
              <p className="text-sm text-muted-foreground">
                更新日：
                <time
                  dateTime={format(new Date(content.createdAt), "yyyy-MM-dd")}
                >
                  {format(new Date(content.createdAt), "yyyy/MM/dd")}
                </time>
              </p>
            )}
            {content.shooting_date && (
              <p className="text-sm text-muted-foreground">
                撮影日：
                <time
                  dateTime={format(
                    new Date(content.shooting_date),
                    "yyyy-MM-dd"
                  )}
                >
                  {format(new Date(content.shooting_date), "yyyy/MM/dd")}
                </time>
              </p>
            )}
          </div>
          <p className="text-sm leading-normal md:text-md">{content.content}</p>
        </section>
        {/* 画像 */}
        <section className="space-y-16 sm:space-y-24">
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
            {content.photo_premium.length > 0 && (
              <>
                <h2 className="font-heading border-b border-gray-500 pb-4 font-semibold text-xl leading-tight md:text-2xl">
                  メンバーシップ限定
                </h2>
                <div className="mt-8">
                  {isShowPremium ? (
                    <WorkImages items={content.photo_premium} />
                  ) : (
                    <div className="grid gap-8 text-sm md:text-md">
                      <p>
                        メンバーシップに登録することで、全てのコンテンツを閲覧することができます。
                      </p>
                      <Link href="/membership" passHref>
                        <Button className="w-[240px]">
                          メンバーシップに登録する
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </article>
      <div className="mt-8 flex justify-center py-6 lg:py-10">
        <Link
          href="/works"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Icon.chevronLeft className="w-4 h-4 mr-1" />
          <span className={`${fontRoboto.className} text-md`}>
            Back to List
          </span>
        </Link>
      </div>
    </>
  );
}
