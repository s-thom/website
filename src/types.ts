export interface MdPageInfo {
  data: MdPageData;
  text: string;
}

export interface MdPageData {
  title: string;
  filename: string;
  id: string;
  url: string;
  layout: string;
  date: string;
  edited?: string;
  img?: string;
  bgcolor?: string;
  github?: string;
  type?: string;
  showType?: boolean;
}
