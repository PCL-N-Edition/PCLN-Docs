# 编译阶段、PXIR 与 PXB

```text
source buffer
  → on-demand Lexer / zero-copy token view
  → arena-backed AST
  → Expander
  → Compact PXIR（uint32 IDs / interned strings）
  → fused linear Optimizer
  → typed blueprint
  → exact PXB layout / one final allocation
```

AST、PXIR 与编译 blueprint 都在分块 bump arena 中创建，生命周期结束时统一释放。PXIR node/property 是连续定长数组，关系使用 `first_child`/`next_sibling` ID；optimizer 不在 pointer tree 上反复递归。字符串池和 PXB string table 使用开放寻址，重复名称比较 ID/hash。

`pxmlc --full` 在内存中传递这些结构；独立 CLI 的边界分别是 expanded PXML 与 optimized PXIR，便于调试和 stage-specific PGO。

PXB1 显式写 little-endian 字段，header 后是 32-byte directory，payload 16-byte 对齐。主要 section 为 `STRS`、`NODE`、`PROP`、`BIND`、`DEPS`、`META` 和 debug-only `SMAP`。Writer 先计算完整 layout 和最终大小，再一次分配 binary、原位填写目录，最后一次写文件。

相同输入、组件集、构建符号和选项必须产生逐字节相同的 PXB；六平台 CI 都运行重复编译 diff gate。
