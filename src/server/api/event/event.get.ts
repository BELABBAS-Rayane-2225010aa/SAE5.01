import { EventPage } from '../../../models/event';
import { EventsRepository } from '../../repository/EventRepository';

export class EventGet {
  async get(): Promise<EventPage[]> {
    return EventsRepository.getEvents();
  }
}