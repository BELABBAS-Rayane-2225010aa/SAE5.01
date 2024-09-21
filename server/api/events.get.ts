import { Event } from "~/models/event";
import { EventsRepository } from "../repository/EventsRepository";

export default defineEventHandler(async (event): Promise<Event[]> => {
  return await EventsRepository.getEvents();
});