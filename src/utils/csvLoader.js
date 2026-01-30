import Papa from 'papaparse';

export const fetchCsvData = async (csvFilePath) => {
  try {
    const response = await fetch(csvFilePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV file: ${response.status}`);
    }
    
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        delimiter: ';',
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            console.error('CSV parsing errors:', results.errors);
          }
          
          // Process data to ensure consistent format
          const processedData = results.data.map(row => {
            // Filter out empty entries and clean up data
            const cleanedRow = {};
            Object.entries(row).forEach(([key, value]) => {
              if (key && key.trim() !== '') {
                cleanedRow[key] = value;
              }
            });
            return cleanedRow;
          }).filter(row => row.Issue && row.Issue.trim() !== '');
          
          resolve(processedData);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching or parsing CSV:', error);
    throw error;
  }
};

// Helper function to get all unique values for a column
export const getUniqueValues = (data, column) => {
  const values = data.map(item => item[column]).filter(Boolean);
  return [...new Set(values)];
};

// Helper function to load code examples
export const fetchCodeExample = async (exampleFileName) => {
  if (!exampleFileName || exampleFileName.trim() === '') {
    return 'No example available';
  }
  
  try {
    const response = await fetch(`/android-performance-antipatterns/data/examples/${exampleFileName}`);
    if (!response.ok) {
      return `Code example could not be loaded (${exampleFileName})`;
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading code example ${exampleFileName}:`, error);
    return 'Error loading code example';
  }
};