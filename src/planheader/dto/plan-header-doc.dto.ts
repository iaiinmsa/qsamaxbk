import { ApiProperty } from '@nestjs/swagger';

export class PlanHeaderDoc {
  @ApiProperty({
    description: 'Identificador único del encabezado (autoincremental)',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre del usuario que crea el plano',
    example: 'rfunes',
  })
  user_name: string;

  @ApiProperty({
    description: 'Código o número de la orden de producción',
    example: 'ORD-00123',
  })
  production_order: string;

  @ApiProperty({
    description: 'Nombre del proyecto asociado',
    example: 'Proyecto Alfa',
  })
  project_name: string;

  @ApiProperty({
    description: 'Fecha y hora de creación (opcional)',
    example: '2025-07-30T12:00:00Z',
    required: false,
  })
  created_at?: Date;
}
