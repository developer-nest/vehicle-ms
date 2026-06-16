/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';

import { GrpcMethod } from '@nestjs/microservices';
import { Vehicle } from 'generated/prisma/client';
import {
  CreateVehicle,
  Pagination,
  UpdateVehicle,
  VehicleById,
} from './interfaces/vehicle.interface';

@Controller('')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @GrpcMethod('VehiclesService')
  create(data: CreateVehicle): Promise<Vehicle> {
    return this.vehiclesService.create(data);
  }

  @GrpcMethod('VehiclesService')
  async findAll(pagination: Pagination): Promise<{
    items: Vehicle[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    return this.vehiclesService.findAll(pagination);
  }

  //@Get(':id')
  @GrpcMethod('VehiclesService')
  async findOne(data: VehicleById): Promise<Vehicle | null> {
    return this.vehiclesService.findOne({ id: data.id });
  }

  //@Patch(':id')
  @GrpcMethod('VehiclesService')
  async update(updateVehicle: UpdateVehicle): Promise<Vehicle> {
    const { id, ...data } = updateVehicle;
    return this.vehiclesService.update({ id }, data);
  }

  //@Delete(':id')
  @GrpcMethod('VehiclesService')
  async remove(id: VehicleById): Promise<Vehicle> {
    return this.vehiclesService.remove(id);
  }
}
