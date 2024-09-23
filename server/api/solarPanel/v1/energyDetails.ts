import { fetchEnergyDetails } from "~/composables/queries/solarPanel/fetchEnergyDetails";

type Query = {
  serialNumber: string;
};

export default defineEventHandler(async (event) => {
  const { serialNumber } = getQuery<Query>(event);

  return await fetchEnergyDetails(serialNumber);
});