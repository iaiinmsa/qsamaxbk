import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  IsNumber,
  Min,
  IsBoolean,
  MaxLength,
  IsArray,
} from 'class-validator';

export class CreateNonConformingProductDto {
  @ApiPropertyOptional({ maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  productionOrderId?: string;

  @ApiPropertyOptional({ maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  idproject?: string;

  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  @IsOptional()
  @IsDateString()
  manufacturingDate?: Date;

  @ApiPropertyOptional({ maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  createdBy?: string;

  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  @IsOptional()
  @IsDateString()
  creationDate?: Date;

  @ApiProperty()
  @IsInt()
  idProduct: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  departmentId?: number;

  @ApiPropertyOptional({ maxLength: 150 })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  intendedRecipient?: string;

  @ApiPropertyOptional({ type: 'number', format: 'decimal' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  rejectedQuantity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  planningComment?: string;

  @ApiProperty()
  @IsInt()
  idCauseNonConformity: number;

  @ApiProperty()
  @IsInt()
  iddisposition: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  doComment?: string;

  @ApiPropertyOptional({ type: 'number', format: 'decimal', default: 0 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  dispositionCost?: number;

  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  @IsOptional()
  @IsDateString()
  estimatedClosingDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  doObservation?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  approvedProject?: boolean;

  @ApiPropertyOptional({ maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  approvedProjectUser?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  approvedFinancialManagement?: boolean;

  @ApiPropertyOptional({ maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  approvedFinancialManagementUser?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  approvedGeneralManagement?: boolean;

  @ApiPropertyOptional({ maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  approvedGeneralManagementUser?: string;

  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  @IsOptional()
  @IsDateString()
  realClosingDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  checkObservation?: string;

  @ApiPropertyOptional({
    description: 'Array of NonConformityAttachment IDs to link to this NonConformingProduct',
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true }) // Valida que cada elemento del array sea un entero
  // @ArrayMinSize(1) // Descomenta si quieres que, si se provee el array, tenga al menos un elemento
  nonConformityAttachmentIds?: number[];
  
 // nonConformityAttachmentIds?: number[];

//  @ApiPropertyOptional()
  //@IsOptional()
 // @IsInt()
 // idNonConformityAttachmentId?: number;
}