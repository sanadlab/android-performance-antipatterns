# PAPs Catalog: Android Performance Anti-Patterns

A catalog of 188 performance anti-patterns (PAPs) that static analysis tools can detect in Android apps.

**Website:** https://sanadlab.org/android-performance-antipatterns/

For each anti-pattern, the catalog gives:

- an explanation and the expected fix;
- a category, the performance impact (runtime, memory, energy, app size, or build time), and if it is specific to Android;
- the tools that detect it (14 tools, for example Android Lint, PMD, SpotBugs, Infer, Detekt, Paprika, aDoctor);
- two code examples, each with the inefficient code and the fixed code;
- the conditions that make it not applicable, and a scenario where it can occur.

## Data

| Path | Content |
|---|---|
| `public/data/performance_issues_list.csv` | The catalog. One row for each anti-pattern. The separator is `;`. |
| `public/data/examples/` | The code examples. `<Name>1.txt` and `<Name>2.txt` are the examples that the website shows. `<Name>_annotated_1.txt` and `<Name>_annotated_2.txt` are the same examples with comments. |
| `docs/CODEBOOK.md` | The rules to classify an anti-pattern. It also describes each column of the catalog. |
| `docs/proposed_classifications.csv` | The record of the reclassification in version 5.0.0: the value of each row before and after, with the rationale. |
| `CHANGELOG.md` | The changes between catalog versions. |

In an example file, the line `-----` separates the inefficient code from the fixed code.

## How to cite

Cite the catalog with its version (see `CITATION.cff`), and the paper that introduced it:

```bibtex
@misc{PAPsCatalog,
  author       = {Rua, Rui},
  title        = {{PAPs} Catalog: A Catalog of {Android} Performance Anti-Patterns},
  year         = {2026},
  version      = {5.0.0},
  howpublished = {\url{https://sanadlab.org/android-performance-antipatterns/}}
}

@inproceedings{RuaAli2026LLMinating,
  author    = {Rua, Rui and Ali, Karim},
  title     = {Towards {LLMinating} Performance Anti-Patterns in {Android} Apps},
  booktitle = {2026 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW)},
  year      = {2026},
  pages     = {17--24},
  doi       = {10.1109/ICSTW72326.2026.00016}
}
```

To refer to one anti-pattern, use its permanent link:
`https://sanadlab.org/android-performance-antipatterns/#/issue/<Name>` (for example `.../#/issue/SlowForLoop`).

### Publications that use the catalog

- Rui Rua and Karim Ali. *Towards LLMinating Performance Anti-Patterns in Android Apps.* ICSTW 2026. [DOI](https://doi.org/10.1109/ICSTW72326.2026.00016)
- Rui Rua and Karim Ali. *Magnifying Inefficiency: How LLMs Amplify Performance Anti-Patterns in Mobile Development.* JAWs, co-located with ICSE 2026.

## Run the website locally

You need Node.js and npm.

```
git clone https://github.com/sanadlab/android-performance-antipatterns.git
cd android-performance-antipatterns
npm install
npm start
```

Then open http://localhost:3000/android-performance-antipatterns/.

Other commands:

- `npm run build` makes the production build in `build/`.
- `npm run deploy` builds the website and publishes it to GitHub Pages.

## Add or change an anti-pattern

1. Classify the anti-pattern with the rules in `docs/CODEBOOK.md`.
2. Add or change the row in `public/data/performance_issues_list.csv`. Do not change the `Issue` name of a released anti-pattern, because datasets and papers use it as a key.
3. Add the two example files to `public/data/examples/` and put their names in the columns `Example_1` and `Example_2`.
4. Record the change in `CHANGELOG.md`. For a release, also change the version in `CITATION.cff` and `package.json`, and make a git tag.

## Project structure

```
public/data/          Catalog data (CSV and code examples)
src/App.js            Routes and data loading
src/components/       Pages: Home (list and filters), IssueDetail, Publications, Navigation
src/utils/            CSV loader and constants (tools, categories)
docs/                 Codebook and classification proposal
```

The website uses React, React Router, PapaParse, and React Syntax Highlighter.

## License

[MIT License](LICENSE)
