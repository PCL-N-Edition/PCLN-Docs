import { defineConfig, UserConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar';
import { withI18n } from 'vitepress-i18n';
import { generateI18nSidebarConfig } from './utils/i10nSidebar';
import { VitePressI18nOptions } from 'vitepress-i18n/types';

const vitepressConfig: UserConfig = {
  srcDir: "docs",
  
  title: "PCL N Docs",
  description: "PCL N 用户与插件开发文档",
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
  ],
  lang: 'zh-CN',
  cleanUrls: true,
  metaChunk: true,

  rewrites: {
    'zhHans/:rest*': ':rest*'
  },

  themeConfig: {
    logo: '/logo.png',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MuXue1230-owo/PCL-N' }
    ],

    footer: {
      message: 'Documentation released under CC BY-SA 4.0.',
      copyright: 'Copyright © 2026 <a href="https://github.com/MuXue1230-owo">PCL N contributors</a>'
    },
    editLink: {
      pattern: 'https://github.com/MuXue1230-owo/PCLN-Docs/edit/main/docs/:path',
    },
  },
}

const sidebarConfig = generateI18nSidebarConfig();

const i18nConfig: VitePressI18nOptions = {
  locales: ['zhHans', 'en'],
  searchProvider: 'local',
  rootLocale: 'zhHans',
  themeConfig: {
    en: {
      nav: [
        {
          text: 'Home',
          link: '/'
        },
        {
          text: 'PCL N Projects',
          link: '/en/projects'
        },
        {
          text: 'Plugin Market',
          link: 'https://pcln.top/'
        },
      ]
    },
    zhHans: {
      nav: [
        {
          text: '主页',
          link: '/'
        },
        {
          text: '插件开发',
          link: '/plugin-sdk/'
        },
        {
          text: '插件商店',
          link: 'https://pcln.top/'
        },
        {
          text: '身份认证',
          link: 'https://auth.pcln.top/'
        },
        {
          text: '项目列表',
          link: '/projects'
        },
      ]
    }
  }
};

export default defineConfig(
  withSidebar(withI18n(vitepressConfig, i18nConfig), sidebarConfig)
)
