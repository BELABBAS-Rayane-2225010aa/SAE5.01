import { Event } from "~/models/event";
import { JsonConnector } from "../connector/JsonConnector";

// Be careful with the path, if the file is not found, it will throw an error
// All the mothods to get, update, delete and create events are implemented here
export class EventsRepository {
  static filePath: string = process.cwd() + "/data/event.json";

  // Get all events
  public static async getEvents(): Promise<Event[]> {
    try {
      return (await JsonConnector.getData(this.filePath)) as Event[];
    } catch (error) {
      throw new Error("Error getting events");
    }
  }

  // Get event by id
  public static async getEventById(id: number): Promise<Event | undefined> {
    try {
      const events = (await JsonConnector.getData(this.filePath)) as Event[];
      return events.find((event) => event.id === id);
    } catch (error) {
      throw new Error("Error getting event by id");
    }
  }

  // Update event
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

  // Delete event by id
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

  // Create event
  public static async createEvent(event: Event): Promise<Event | undefined> {
    try {
      const events = (await JsonConnector.getData(this.filePath)) as Event[];
      const { id, ...rest } = event;
      const newEvent = { id: events.length + 1, ...rest };
      events.push(newEvent);
      await JsonConnector.saveData(events, this.filePath);
      return newEvent;
    } catch (error) {
      throw new Error("Error creating event");
    }
  }
}