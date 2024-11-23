export type EnergyData = {
    date: string,
    value: number,
}

export type Energy = {
    timeUnit: string,
    unit: string,
    values: EnergyData[],
}
export type EnergyDetailsData = {
    date: string,
    value: number,
}

export type EnergyDetailsMeter = {
    type: string,
    values: EnergyDetailsData[],
}

export type EnergyDetails = {
    timeUnit: string,
    unit: string,
    meters: EnergyDetailsMeter[],
}