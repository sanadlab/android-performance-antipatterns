import React from 'react';
import './Publications.css';

const PUBLICATIONS = [
  {
    title: 'Towards LLMinating Performance Anti-Patterns in Android Apps',
    authors: 'Rui Rua, Karim Ali',
    venue: '2026 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW), pp. 17-24',
    summary: 'An empirical evaluation of Large Language Models and static analysis tools for the detection of the performance anti-patterns of this catalog in Android apps.',
    links: [
      { label: 'Paper (DOI)', url: 'https://doi.org/10.1109/ICSTW72326.2026.00016' },
      { label: 'Replication package', url: 'https://github.com/sanadlab/llms_vs_sats_repl_package' }
    ],
    bibtex: `@inproceedings{RuaAli2026LLMinating,
  author    = {Rua, Rui and Ali, Karim},
  title     = {Towards {LLMinating} Performance Anti-Patterns in {Android} Apps},
  booktitle = {2026 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW)},
  year      = {2026},
  pages     = {17--24},
  doi       = {10.1109/ICSTW72326.2026.00016}
}`
  },
  {
    title: 'Magnifying Inefficiency: How LLMs Amplify Performance Anti-Patterns in Mobile Development',
    authors: 'Rui Rua, Karim Ali',
    venue: 'Journal Ahead Workshop (JAWs), co-located with the 48th IEEE/ACM International Conference on Software Engineering (ICSE), 2026',
    summary: 'A comparison of the density of the performance anti-patterns of this catalog in LLM-generated and human-written Android projects.',
    links: [
      { label: 'Replication package', url: 'https://github.com/sanadlab/llm_code_analysis_repl_package' }
    ],
    bibtex: `@inproceedings{RuaAli2026Magnifying,
  author    = {Rua, Rui and Ali, Karim},
  title     = {Magnifying Inefficiency: How {LLMs} Amplify Performance Anti-Patterns in Mobile Development},
  booktitle = {Proceedings of the Journal Ahead Workshop (JAWs), co-located with the 48th IEEE/ACM International Conference on Software Engineering (ICSE)},
  year      = {2026},
  address   = {Rio de Janeiro, Brazil}
}`
  }
];

const CATALOG_BIBTEX = `@misc{PAPsCatalog,
  author       = {Rua, Rui},
  title        = {{PAPs} Catalog: A Catalog of {Android} Performance Anti-Patterns},
  year         = {2026},
  version      = {5.0.0},
  howpublished = {\\url{https://sanadlab.org/android-performance-antipatterns/}}
}`;

const Publications = () => {
  return (
    <div className="publications-container">
      <div className="intro-section">
        <h1>Related Publications</h1>
        <p>How to cite this catalog, and the research papers that use it.</p>
      </div>

      <div className="publication-card">
        <h2>Cite this catalog</h2>
        <p>
          Cite the catalog with its version. Each anti-pattern has a permanent link (the address of its page).
          The changes between versions are in the CHANGELOG file of the repository.
        </p>
        <pre className="publication-bibtex">{CATALOG_BIBTEX}</pre>
      </div>

      {PUBLICATIONS.map((publication) => (
        <div key={publication.title} className="publication-card">
          <h2>{publication.title}</h2>
          <p className="publication-authors">{publication.authors}</p>
          <p className="publication-venue">{publication.venue}</p>
          <p>{publication.summary}</p>
          <div className="publication-links">
            {publication.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
          <pre className="publication-bibtex">{publication.bibtex}</pre>
        </div>
      ))}
    </div>
  );
};

export default Publications;
