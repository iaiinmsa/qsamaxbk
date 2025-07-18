import { PartialType } from '@nestjs/swagger';
import { CreateTypecarDto } from './create-typecar.dto';

export class UpdateTypecarDto extends PartialType(CreateTypecarDto) {}
