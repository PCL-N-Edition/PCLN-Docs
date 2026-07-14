# PCL N Docs

PCL N 用户与插件开发文档，生产域名为 `https://docs.pcln.top/`。

插件 SDK 页面由 `PCL-N-Plugin-SDK/wiki` 同步生成：

```powershell
pnpm docs:sync
pnpm docs:build
```

默认从同级目录 `../PCL-N-Plugin-SDK/wiki` 读取，也可通过环境变量 `PCLN_PLUGIN_SDK_WIKI` 指定来源。
