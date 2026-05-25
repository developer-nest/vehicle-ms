/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PaginationDTO } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  //@Post()
  @MessagePattern({ cmd: 'create_vehicle' })
  create(@Payload() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  //@Get()
  @MessagePattern({ cmd: 'find_all_vehicle' })
  findAll(@Payload() paginationDTO: PaginationDTO) {
    return this.vehiclesService.findAll(paginationDTO);
  }

  //@Get(':id')
  @MessagePattern({ cmd: 'find_one_vehicle' })
  findOne(@Payload('id') id: string) {
    return this.vehiclesService.findOne({ id });
  }

  //@Patch(':id')
  @MessagePattern({ cmd: 'update_vehicle' })
  update(@Payload() updateVehicleDto: UpdateVehicleDto) {
    const { id, ...data } = updateVehicleDto;
    return this.vehiclesService.update({ id }, data);
  }

  //@Delete(':id')
  @MessagePattern({ cmd: 'delete_vehicle' })
  remove(@Payload('id') id: string) {
    return this.vehiclesService.remove({ id });
  }
}
