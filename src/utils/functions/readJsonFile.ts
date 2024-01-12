import { promises as fs } from 'fs'

const readJsonFile = async (filePath: string): Promise<any> => {
  try {
    const rawData: string = await fs.readFile(filePath, 'utf8')
    const jsonData = JSON.parse(rawData)
    return jsonData
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error('No existing secrets found', filePath)
      throw new Error(`File not found: ${filePath}`)
    } else if (error instanceof SyntaxError) {
      console.error('Invalid secrets found', error.message)
      throw new Error(`Error parsing JSON data in file: ${filePath}`)
    } else {
      console.error('Unknown error reading or parsing file:', error)
      throw error
    }
  }
}

export default readJsonFile
