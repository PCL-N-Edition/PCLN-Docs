# Releases, PGO, and diffs

Publishing a GitHub Release starts native builds for Windows, Linux, and macOS on x86-64 and ARM64. Windows/Linux use LLVM Clang and LLD; macOS uses Apple Clang and the system linker.

```text
-O3 -flto=full -DNDEBUG -fomit-frame-pointer
Windows/Linux: -fuse-ld=lld
```

## Three isolated profiles

The programs never share a synthetic catch-all corpus:

```text
real component/import/slot/build/template authoring → pxml-expand.profdata
real expanded PXML → compact optimized PXIR   → pxml-opt.profdata
real optimized PXIR → PXB                     → pxml-compiler.profdata
```

Each stage executable is rebuilt in its own directory with its own profile. `pxmlc` uses a merge of the three stage profiles so shared hot code receives representative data without creating a fourth generic corpus. `pgo-build.json` records the mapping, raw-profile counts, rounds, and flags.

The release workflow generates and verifies BSDIFF40 patches for all four tools on all six targets. Every patch is applied and compared byte-for-byte before upload. The manifest records tool, target, tags, hashes, and sizes. `SHA256SUMS` covers archives, metadata, patches, and manifests; diffs remain a transport optimization rather than an authenticity mechanism.
