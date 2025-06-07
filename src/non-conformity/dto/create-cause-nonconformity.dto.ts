import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';

export class CreateCauseNonconformityDto {
  @ApiPropertyOptional({ description: 'Description of the cause', maxLength: 250 })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  description?: string;

  @ApiPropertyOptional({ description: 'Letter identifier', maxLength: 1 })
  @IsOptional()
  @IsString()
  @MaxLength(1)
  letter?: string;

  @ApiPropertyOptional({ description: 'Is the cause active?', default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}