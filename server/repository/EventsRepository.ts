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

  public static async getEventById(id: number): Promise<Event | undefined> {
    try {
      const events = (await JsonConnector.getData(this.filePath)) as Event[];
      return events.find((event) => event.id === id);
    } catch (error) {
      throw new Error("Error getting event by id");
    }
  }

  public static async updateEvent(event: Event): Promise<Event | undefined> {
    try {
      const events = (await JsonConnector.getData(this.filePath)) as Event[];
      const index = events.findIndex((e) => e.id === event.id);
      events[index] = event;
      await JsonConnector.saveData(events, this.filePath);
      return event;
    } catch (error) {
      throw new Error("Error updating event");
    }
  }

  public static async deleteEventById(id: number): Promise<Event | undefined> {
    try {
      const events = (await JsonConnector.getData(this.filePath)) as Event[];
      const index = events.findIndex((e) => e.id === id);
      const event = events[index];
      events.splice(index, 1);
      await JsonConnector.saveData(events, this.filePath);
      return event;
    } catch (error) {
      throw new Error("Error deleting event by id");
    }
  }
}