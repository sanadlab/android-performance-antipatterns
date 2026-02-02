import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCodeExample } from '../utils/csvLoader';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './IssueDetail.css';
import { DETECTION_TOOLS } from '../utils/constants';

const IssueDetail = ({ issues }) => {
  const { issueId } = useParams();
  const [issue, setIssue] = useState(null);
  const [examples, setExamples] = useState({
    example1: null,
    example2: null
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('explanation');

  useEffect(() => {
    const foundIssue = issues.find(i => i.Issue === issueId);
    
    if (foundIssue) {
      setIssue(foundIssue);
      
      const loadExamples = async () => {
        setLoading(true);
        
        // Load code examples if available
        const [example1, example2] = await Promise.all([
          fetchCodeExample(foundIssue.Example_1),
          fetchCodeExample(foundIssue.Example_2)
        ]);
        
        setExamples({ example1, example2 });
        setLoading(false);
      };
      
      loadExamples();
    } else {
      setIssue(null);
      setLoading(false);
    }
  }, [issueId, issues]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading issue details...</p>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="error-container">
        <h2>Issue Not Found</h2>
        <p>The performance issue you're looking for doesn't exist in our database.</p>
        <Link to="/" className="back-button">Return to Issue List</Link>
      </div>
    );
  }

  // Get list of tools that can detect this issue
  const detectionTools = DETECTION_TOOLS.filter(tool => issue[tool] === '✅');

  return (
    <div className="issue-detail-container">
      <div className="issue-header">
        <Link to="/" className="back-button">
          ← Back to Issue List
        </Link>
        <h1>{issue.Issue}</h1>
        <div className="issue-badges">
          {issue.Category && (
            <span className="category-badge">{issue.Category}</span>
          )}
          {issue['Side-Effect'] && (
            <span className="side-effect-badge">{issue['Side-Effect']}</span>
          )}
          {issue['Android-Specific'] === 'Yes' && (
            <span className="android-badge">Android-Specific</span>
          )}
          <span className="severity-badge">Severity: {issue.Severity || 'Not specified'}</span>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={activeTab === 'explanation' ? 'active' : ''} 
            onClick={() => setActiveTab('explanation')}
          >
            Explanation
          </button>
          <button 
            className={activeTab === 'fix' ? 'active' : ''} 
            onClick={() => setActiveTab('fix')}
          >
            How to Fix
          </button>
          <button 
            className={activeTab === 'examples' ? 'active' : ''} 
            onClick={() => setActiveTab('examples')}
          >
            Code Examples
          </button>
          <button 
            className={activeTab === 'detection' ? 'active' : ''} 
            onClick={() => setActiveTab('detection')}
          >
            Detection Tools
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'explanation' && (
            <div className="explanation-tab">
              <h2>Explanation</h2>
              {issue.Explanation ? (
                <p>{issue.Explanation}</p>
              ) : (
                <p className="no-content">No detailed explanation available for this issue.</p>
              )}
             <h2>Void if</h2>
              {issue["Possible Void"] ? (
                <p>{issue['Possible Void']}</p>
              ) : (
                <p className="no-content">No detailed explanation available for this issue.</p>
              )}
              
              {issue.Sample && issue.Sample.startsWith('http') ? (
                <div className="sample-link">
                  <h3>Learn More</h3>
                  <a href={issue.Sample} target="_blank" rel="noopener noreferrer">
                    {issue.Sample}
                  </a>
                </div>
              ) : issue.Sample ? (
                <div className="sample-text">
                  <h3>Additional Information</h3>
                  <p>{issue.Sample}</p>
                </div>
              ) : null}
            </div>
          )}

          {activeTab === 'fix' && (
            <div className="fix-tab">
              <h2>How to Fix</h2>
              {issue['Expected fix'] ? (
                <p>{issue['Expected fix']}</p>
              ) : (
                <p className="no-content">No fix recommendation available for this issue.</p>
              )}
              
              <div className="supported-files">
                <h3>Affected File Types</h3>
                {issue['File Extensions'] ? (
                  <p>{issue['File Extensions']}</p>
                ) : (
                  <p>Not specified</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="examples-tab">
              <h2>Code Examples</h2>
              
              {(examples.example1 || examples.example2) ? (
                <div className="code-examples">
                  {examples.example1 && (
                    <div className="code-example">
                      <h3>Example 1</h3>
                      <SyntaxHighlighter language="java" style={vscDarkPlus}>
                        {examples.example1}
                      </SyntaxHighlighter>
                    </div>
                  )}
                  
                  {examples.example2 && (
                    <div className="code-example">
                      <h3>Example 2</h3>
                      <SyntaxHighlighter language="java" style={vscDarkPlus}>
                        {examples.example2}
                      </SyntaxHighlighter>
                    </div>
                  )}
                </div>
              ) : (
                <p className="no-content">No code examples available for this issue.</p>
              )}
            </div>
          )}

          {activeTab === 'detection' && (
            <div className="detection-tab">
              <h2>Detection Tools</h2>
              
              {detectionTools.length > 0 ? (
                <div className="detection-tools-list">
                  <p>This performance issue can be detected by the following tools:</p>
                  <ul>
                    {detectionTools.map(tool => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="no-content">No detection tools specified for this issue.</p>
              )}
              
              <div className="kotlin-support">
                <h3>Kotlin Support</h3>
                <p>{issue['Detectable in Kotlin'] === '✅' ? 
                  'This issue can be detected in Kotlin code.' : 
                  'This issue may not be detectable in Kotlin code.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;