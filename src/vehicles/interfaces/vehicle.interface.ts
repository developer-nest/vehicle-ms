/* eslint-disable prettier/prettier */
//import { StatusDriver } from '../enum/status.enum';

import { StatusVehicle } from 'src/generated/prisma/enums';

export interface VehicleById {
  id: string;
}

export interface Vehicle {
  id: string;
  numCar: string;
  seatCount: number;
  currentMileage: number;
  brand: string;
  dateIn: string;
  dateEnd: string;
  isActive: boolean;
  status: StatusVehicle;
}

export interface VehicleList {
  items: Vehicle[];
}

export interface CreateVehicle {
  numCar: string;
  seatCount: number;
  currentMileage: number;
  brand: string;
  dateIn: string;
  dateEnd: string;
  isActive: boolean;
  status: StatusVehicle;
}

export interface UpdateVehicle extends CreateVehicle {
  id: string;
}

export interface Pagination {
  limit: number;
  page: number;
}
