import { Event } from "~/models/event";
import { EventsRepository } from "../../../repository/EventsRepository";
import { getRouterParams } from "h3";

export default defineEventHandler(async (event): Promise<Event | undefined> => {
    const { id } = getRouterParams(event);
    const eventId = parseInt(id);

    try {
        return await EventsRepository.getEventById(eventId);
    } catch (error) {
        console.error(error);
        throw new Error("Error getting event by id");
    }
});