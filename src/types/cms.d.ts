// Works
export type Image = {
  url: string;
  width: number;
  height: number;
};

export type WorksContent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  shooting_date: string;
  anime_title: string;
  anime_character: string;
  photo_default: Image[];
  photo_premium: Image[];
};

export type WorksContentList = {
  contents: Worksontent[];
  totalCount: number;
  offset: number;
  limit: number;
};

// News
export type NewsContent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  contents: string;
  post_date: string;
};

export type NewsContentList = {
  contents: Newsontent[];
  totalCount: number;
  offset: number;
  limit: number;
};
