import { fetchEnergy } from "~/composables/queries/solarPanel/fetchEnergy";

type Query = {
  resolution: string;
  startDate: string;
  endDate: string;
};

export default defineEventHandler(async (event) => {
  const { resolution, startDate, endDate } = getQuery<Query>(event);

  return {
    content: await fetchEnergy(resolution, startDate, endDate),
  };
});