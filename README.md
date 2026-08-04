# PCL N Docs

PCL N 用户与插件开发文档。

| 环境 | 地址 |
|------|------|
| 生产 | https://docs.pcln.top/ |
| Cloudflare Pages | 项目名 `pcln-docs`（自动部署） |
| 预览 | https://pcln-docs.pages.dev/（首次部署后） |

## 本地

```powershell
pnpm install
pnpm docs:dev
```

插件 SDK 页面由 `PCL-N-Plugin-SDK/wiki` 同步：

```powershell
pnpm docs:sync
pnpm docs:build
```

默认从同级目录 `../PCL-N-Plugin-SDK/wiki`（及 `wiki-en`）读取，也可用环境变量：

- `PCLN_PLUGIN_SDK_WIKI`
- `PCLN_PLUGIN_SDK_WIKI_EN`

## Cloudflare Pages 部署

推送 `main` 触发 `.github/workflows/cloudflare-pages.yml`。

### 仓库 Secrets

在 **Settings → Environments → `cloudflare-pages` → Environment secrets**（或 Repository secrets）配置：

| Secret | 说明 |
|--------|------|
| `CLOUDFLARE_API_TOKEN` | Account → Cloudflare Pages → Edit（及 Account Settings → Read 等） |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID |

可与 `PCL-N-Plugin-Center-Web` 使用同一套 Token / Account ID。

### 本地手动发布

```powershell
# 需 wrangler login 或设置 CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID
pnpm deploy:cf
```

### 自定义域

工作流会尝试绑定 `docs.pcln.top`。DNS（Zone `pcln.top`）建议：

| 类型 | 名称 | 目标 | 代理 |
|------|------|------|------|
| CNAME | `docs` | `pcln-docs.pages.dev` | 橙云 |

若仍指向 GitHub Pages / 其它 Worker，请在 Cloudflare Dashboard 调整，并确保域名只挂在 **pcln-docs** 项目上。

旧 **GitHub Pages** 工作流已退役（`pages.yml` 仅提示）。
