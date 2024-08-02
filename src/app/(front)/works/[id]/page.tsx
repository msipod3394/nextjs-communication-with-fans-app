import { FrontHeading } from "@/components/dashboard/FrontHeading";
import { db } from "@/lib/db";
import { YouTubeEmbed } from "@next/third-parties/google";
import Image from "next/image";

export default async function WorksDetailPage({ params }) {
  const id = params.id;

  // 非同期処理を並列で実行
  const [work, premium] = await Promise.all([
    // worksテーブルから情報取得
    await db.works.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    }),

    // premiumsテーブルから情報取得
    await db.premium.findUnique({
      where: { id },
      select: { url: true },
    }),
  ]);

  return (
    <div>
      <FrontHeading heading="WORKS" description="イベントで撮影した写真集" />
      <div>
        {work && (
          <>
            <p>{work.title}</p>
            <p>{work.content}</p>
            {premium && (
              <Image
                src={premium.url}
                width={500}
                height={500}
                alt={work.title}
              />
            )}
            <YouTubeEmbed
              height={400}
              params="controls=0"
              videoid="ogfYd705cRs"
            />
          </>
        )}
      </div>
    </div>
  );
}
