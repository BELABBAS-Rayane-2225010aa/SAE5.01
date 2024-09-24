import { Event } from "~/models/event";
import { EventsRepository } from "../../../repository/EventsRepository";

// updates event
export default defineEventHandler(async (event): Promise<Event | undefined> => {
    const body: Event = await readBody(event);

    try {
        return await EventsRepository.updateEvent(body);
    } catch (error) {
        console.error(error);
        throw new Error("Error writing to file");
    }
});