import { ApiProperty } from '@nestjs/swagger';

export class PlanTypeDoc {
  @ApiProperty({ example: 1, description: 'ID del tipo de plano (autoincremental)' })
  idplanttype: number;

  @ApiProperty({ example: 'MECH', description: 'Nomenclatura del plano' })
  nomenclature: string;

  @ApiProperty({ example: 'Mecánico', description: 'Nombre del tipo de plano' })
  name: string;

  @ApiProperty({ example: 'Plano de partes mecánicas', description: 'Descripción del tipo de plano' })
  descripcion: string;


}
