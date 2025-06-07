import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';

export class CreateProductDto {
  @ApiPropertyOptional({ description: 'Description of the product', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiPropertyOptional({ description: 'Is the product active?', default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}