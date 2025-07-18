import { PartialType } from '@nestjs/swagger';
import { CreateTransportOperatorDto } from './create-transport-operator.dto';

export class UpdateTransportOperatorDto extends PartialType(CreateTransportOperatorDto) {}
