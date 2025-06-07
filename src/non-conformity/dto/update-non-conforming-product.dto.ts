import { PartialType } from '@nestjs/swagger';
import { CreateNonConformingProductDto } from './create-non-conforming-product.dto';

export class UpdateNonConformingProductDto extends PartialType(
  CreateNonConformingProductDto,
) {}