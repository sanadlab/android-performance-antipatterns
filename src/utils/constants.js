
const DETECTION_TOOLS = [
    'Chimera', 'Adoctor', 'DAAP', 'Lint', 'PMD',
    'Ecoandroid', 'Leafactor', 'Paprika', 'Droidlens', 'xAL',
    'Spotbugs', 'Spotbugs-fbcontrib', 'Infer', 'Detekt'
  ];

const ISSUE_CATEGORIES = [
    'Suboptimal Algorithm',
    'Resource Management',
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
    'Energy'
  ];

export { DETECTION_TOOLS, ISSUE_CATEGORIES, SIDE_EFFECTS };