import { ServiceType } from '@features/service-type/models/service-type';

export interface Service{
    id?: number,
    name?: string,
    menu?: boolean,
    showClient?: boolean,
    dynamicServiceType?:boolean,
    active?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    serviceTypes?: Array<ServiceType>
}