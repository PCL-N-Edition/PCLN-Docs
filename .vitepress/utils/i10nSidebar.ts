import { VitePressSidebarOptions } from "vitepress-sidebar/types";

const rootLocale = 'zhHans';
const supportedLocales = [rootLocale, 'en'];

const commonSidebarConfig: VitePressSidebarOptions = {
  documentRootPath: '/docs',
  capitalizeFirst: false,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  collapsed: true,
  collapseDepth: 3,
  excludeFilesByFrontmatterFieldName: 'exclude',
}

export function generateI18nSidebarConfig() {
  return [
    ...supportedLocales.map((lang) => {
      return {
        ...commonSidebarConfig,
        ...(rootLocale === lang ? {} : { basePath: `/${lang}/` }), // If using `rewrites` option
        documentRootPath: `/docs/${lang}`,
        resolvePath: rootLocale === lang ? '/' : `/${lang}/`,
      };
    })
  ]
}
