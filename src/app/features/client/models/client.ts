import { ClientVehicle } from './client-vehicle';

export interface Client{
    id?: number,
    name?: string,
    gender?: string,
    email?: string,
    phone?:string,
    personType?: string,
    cpfCnpj?: string,   
    active?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    clientVehicles?: Array<ClientVehicle>
}