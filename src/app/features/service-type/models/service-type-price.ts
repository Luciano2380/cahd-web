import { ServiceType } from './service-type';

export interface ServiceTypePrice{
    id?: number,
    price?: number,
    size?: string,
    sizeName?:string,
    serviceTypeName?:string,
    serviceType?: ServiceType
}