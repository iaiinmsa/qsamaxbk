// src/vacation-request/dto/update-days-vacation.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class UpdateDaysVacationDto {
  @ApiProperty({ example: 15, description: 'Cantidad de días disponibles' })
  @IsNumber()
  @Min(0)
  days: number;

  @ApiProperty({ example: '2025', description: 'Periodo de vacaciones' })
  @IsString()
  vacationPeriod: string;
}
