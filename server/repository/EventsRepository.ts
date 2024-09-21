import { Event } from "~/models/event";
import { JsonConnector } from "../connector/JsonConnector";

// Be careful with the path, if the file is not found, it will throw an error
export class EventsRepository {
  static filePath: string = process.cwd() + "/data/event.json";

  public static async saveEvents(events: Event[]): Promise<Event[]> {
    try {
      await JsonConnector.saveData(events, this.filePath);
      return (await JsonConnector.getData(this.filePath)) as Event[];
    } catch (error) {
      throw new Error("Error saving events");
    }
  }

  public static async getEvents(): Promise<Event[]> {
    try {
      return (await JsonConnector.getData(this.filePath)) as Event[];
    } catch (error) {
      throw new Error("Error getting events");
    }
  }
}