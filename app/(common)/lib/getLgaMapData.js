import 'server-only'; // Ensure this utility is only used on the server
import * as fs from 'fs';
import * as path from 'path';


const svgPath = path.join(process.cwd(), 'app', '(common)', 'lib', 'data', 'nigerianSvg.json');
const lgaListPath = path.join(process.cwd(), 'app', '(common)', 'lib', 'data', 'statelgaList.json');

export async function getLgaMapData() {
    try {
        // 1. Read SVG Data
        const svgContents = fs.readFileSync(svgPath, 'utf8');
        const svgData = JSON.parse(svgContents);

        // 2. Read LGA List Data
        const lgaListContents = fs.readFileSync(lgaListPath, 'utf8');
        const lgaListData = JSON.parse(lgaListContents);
        
        // 3. Return a clean object containing both datasets
        return {
            statesSvg: svgData.statesSvg,
            allLgas: lgaListData
        };
    } catch (error) {
        console.error("Error reading LGA Map Data files:", error);
        // Return fallback data to prevent application crash
        return { 
            statesSvg: [], 
            allLgas: {} 
        };
    }
}