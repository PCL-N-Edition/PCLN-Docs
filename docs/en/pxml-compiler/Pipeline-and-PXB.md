# Pipeline, PXIR, and PXB

```text
source buffer
  → on-demand lexer / zero-copy token views
  → arena-backed AST
  → expander
  → compact PXIR (uint32 IDs / interned strings)
  → fused linear optimizer
  → typed blueprint
  → exact PXB layout / one final allocation
```

AST, PXIR, and the compiler blueprint use block bump arenas and are released as a unit. PXIR nodes and properties are fixed-size contiguous arrays; tree relationships are IDs. The optimizer therefore scans linear memory instead of repeatedly walking a pointer tree. String pools and the PXB string table use open addressing.

`pxmlc --full` passes these representations in memory. The standalone programs materialize expanded PXML and optimized PXIR only for diagnostics, testing, and stage-specific profiling.

PXB1 encodes little-endian fields explicitly. Its 32-byte directory addresses 16-byte-aligned `STRS`, `NODE`, `PROP`, `BIND`, `DEPS`, `META`, and optional `SMAP` sections. The writer computes the complete layout, allocates the final binary once, fills the directory in place, and performs one file write.

All six native CI targets compile the same corpus twice and require byte-identical PXB output.
