export class JsonConnector {
  public static async saveData(data: any, filePath: string): Promise<void> {
    try {
      localStorage.setItem(filePath, JSON.stringify(data));
    } catch (error) {
      console.error(error);
      throw new Error(`Error writing to file ${error}`);
    }
  }

  public static async appendData(data: any, filePath: string): Promise<void> {
    try {
      const allData = await this.getData(filePath);
      allData.push(data);
      await this.saveData(allData, filePath);
    } catch (error) {
      console.error(error);
      throw new Error(`Error appending to file ${error}`);
    }
  }

  public static async getData(filePath: string): Promise<any> {
    try {
      const data = localStorage.getItem(filePath);
      if (data) {
        return JSON.parse(data);
      } else {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData;
      }
    } catch (error) {
      console.error(error);
      throw new Error(`Error reading from file ${error}`);
    }
  }
}