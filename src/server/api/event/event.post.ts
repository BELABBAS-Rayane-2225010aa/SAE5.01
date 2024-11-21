import { EventPage } from '../../../models/event';
import { EventsRepository } from '../../../server/repository/EventRepository';

export class EventPost {
  async post(event: EventPage): Promise<EventPage | undefined> {
    try {
      await EventsRepository.createEvent(event);
      return EventsRepository.getEventById(event.id);
    } catch (error) {
      throw new Error('Error creating event');
    }
  }
}