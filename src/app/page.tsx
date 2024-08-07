import { Hero } from "@/components/front/index/Hero";
import { Works } from "@/components/front/index/Works";
import { microcmsClient } from "@/lib/microcmsClient";
import { ContentList } from "@/types/works";

export default async function Home() {
  // スライダー画像取得
  const data = await microcmsClient.get<{
    contents: { slider: SliderImage[] };
  }>({
    endpoint: "index",
  });

  // urlのみ取り出す
  const images: string[] = data.contents[0].slider.map((image) => image.url);

  const contentList: ContentList = await microcmsClient.get({
    endpoint: "works",
  });

  return (
    <main className="">
      {/* Hero */}
      <Hero images={images} />

      {/* News */}
      <section id="news"></section>

      {/* Works */}
      <Works contents={contentList.contents} />

    </main>
  );
}
