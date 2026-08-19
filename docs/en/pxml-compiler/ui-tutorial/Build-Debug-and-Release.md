# Build, debug, and release

## Project layout

```text
Ui/
├ Pages/
├ Components/
├ Shared/Templates.pxml
├ Styles/
├ Resources/
└ Localization/
```

List pages, components, and imports explicitly in the build graph so glob ordering or implicit filesystem access cannot affect reproducibility.

## Validate and build

```bash
pxmlc format Ui/Pages/Home.pxml -o Home.formatted.pxml
pxmlc check Ui/Pages/Home.pxml --strict \
  --component Ui/Components/ActionCard.pxml \
  --import Ui/Shared/Templates.pxml

pxmlc --full Ui/Pages/Home.pxml -o out/Home.pxb \
  --component Ui/Components/ActionCard.pxml \
  --import Ui/Shared/Templates.pxml \
  -D RELEASE --release --strict --warn-as-error
```

`--full` keeps expansion, optimization, and compilation in one process. Use standalone stages only for debugging:

```bash
pxml-expand Home.pxml -o Home.expanded.pxml --component ActionCard.pxml -D DEBUG
pxml-opt Home.expanded.pxml -o Home.pxir --debug
pxml-compile Home.pxir -o Home.pxb --debug --strict
```

Inspect artifacts with `pxmlc inspect` and `pxmlc dump`. Debug builds retain source maps; release fingerprints detect corruption/nondeterminism but are not authenticity signatures.

CI should run strict warnings-as-errors, build twice and compare bytes, and keep compiler version/profile/symbol/resource inputs fixed. Core PXB follows the Runtime ABI gate; dynamic packages also require manifest, permissions, resource packaging, and signatures. Release hashes/signatures establish authenticity, while BSDIFF is transport-only.

Troubleshoot in order: format, strict check, expanded PXML, PXB dump, then Runtime Binding/Layout/Motion/Scope traces.

Finish with the [complete page example](./Complete-Example).

