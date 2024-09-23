import { fetchPower } from "~/composables/queries/solarPanel/fetchPower";

type Query = {
  resolution: string;
  startDate: string;
  endDate: string;
};

export default defineEventHandler(async (event) => {
  const { resolution, startDate, endDate } = getQuery<Query>(event);

  return {
    content: await fetchPower(resolution, startDate, endDate),
  };
});