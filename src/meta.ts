// src/meta.ts

interface PageMeta {
    auth: boolean;
    [key: string]: any;
  }

  const pageMeta: PageMeta = {
    auth: false,
  };

  export function definePageMeta(meta: PageMeta) {
    Object.assign(pageMeta, meta);
  }

  export function getPageMeta(): PageMeta {
    return pageMeta;
  }