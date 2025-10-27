/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller,
      Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Res,
  Query,
 } from '@nestjs/common';

 import { FileInterceptor } from '@nestjs/platform-express';
import { Plan_headerService } from './plan_header.service';
import { PlanHeaderDoc } from './dto/plan-header-doc.dto';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';


@Controller()
export class Plan_headerController { 
     constructor(private readonly planoService: Plan_headerService) {}

 @Post('planos/subir')
  @UseInterceptors(FileInterceptor('file'))
   @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        user_name: {
          type: 'string',
        },
        production_order: {
          type: 'string',
        },
        project_name: {
          type: 'string',
        },
        plan_type: {
          type: 'string',
        },
        plan_review: {
          type: 'string',
        },
      },
      required: ['file', 'user_name', 'production_order', 'project_name', 'plan_type', 'plan_review'],
    },
  })
  async subirArchivo(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: {
      user_name: string;
      production_order: string;
      project_name: string;
      plan_type: string;
      plan_review: string;
    },
  ) {
    return this.planoService.subirPlano(file, body);
  }



   @Get('documentacion/plan-header')
   @ApiOkResponse({
    description: 'Diccionario de datos de la tabla plan_header',
    schema: {
      example: {
        table_name: 'plan_header',
        description: 'Header table for production plans',
        columns: [
          {
            name: 'id',
            data_type: 'INT(11)',
            nullable: false,
            key: 'PRI',
            default: 'AUTO_INCREMENT',
            description: 'Identificador único del encabezado (autoincremental)',
          },
          {
            name: 'user_name',
            data_type: 'VARCHAR(255)',
            nullable: false,
            key: '',
            default: null,
            description: 'Nombre del usuario que crea el plano',
          },
          {
            name: 'production_order',
            data_type: 'VARCHAR(255)',
            nullable: false,
            key: '',
            default: null,
            description: 'Código o número de la orden de producción',
          },
          {
            name: 'project_name',
            data_type: 'VARCHAR(255)',
            nullable: false,
            key: '',
            default: null,
            description: 'Nombre del proyecto asociado',
          },
          {
            name: 'created_at',
            data_type: 'DATETIME',
            nullable: true,
            key: '',
            default: 'NULL',
            description: 'Fecha y hora de creación (opcional; puede quedar nula)',
          },
        ],
      },
    },
  })
  getPlanHeaderDoc(): PlanHeaderDoc {
    return {
      id: 1,
      user_name: 'rfunes',
      production_order: 'ORD-00123',
      project_name: 'Proyecto Alfa',
      created_at: new Date(),
    };
  }


  @Post('subir-detalle/:planId')
@UseInterceptors(FileInterceptor('file'))
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
      plan_type: {
        type: 'string',
      },
      uploaded_by: {
        type: 'string',
      },
      plan_review: {
        type: 'string',
      },
    },
    required: ['file', 'plan_type', 'uploaded_by', 'plan_review'],
  },
})
async subirArchivoDetalle(
  @UploadedFile() file: Express.Multer.File,
  @Body() body: {
    plan_type: string;
    uploaded_by: string;
    plan_review: string;
  },
  @Param('planId') planId: string,
) {
  return this.planoService.subirDetallePlano(parseInt(planId), file, body);
}

  

 @Get('plan-header')
  @ApiOkResponse({ description: 'Lista de todos los planes con sus detalles' })
  async getAllPlanes() {
    return this.planoService.obtenerTodosLosPlanes();
  }

  @Get('plan-header/:id')
  @ApiParam({ name: 'id', type: Number, description: 'ID del plan' })
  @ApiOkResponse({ description: 'Detalle del plan por ID' })
  async getPlanById(@Param('id', ParseIntPipe) id: number) {
    return this.planoService.obtenerPlanPorId(id);
  }
  

    @Get('download')
  async download(@Query('file') file: string, @Res() res: Response) {
    return this.planoService.downloadFile(file, res);
  }
  
}
