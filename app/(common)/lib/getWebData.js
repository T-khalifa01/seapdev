import * as fs from 'fs';
import * as path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', '(common)', 'lib', 'data', 'webdata.json'); 
// NOTE:JSON file location from the root directory (process.cwd()).

export async function getWebData() {
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  const allData = JSON.parse(fileContents);

  // Return the processed data object
  return allData;
}