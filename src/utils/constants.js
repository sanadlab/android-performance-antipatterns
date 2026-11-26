
const DETECTION_TOOLS = [
    'Chimera', 'Adoctor', 'DAAP', 'Lint', 'PMD',
    'Ecoandroid', 'Leafactor', 'Paprika', 'Droidlens', 'xAL',
    'Spotbugs', 'Spotbugs-fbcontrib', 'Infer', 'Detekt'
  ];

const ISSUE_CATEGORIES = [
    'Suboptimal Algorithm',
    'Resource Management',
    'UI Rendering',
    'API Misuse',
    'Concurrency',
    'Code Smell',
    'Data Manipulation',
    'Obsolete Solution',
    'Unnecessary Computation',
    'Data Access',
    'RPC/IPC',
    'Build Optimization'
  ];

const SIDE_EFFECTS = [
    'Runtime',
    'Memory',
    'Energy',
    'App Size',
    'Build Time'
  ];

// A tool cell can hold a note after the mark (for example '✅?').
const isDetectedBy = (issue, tool) => (issue[tool] || '').startsWith('✅');

export { DETECTION_TOOLS, ISSUE_CATEGORIES, SIDE_EFFECTS, isDetectedBy };