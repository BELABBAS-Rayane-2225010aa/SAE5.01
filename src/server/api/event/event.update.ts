import { EventPage } from '../../../models/event';
import { EventsRepository } from '../../../server/repository/EventRepository';

export class EventUpdate {
  async post(event: EventPage): Promise<EventPage | undefined> {
    try {
        return await EventsRepository.updateEvent(event);
    } catch (error) {
        console.error(error);
        throw new Error("Error writing to file");
    }
  }
}