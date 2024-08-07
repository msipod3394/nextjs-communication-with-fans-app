import { Hero } from "@/components/front/index/Hero";
import { News } from "@/components/front/index/News";
import { Works } from "@/components/front/index/Works";
import { microcmsClient } from "@/lib/microcmsClient";
import { NewsContentList, WorksContentList } from "@/types/cms";

export default async function Home() {
  // スライダー画像取得
  const data = await microcmsClient.get<{
    contents: { slider: SliderImage[] };
  }>({
    endpoint: "index",
  });

  // urlのみ取り出す
  const images: string[] = data.contents[0].slider.map((image) => image.url);

  // works
  const worksList: WorksContentList = await microcmsClient.get({
    endpoint: "works",
  });

  // news
  const newsList: NewsContentList = await microcmsClient.get({
    endpoint: "news",
  });

  // console.log(newsList);

  return (
    <main className="">
      {/* Hero */}
      <Hero images={images} />

      {/* News */}
      <News contents={newsList.contents} />

      {/* Works */}
      <Works contents={worksList.contents} />
    </main>
  );
}
