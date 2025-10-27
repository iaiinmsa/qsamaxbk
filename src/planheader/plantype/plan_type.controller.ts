/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { Plan_typeService } from './plan_type.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlanTypeDoc } from './dto/plan-type-doc.dto';


@ApiTags('PlanType')
@Controller('plan-type')
@Controller()
export class Plan_typeController { 

     constructor(private readonly planTypeService: Plan_typeService) {}

  @Get('documentacion')
 @ApiOkResponse({
    description: 'Diccionario de datos de la tabla plan_header',
    schema: {
      example: {
        table_name: 'plan_header',
        description: 'Header table for production plans',
        columns: [
          {
  "PlanType": {
    "type": "object",
    "description": "Data dictionary for qsamax.plan_type table",
    "properties": {
      "idplanttype": {
        "type": "integer",
        "format": "int32",
        "description": "Primary key, auto-incremented identifier"
      },
      "nomenclature": {
        "type": "string",
        "maxLength": 255,
        "description": "Nomenclature code for the plan type"
      },
      "name": {
        "type": "string",
        "maxLength": 255,
        "description": "Name of the plan type"
      },
      "descripcion": {
        "type": "string",
        "maxLength": 255,
        "description": "Description of the plan type"
      }
    },
    "required": [
      "nomenclature",
      "name",
      "descripcion"
    ]
  }
},

        ],
      },
    },
  })
  getPlanTypeDoc(): PlanTypeDoc {
    return {
      idplanttype: 1,
      nomenclature: 'MECH',
      name: 'Mecánico',
      descripcion: 'Plano de partes mecánicas',
    };
  }

  @Get()
  @ApiOkResponse({
    description: 'Lista de tipos de planos',
    type: [PlanTypeDoc],
  })
  async findAll(): Promise<PlanTypeDoc[]> {
    return this.planTypeService.findAll();
  }
}

