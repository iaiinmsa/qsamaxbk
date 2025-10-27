import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsDate } from 'class-validator';

export class CreateManufacturingOrderDto {
  @ApiProperty()
  productionOrder: string;

  @ApiProperty({ required: false })
  @IsOptional()
  assignedTo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  requestedBy?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  createDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  customerCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  contactName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  contactPhone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  projectScope?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  location?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  metalWeight?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  unitofMeasure?: string;

  @ApiProperty()
  grandTotal: number;

  @ApiProperty({ required: false })
  @IsOptional()
  currency?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  paymentFactor?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  payTerm?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  deliveryTime?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  productionOrderLabel?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ProductionOrderId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  observation?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  createAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  createBy?: string;
}
