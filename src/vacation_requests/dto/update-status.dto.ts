// src/vacation-requests/dto/update-status.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsInt } from 'class-validator';

export class UpdateStatusDto {

      @ApiProperty({
    example: 22,
    description: 'ID of the vacation request to update',
  })
  @IsInt()
  id: number;


   @ApiProperty({
    enum: Status,
    example: Status.pending, // 👈 Aquí Swagger pondrá "pending" por defecto
    description: 'New status for the request',
  })
  @IsEnum(Status)
  newStatus: Status;
}
