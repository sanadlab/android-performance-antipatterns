# Changelog

Each catalog version is one state of `public/data/`. Use the git tag of a version to get its data.

## 5.0.0 (2026-11-26)

Data:
- The catalog is now one file with a fixed name: `public/data/performance_issues_list.csv`. The files of versions 1 to 4 and `candidate_performance_list.csv` are removed from `public/data/`. They stay in the git history.
- Added the example files that 65 anti-patterns referred to but that did not exist (260 files, copied from the revalidation project).
- `Android-Specific`: corrected `yes` (Overdraw) and `NO` (InefficientKeySetIterator) to `Yes` and `No`.
- `AssertionSideEffect`: replaced the wrong explanation text with the text of the Android Lint rule.
- `UnpackedNativeCode`: removed a command-line hint from the start of the explanation.
- Removed HTML tags (`<i>`, `<br>`) from 7 explanations.
- The 5 header columns without a name are now one column, `Notes`. Removed empty lines.
- No category, side-effect, or severity value changed.

Website:
- Each anti-pattern has a permanent link (`/#/issue/<name>`) that works after a page reload.
- New Publications page with the citation of the catalog.
- A tool mark that has a note (for example `✅?`) now shows as detected, and the note is shown.
- The anti-pattern page shows the plausible occurrence scenario.

Documentation:
- Added `docs/CODEBOOK.md` (classification rules) and `docs/proposed_classifications.csv` (proposal, applied in version 6.0.0).
- Added `CITATION.cff` and this changelog.

## 4 (2026-02-02)

- 188 anti-patterns. File `performance_issues_list_v4.csv` (commit `8cb41eb`).

## 3 (2025-11-10)

- 188 anti-patterns. File `performance_issues_list_v3.csv` (commit `44309b8`).

## 2 (2025-08-28)

- 189 anti-patterns. More anti-patterns and tools. File `performance_issues_list_v2.csv` (commit `8d7a1ff`).

## 1 (2025-04-06)

- 123 anti-patterns. File `performance_issues_list.csv` (commit `e9f89bd`).
