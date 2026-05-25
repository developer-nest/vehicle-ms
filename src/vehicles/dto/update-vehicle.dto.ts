/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @IsNotEmpty({ message: 'El ID del vehículo es obligatorio' })
  @IsUUID('4', { message: 'El ID debe ser un UUID válido' })
  id: string;
}
