import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idtipovehiculo: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  capacitytank: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  licenseplate?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  yearcar?: number;

  @ApiProperty()
  @IsOptional()
  creationDate?: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  fuelconsuptionperkilometer: number;
}
