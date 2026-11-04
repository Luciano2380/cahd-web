import { Client } from '@features/client/models/client';
import { Color } from '@features/color/models/color';
import { ServiceTypePrice } from '@features/service-type/models/service-type-price';
import { Service } from '@features/service/models/service';
import { Vehicle } from '@features/vehicle/models/vehicle';
import { DinamicType } from './dinamic-type';

export interface ServicePerformance {
   id?: number;

   record?: string;
   client?: Client;

   service?: Service;

   totalPrice?: number;

   vehicle?: Vehicle;

   color?: Color;
 
   expectedDateTime?: string;
  

   printed?: boolean;

   deleted?: boolean;

   createdAt?: Date;

   serviceTypePrices?: ServiceTypePrice[];

   dynamicServiceTypes?: DinamicType[];

   clientName?: string;
   clientPhone?: string;
   clientLicensePlate?: string;
   note?: string;
}