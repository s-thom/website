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
  description: string;
  date: string;
  edited?: string;
  img?: string;
  bgcolor?: string;
  github?: string;
  type?: string;
  showType?: boolean;
  children?: MdPageData[];
}

export interface HeadData {
  title: string;
  url: string;
  description: string;
  img?: string;
  date?: string;
  edited?: string;
  tags?: string[];
}

export interface MdPageChild extends MdPageInfo {
  type: string;
  children?: MdPageData[];
}
