// filepath: src/product-attachments/dto/create-product-attachment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateProductAttachmentDto {
  @ApiProperty({
    description: 'ID of the NonConformingProduct to link',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  nonConformingProductId: number;

  @ApiProperty({
    description: 'ID of the NonConformityAttachment to link',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  nonConformityAttachmentId: number;
}