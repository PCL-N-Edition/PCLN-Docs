# 命令行参考

## 独立阶段

```bash
pxml-expand INPUT.pxml -o EXPANDED.pxml \
  [--component FILE]... [-D SYMBOL]...

pxml-opt EXPANDED.pxml -o OPTIMIZED.pxir [--debug]

pxml-compile OPTIMIZED.pxir -o OUTPUT.pxb \
  [--debug] [--strict] [--warn-as-error]
```

`--component` 与 `-D` 可重复。`pxml-opt` 的输出是紧凑二进制 PXIR，而不是另一份文本 PXML。`pxml-compile` 不重新解析或展开 source，只消费 optimized PXIR。

## 完整内存管线

```bash
pxmlc --full INPUT.pxml -o OUTPUT.pxb \
  [--component FILE]... [-D SYMBOL]... \
  [--release] [--strict] [--warn-as-error]
```

它等价于三个阶段的语义组合，但 expanded PXML/PXIR 不序列化、不重读、不落盘。`--release` 删除 `SMAP`；`--strict` 要求根声明 `xmlns="pcl://ui"` 并拒绝未知属性。

兼容的检查与辅助命令：

```bash
pxmlc check INPUT.pxml [options]
pxmlc format INPUT.pxml -o FORMATTED.pxml
pxmlc inspect OUTPUT.pxb
pxmlc dump OUTPUT.pxb
```

退出码 `0` 为成功，`1` 为源文件/语义/binary 诊断，`2` 为 CLI 用法错误。诊断格式为 `path:line:column: severity CODE: message`。
