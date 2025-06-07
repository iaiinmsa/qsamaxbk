import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';

export class CreateDispositionDto {
  @ApiPropertyOptional({ description: 'Description of the disposition', maxLength: 250 })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  description?: string;

  @ApiPropertyOptional({ description: 'Is the disposition active?', default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}