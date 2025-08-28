import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUniqueValues } from '../utils/csvLoader';
import './Home.css';

const Home = ({ issues }) => {
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    androidSpecific: '',
    detectionTools: []
  });

  // Get unique values for filter dropdowns
  const categories = getUniqueValues(issues, 'Category');
  
  // Create a list of all tools that can detect issues
  const detectionTools = [
    'Chimera', 'Adoctor', 'DAAP', 'Lint', 'PMD', 
    'Ecoandroid', 'Leafactor', 'Paprika', 'Droidlens', 'xAL', 'Spotbugs',
    'Spotbugs-fbinfer', 'Infer', 'Detekt'
  ];

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...issues];
    
    // Apply search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(issue => 
        issue.Issue.toLowerCase().includes(searchLower) || 
        (issue.Explanation && issue.Explanation.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(issue => issue.Category === filters.category);
    }
    
    // Apply Android-specific filter
    if (filters.androidSpecific) {
      const isAndroidSpecific = filters.androidSpecific === 'Yes';
      result = result.filter(issue => (issue['Android-Specific'] === 'Yes') === isAndroidSpecific);
    }
    
    // Apply tool filters
    if (filters.detectionTools.length > 0) {
      result = result.filter(issue => 
        filters.detectionTools.some(tool => issue[tool] === '✅')
      );
    }
    
    setFilteredIssues(result);
  }, [filters, issues]);

  const handleSearchChange = (e) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleAndroidSpecificChange = (e) => {
    setFilters({ ...filters, androidSpecific: e.target.value });
  };

  const handleToolToggle = (tool) => {
    const updatedTools = filters.detectionTools.includes(tool)
      ? filters.detectionTools.filter(t => t !== tool)
      : [...filters.detectionTools, tool];
    
    setFilters({ ...filters, detectionTools: updatedTools });
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      category: '',
      androidSpecific: '',
      detectionTools: []
    });
  };

  return (
    <div className="home-container">
      <div className="intro-section">
        <h1>Android Performance Issues Catalog</h1>
        <p>Browse through common performance issues in Android development and learn how to detect and fix them.</p>
      </div>
      
      <div className="filters-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or description..."
            value={filters.searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-options">
          <div className="filter-group">
            <label>Category:</label>
            <select value={filters.category} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Platform:</label>
            <select value={filters.androidSpecific} onChange={handleAndroidSpecificChange}>
              <option value="">All</option>
              <option value="Yes">Android-Specific</option>
              <option value="No">Generic</option>
            </select>
          </div>

          <div className="filter-group tools-filter">
            <label>Detection Tools:</label>
            <div className="tool-checkboxes">
              {detectionTools.map((tool) => (
                <label key={tool} className="tool-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.detectionTools.includes(tool)}
                    onChange={() => handleToolToggle(tool)}
                  />
                  {tool}
                </label>
              ))}
            </div>
          </div>

          <button className="reset-filters" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>

      <div className="issues-count">
        <p>Showing {filteredIssues.length} of {issues.length} issues</p>
      </div>

      <div className="issues-list">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue, index) => (
            <Link to={`/issue/${encodeURIComponent(issue.Issue)}`} key={index} className="issue-card">
              <h3>{issue.Issue}</h3>
              <div className="issue-meta">
                <span className="category">{issue.Category}</span>
                {issue['Android-Specific'] === 'Yes' && (
                  <span className="android-specific">Android-Specific</span>
                )}
              </div>
              <p className="issue-preview">
                {issue.Explanation && issue.Explanation.length > 150 
                  ? `${issue.Explanation.substring(0, 150)}...` 
                  : issue.Explanation || 'No description available'}
              </p>
              <div className="detection-tools">
                <span className="tool-label">Detected by:</span>
                <div className="tools-list">
                  {detectionTools.filter(tool => issue[tool] === '✅').map(tool => (
                    <span key={tool} className="tool-tag">{tool}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">
            <p>No performance issues match your filters.</p>
            <button onClick={resetFilters}>Reset Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;