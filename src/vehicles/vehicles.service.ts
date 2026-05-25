/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Vehicle } from 'generated/prisma/client';
import { PaginationDTO } from 'src/common';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.VehicleCreateInput): Promise<Vehicle> {
    return this.prisma.vehicle.create({
      data,
    });
  }

  findAll(paginationDTO: PaginationDTO) {
    const { limit = 10, page = 1 } = paginationDTO;

    return this.prisma.vehicle.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { isActive: true },
    });
  }

  async findOne(where: Prisma.VehicleWhereUniqueInput): Promise<Vehicle> {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: { ...where, isActive: true },
    });

    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async update(
    where: Prisma.VehicleWhereUniqueInput,
    data: Prisma.VehicleUpdateInput,
  ): Promise<Vehicle> {
    return this.prisma.vehicle.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.VehicleWhereUniqueInput): Promise<Vehicle> {
    const vehicle = await this.findOne(where);

    return this.update({ id: vehicle.id }, { isActive: false });
  }
}
