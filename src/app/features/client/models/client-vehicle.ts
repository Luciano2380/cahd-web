import { Color } from '@features/color/models/color';
import { Vehicle } from '@features/vehicle/models/vehicle';
import { Client } from './client';

export interface ClientVehicle {
    id?: number,
    licensePlate?: string,
    vehicle?: Vehicle,
    color?: Color
    client?: Client
}