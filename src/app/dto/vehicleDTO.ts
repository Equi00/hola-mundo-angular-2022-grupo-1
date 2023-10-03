type VehicleDTO = {
    id?: number,
    type: string,
    brand: string,
    model: string,
    fabricationYear: number,
    dayCost: number,
    freeMilage: boolean,
    is4x4?: boolean,
    cylinderCapacity?: number,
    hatchback?: boolean,
}

export default VehicleDTO