export interface HeadBase {
  url: string;
  title: string;
  img?: string;
  bgcolor?: string;
  icon?: string;
}

export interface HeadData extends HeadBase {
  description: string;
  date?: string;
  edited?: string;
  tags?: string[];
}

export interface MdPageData extends HeadData {
  filename: string;
  id: string;
  layout: string;
  github?: string;
  type?: string;
  showType?: boolean;
  children?: MdPageData[];
}

export interface MdPageInfo {
  data: MdPageData;
  text: string;
}

export interface MdPageChild extends MdPageInfo {
  type: string;
  children?: MdPageData[];
}
