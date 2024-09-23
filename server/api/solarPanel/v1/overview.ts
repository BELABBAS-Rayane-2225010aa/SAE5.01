import { fetchOverview } from "~/composables/queries/solarPanel/fetchOverview";

type Query = {
  startDate: string;
  endDate : string;
};

export default defineEventHandler(async (event) => {
  const { startDate, endDate } = getQuery<Query>(event);
  return await fetchOverview(startDate, endDate);
});