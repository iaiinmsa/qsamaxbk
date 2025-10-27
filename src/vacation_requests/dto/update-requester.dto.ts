// src/vacation-requests/dto/update-requester.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRequesterDto {
  @ApiProperty({
    description: 'Nombre o identificador del usuario que realiza la solicitud',
    example: 'juan.perez'
  })
  @IsNotEmpty()
  @IsString()
  requester: string;
}
