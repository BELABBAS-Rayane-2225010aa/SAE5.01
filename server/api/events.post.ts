import { Event } from "~/models/event";
import { EventsRepository } from "../repository/EventsRepository";

export default defineEventHandler(async (event): Promise<Event[]> => {
    const body: Event[] = await readBody(event);

    try {
        return await EventsRepository.saveEvents(body);
    } catch (error) {
        console.error(error);
        throw new Error("Error writing to file");
    }
});