# Changelog

Each catalog version is one state of `public/data/`. Use the git tag of a version to get its data.

## 6.0.0 (2026-11-26)

The classification of all the anti-patterns now follows `docs/CODEBOOK.md`. This version does not agree with the taxonomy in the publications (11 categories, 3 side-effects). Use version 4 or 5.0.0 to reproduce their results.

- `Category`: 115 rows changed. New category `UI Rendering`. The first value is the primary category, and the second value (if there is one) is the secondary category.
- `Side-Effect`: 30 rows changed. New values `App Size` and `Build Time`. A row can have two values.
- `Android-Specific`: 22 rows changed. No row has an empty value.
- `docs/proposed_classifications.csv` has the value of each row before and after, with the rationale.
- One rater made this classification. The validation with two raters (codebook, section 8) is not done.
- 9 rows are possibly out of scope (see the notes in `docs/proposed_classifications.csv`). They stay in the catalog.
- Website: the category and side-effect filters have the new values.

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
