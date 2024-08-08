// Works
export type Image = {
  url: string;
  width: number;
  height: number;
};

export type WorksContents = {
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
  is_show_top: boolean;
};

export type WorksContentsList = {
  contents: WorksContents[];
  totalCount: number;
  offset: number;
  limit: number;
};
