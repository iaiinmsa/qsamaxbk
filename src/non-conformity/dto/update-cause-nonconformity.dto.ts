import { PartialType } from '@nestjs/swagger';
import { CreateCauseNonconformityDto } from './create-cause-nonconformity.dto';

export class UpdateCauseNonconformityDto extends PartialType(
  CreateCauseNonconformityDto,
) {}