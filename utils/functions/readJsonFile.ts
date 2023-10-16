import { promises as fs } from 'fs';

const readJsonFile = async (filePath: string) => {
    try {
        const rawData: string = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(rawData);
        return jsonData;
    } catch (error) {
        console.error('Error reading or parsing file:', error);
        throw error;
    }
}

export default readJsonFile