# Android Performance Issues Catalog

A comprehensive catalog of statically detectable performance issues in Android applications. This web application allows users to browse, filter, and learn about common performance issues, how to detect them, and how to fix them.

## Features

- Browse all known Android performance issues
- Filter issues by name, category, platform specificity, and detection tools
- View detailed explanations, code examples, and fix recommendations for each issue
- Responsive design for desktop and mobile use

## Project Structure

```
android-performance-antipatterns/
├── public/
│   ├── data/
│   │   └── performance_issues_list.csv   # CSV data file with all performance issues
│   ├── examples/             # Directory for code examples
│   │   ├── SlowForLoop1.txt
│   │   ├── SlowForLoop2.txt
│   │   ├── DrawAllocation1.txt
│   │   └── ...              # Other example files
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Home.js           # Home page with issue list and filters
│   │   ├── Home.css
│   │   ├── IssueDetail.js    # Detailed view for a single issue
│   │   ├── IssueDetail.css
│   │   ├── Navigation.js     # Navigation bar component
│   │   └── Navigation.css
│   ├── utils/
│   │   └── csvLoader.js      # Utility for loading and parsing CSV data
│   ├── App.js                # Main application component
│   ├── App.css               # Global styles
│   ├── index.js              # Application entry point
│   └── index.css             # Reset and base styles
└── package.json              # Project dependencies and scripts
```

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/android-performance-antipatterns.git
   cd android-performance-antipatterns
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Build for production:
   ```
   npm run build
   ```

5. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

## Adding or Updating Performance Issues

1. Update the CSV file at `public/data/perfs.csv` with new issues or modifications
2. Add code examples as text files in the `public/examples/` directory
3. Ensure the CSV references the correct example filenames

## Technologies Used

- React.js
- React Router
- PapaParse (CSV parsing)
- React Syntax Highlighter
- GitHub Pages (hosting)

## License

[MIT License](LICENSE)