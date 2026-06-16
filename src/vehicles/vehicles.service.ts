/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Vehicle } from 'generated/prisma/client';

import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { Pagination } from './interfaces/vehicle.interface';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.VehicleCreateInput): Promise<Vehicle> {
    try {
      return await this.prisma.vehicle.create({
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new RpcException({
            message: `Vehicle with id ${data.id} is a unique constraint violation, a new vehicle cannot be created with this id`,
            code: status.ALREADY_EXISTS,
          });
        }
      }
      throw new RpcException('Error interno al crear el vehículo');
    }
  }

  async findAll(pagination: Pagination): Promise<{
    items: Vehicle[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const { limit = 10, page = 1 } = pagination;

      const [vehicles, total] = await Promise.all([
        this.prisma.vehicle.findMany({
          where: { isActive: true },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prisma.vehicle.count({
          where: { isActive: true },
        }),
      ]);

      return {
        items: vehicles,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch {
      throw new RpcException({
        message: 'Error al obtener los vehículos',
        code: status.INTERNAL,
      });
    }
  }

  async findOne(where: Prisma.VehicleWhereUniqueInput): Promise<Vehicle> {
    try {
      const vehicle = await this.prisma.vehicle.findFirst({
        where: { ...where, isActive: true },
      });

      if (!vehicle) {
        throw new RpcException({
          message: `Vehicle with id ${where.id} not found`,
          code: status.NOT_FOUND,
        });
      }
      return vehicle;
    } catch (error) {
      //console.log('ERROR FINDONE:', error);
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        message: 'Error al procesar la solicitud en la base de datos',
        code: status.INTERNAL,
      });
    }
  }

  async update(
    where: Prisma.VehicleWhereUniqueInput,
    data: Prisma.VehicleUpdateInput,
  ): Promise<Vehicle> {
    try {
      return await this.prisma.vehicle.update({ where, data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new RpcException({
          message: `Vehicle with id ${where.id} not found`,
          code: status.NOT_FOUND,
        });
      }
      throw new RpcException('Error interno al actualizar');
    }
  }

  async remove(where: Prisma.VehicleWhereUniqueInput): Promise<Vehicle> {
    const vehicle = await this.findOne(where);

    return this.update({ id: vehicle.id }, { isActive: false });
  }
}
