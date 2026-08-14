# CLI reference

## Independent stages

```bash
pxml-expand INPUT.pxml -o EXPANDED.pxml \
  [--component FILE]... [--import FILE]... [-D SYMBOL]...
pxml-opt EXPANDED.pxml -o OPTIMIZED.pxir [--debug]
pxml-compile OPTIMIZED.pxir -o OUTPUT.pxb \
  [--debug] [--strict] [--warn-as-error]
```

`--component`, `--import`, and `-D` are repeatable. Imports resolve only against explicitly registered files; the expander does not open arbitrary paths implicitly. `pxml-opt` emits compact binary PXIR. `pxml-compile` consumes that optimized IR directly and does not parse or expand source PXML again.

## In-memory full pipeline

```bash
pxmlc --full INPUT.pxml -o OUTPUT.pxb \
  [--component FILE]... [-D SYMBOL]... \
  [--import FILE]... \
  [--release] [--strict] [--warn-as-error]
```

This has the same semantics as the three stages, but intermediate PXML/PXIR remains in memory. `--release` omits `SMAP`; `--strict` requires `xmlns="pcl://ui"` and rejects unknown properties.

Additional commands are `pxmlc check`, `pxmlc format`, `pxmlc inspect`, and `pxmlc dump`. Exit code `0` means success, `1` means a source/semantic/binary diagnostic, and `2` means invalid CLI usage.
