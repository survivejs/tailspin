type Pages = {
  [key: string]: Page;
};
type Page = {
  default: ({
    url,
    title,
    meta,
  }: {
    url: string;
    title?: string;
    meta?: { [key: string]: string };
  }) => void;
};
type Urls = { [key: string]: string };

export { Pages, Page, Urls };
