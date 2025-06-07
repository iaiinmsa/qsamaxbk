// filepath: src/product-attachments/dto/update-product-attachment.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateProductAttachmentDto {
  @ApiPropertyOptional({
    description: 'New ID of the NonConformingProduct',
    example: 2,
  })
  @IsOptional()
  @IsInt()
  nonConformingProductId?: number;

  @ApiPropertyOptional({
    description: 'New ID of the NonConformityAttachment',
    example: 2,
  })
  @IsOptional()
  @IsInt()
  nonConformityAttachmentId?: number;
}