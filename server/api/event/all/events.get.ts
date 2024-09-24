import { Event } from "~/models/event";
import { EventsRepository } from "../../../repository/EventsRepository";

// gets all events
export default defineEventHandler(async (event): Promise<Event[]> => {
  return await EventsRepository.getEvents();
});