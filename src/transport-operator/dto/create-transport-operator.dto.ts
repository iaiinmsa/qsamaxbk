import { ApiProperty } from '@nestjs/swagger';

export class CreateTransportOperatorDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  codeopen?: number;
}
