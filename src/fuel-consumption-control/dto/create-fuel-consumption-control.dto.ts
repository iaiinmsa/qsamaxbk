import { ApiProperty } from '@nestjs/swagger';

export class CreateFuelConsumptionControlDto {
  @ApiProperty({ required: false })
  orderDate?: Date;

  @ApiProperty({ required: false })
  productionorderid?: string;

  @ApiProperty({ required: false })
  activity?: string;

  @ApiProperty()
  initialreading: number;

  @ApiProperty()
  finalreeading: number;

  @ApiProperty()
  partial: number;

  @ApiProperty()
  consume: number;

  @ApiProperty()
  carId: number;

  @ApiProperty()
  transportoperatorid: number;

}
