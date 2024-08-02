import { FrontHeading } from "@/components/dashboard/FrontHeading";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function WorksPage() {
  // worksテーブルから情報取得
  const works = await db.works.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(works);

  return (
    <div>
      <FrontHeading heading="WORKS" description="イベントで撮影した写真集" />
      <ul>
        {works.map((work) => (
          <li key={work.id}>
            <Link href={`/works/${work.id}`}>
              <h2>{work.title}</h2>
              <p>{work.content}</p>
              <p>{new Date(work.createdAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
