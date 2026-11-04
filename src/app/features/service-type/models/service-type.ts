import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { ServiceTypePrice } from './service-type-price';

export interface ServiceType{
    id?: number,
    name?: string,
    active?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    prices?: Array<ServiceTypePrice>
}