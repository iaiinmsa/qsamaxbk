import { PartialType } from '@nestjs/swagger';
import { CreateFuelConsumptionControlDto } from './create-fuel-consumption-control.dto';

export class UpdateFuelConsumptionControlDto extends PartialType(CreateFuelConsumptionControlDto) {}
