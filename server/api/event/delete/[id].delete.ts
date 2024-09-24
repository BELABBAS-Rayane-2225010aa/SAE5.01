import { Event } from "~/models/event";
import { EventsRepository } from "../../../repository/EventsRepository";
import { getRouterParams } from "h3";

// deletes event by id
export default defineEventHandler(async (event): Promise<Event | undefined> => {
    const { id } = getRouterParams(event);
    const eventId = parseInt(id);

    try {
        return await EventsRepository.deleteEventById(eventId);
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting event by id");
    }
});