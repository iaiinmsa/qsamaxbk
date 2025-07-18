import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypecarDto {
  @ApiProperty({ example: 'Camión de carga' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
