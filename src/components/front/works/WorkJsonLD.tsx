import { WorksContents } from "@/types/cms";
import Script from "next/script";

type WorkJsonLDProps = {
  article: WorksContents;
};

export const WorkJsonLD = ({ article }: WorkJsonLDProps) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/works/${article.id}`;

  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
      headline: article.title,
      datePublished: article.createdAt,
      dateModified: article.updatedAt,
      keywords: "サンプル",
      description: article.description,
      image: article.thumbnail,
      url: `${process.env.NEXT_PUBLIC_URL}/works/${article.id}`,
    },
  ];

  return (
    <Script
      id="article-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
    />
  );
};
