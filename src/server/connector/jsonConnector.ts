export class JsonConnector {
  public static async saveData(data: any, filePath: string): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(filePath, jsonData);
      console.log('localStorage', localStorage.getItem("/data/event.json"));
      // Vérifiez si les données ont été correctement sauvegardées
      const savedData = localStorage.getItem(filePath);
      if (savedData !== jsonData) {
        throw new Error('Failed to save data to localStorage');
      }
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

  public static async updateData(newData: any, filePath: string): Promise<void> {
    try {
      const allData = await this.getData(filePath);
      const updatedData = allData.map((item: any) => {
        if (item.id === newData.id) {
          return { ...item, ...newData };
        }
        return item;
      });

      // Ensure no duplicate entries
      const uniqueData = updatedData.filter((item: any, index: number, self: any[]) =>
        index === self.findIndex((t) => (
          t.id === item.id
        ))
      );

      await this.saveData(uniqueData, filePath);
    } catch (error) {
      console.error(error);
      throw new Error(`Error updating data in file ${error}`);
    }
  }
}