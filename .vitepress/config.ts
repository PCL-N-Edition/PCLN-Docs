import { defineConfig, UserConfig } from 'vitepress'
import { withI18n } from 'vitepress-i18n';
import { VitePressI18nOptions } from 'vitepress-i18n/types';

const pluginSdkSidebar = [
  {
    text: '入门',
    collapsed: false,
    items: [
      { text: 'SDK 概览', link: '/plugin-sdk/' },
      { text: '学习路线', link: '/plugin-sdk/Learning-Path' },
      { text: '快速开始', link: '/plugin-sdk/Getting-Started' },
      { text: '从零完成第一个插件', link: '/plugin-sdk/Tutorial-First-Plugin' },
      { text: '桌面端安装与调试', link: '/plugin-sdk/Desktop-Installation-and-Debugging' },
    ],
  },
  {
    text: '核心概念',
    collapsed: true,
    items: [
      { text: '架构与边界', link: '/plugin-sdk/Architecture-and-Boundaries' },
      { text: 'NuGet 包', link: '/plugin-sdk/NuGet-Packages' },
      { text: '插件身份与版本', link: '/plugin-sdk/Plugin-Identity-and-Versioning' },
      { text: '生命周期与注册项', link: '/plugin-sdk/Lifecycle-and-Registrations' },
      { text: '兼容与废弃', link: '/plugin-sdk/Compatibility-and-Deprecation' },
    ],
  },
  {
    text: '功能实战',
    collapsed: false,
    items: [
      { text: '服务、设置与后台任务实战', link: '/plugin-sdk/Tutorial-Services-and-Settings' },
      { text: '服务参考', link: '/plugin-sdk/Services' },
      { text: '实战案例集', link: '/plugin-sdk/Examples-Cookbook' },
    ],
  },
  {
    text: 'UI 扩展',
    collapsed: false,
    items: [
      { text: 'UI 扩展实战', link: '/plugin-sdk/Tutorial-UI-Extension' },
      { text: 'UI Surface 与 Slot', link: '/plugin-sdk/UI-Surfaces-and-Slots' },
      { text: 'UI Patch 与冲突', link: '/plugin-sdk/UI-Patches-and-Conflicts' },
    ],
  },
  {
    text: 'Manifest 与安全',
    collapsed: true,
    items: [
      { text: 'Plugin Manifest', link: '/plugin-sdk/Plugin-Manifest' },
      { text: '依赖与兼容声明', link: '/plugin-sdk/Dependencies-and-Compatibility' },
      { text: '权限与安全', link: '/plugin-sdk/Permissions-and-Security' },
      { text: 'Analyzer 参考', link: '/plugin-sdk/Analyzer-Reference' },
    ],
  },
  {
    text: '构建、测试与发布',
    collapsed: false,
    items: [
      { text: '依赖与打包实战', link: '/plugin-sdk/Tutorial-Dependencies-and-Packaging' },
      { text: '构建 .pnp', link: '/plugin-sdk/Building-PNP-Packages' },
      { text: '测试插件', link: '/plugin-sdk/Testing-Plugins' },
      { text: '测试、调试与发布实战', link: '/plugin-sdk/Tutorial-Test-Debug-Release' },
      { text: 'OpenPGP 签名', link: '/plugin-sdk/OpenPGP-Signing' },
      { text: '发布插件', link: '/plugin-sdk/Publishing-a-Plugin' },
    ],
  },
  {
    text: '排错与参考',
    collapsed: true,
    items: [
      { text: '故障排查', link: '/plugin-sdk/Troubleshooting' },
      { text: 'FAQ', link: '/plugin-sdk/FAQ' },
    ],
  },
];

const englishPluginSdkSidebar = pluginSdkSidebar.map(section => ({
  ...section,
  text: section.text,
  items: section.items.map(item => ({ ...item, link: `/en${item.link}` }))
}));

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
    outline: {
      level: [2, 3],
      label: '本页目录',
    },
    sidebar: {
      '/plugin-sdk/': pluginSdkSidebar,
      '/en/plugin-sdk/': englishPluginSdkSidebar,
      '/en/': [
        {
          text: 'PCL N',
          items: [
            { text: 'Home', link: '/en/' },
            { text: 'Projects', link: '/en/projects' },
            { text: 'Plugin SDK 0.2.0', link: '/en/plugin-sdk/' },
          ],
        },
      ],
    },

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
          text: '开发者工作台',
          link: 'https://pcln.top/#/home'
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
  withI18n(vitepressConfig, i18nConfig)
)
