# 发布、PGO 与自动差分

发布 GitHub Release 后，工作流在 Windows、Linux、macOS 的 x86-64/ARM64 原生 runner 上构建。Windows/Linux 使用 LLVM Clang + LLD，macOS 使用 Apple Clang 与系统 linker。

正式参数：

```text
-O3 -flto=full -DNDEBUG -fomit-frame-pointer
Windows/Linux: -fuse-ld=lld
```

## 三套隔离 PGO

三个程序不共享综合 corpus：

```text
真实 component/import/slot/build/template authoring → pxml-expand.profdata
真实 expanded PXML → compact/optimized PXIR    → pxml-opt.profdata
真实 optimized PXIR → PXB                      → pxml-compiler.profdata
```

每个 stage executable 在独立 build directory 中使用自己的 profile。`pxmlc` 使用三份 profile 的 merge，使共享 hot code 获得三阶段数据；不会引入第四份通用训练 profile。Release 中的 `pgo-build.json` 记录 raw profile 数、训练轮次、flags 和映射。

## 自动化差分

发布任务下载上一条非 draft Release，并分别为四个程序、六个平台生成 BSDIFF40 patch。每份 patch 必须经 `bspatch(old, patch)` 重建并与新 binary `cmp` 完全相等后才能上传。Manifest 记录 tool、target、tag、三份 SHA-256 与大小。

`SHA256SUMS` 覆盖 archive、build metadata、patch 和 manifest。差分只是传输优化，消费方仍需验证目标 hash。
