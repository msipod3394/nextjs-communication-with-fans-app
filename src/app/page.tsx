import { HeroSlider } from "@/components/front/index/HeroSlider";
import { microcmsClient } from "@/lib/microcmsClient";
import { WorksContentsList } from "@/types/cms";

export default async function Home() {
  // works
  const worksList: WorksContentsList = await microcmsClient.get({
    endpoint: "works",
  });

  return (
    <main>
      <HeroSlider contents={worksList.contents} />
    </main>
  );
}
