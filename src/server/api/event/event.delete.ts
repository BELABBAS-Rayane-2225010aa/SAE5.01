import { EventPage } from '../../../models/event';
import { EventsRepository } from '../../../server/repository/EventRepository';

export class EventDelete {
  async delete(id : number): Promise<EventPage | undefined> {
    try {
        return await EventsRepository.deleteEventById(id);
    } catch (error) {
        console.error(error);
        throw new Error("Error writing to file");
    }
  }
}