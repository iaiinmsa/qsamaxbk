import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateManufacturingOrderDetailDto {
  @ApiProperty()
  @IsInt()
  manufacturingOrderId: number;

  @ApiProperty()
  @IsString()
  filePath: string;

  @ApiProperty()
  @IsString()
  uploadBy: string;

  @ApiProperty()
  @IsString()
  fileName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}



