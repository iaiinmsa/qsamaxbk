/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RequeststockappService } from './requeststockapp.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateVacationRequestDto } from './dto/create-vacation-request.dto';

@Controller()
export class RequeststockappController { 
     constructor(private readonly requisitionService: RequeststockappService) {}


 @Get('requisitions/:department')
 @ApiOperation({ summary: 'Get all request fro deparments' })
 @ApiResponse({ status: 200, description: 'List of all request stock deparment open orange.'})
getPending(@Param('department') dept: string,
 @Query('offset') offset = '0',
  @Query('limit') limit = '20'

) 

{

  const offsetNumber = parseInt(offset);
  const limitNumber = parseInt(limit);

  return this.requisitionService.getPendingRequisitionsByDepartment(dept,  offsetNumber, limitNumber);
}


@Get('requisitionsdetail/:id')
@ApiOperation({ summary: 'detail requisition' })
@ApiResponse({ status: 200, description: 'show requisition detail open orange.'})
RequisitionDetailShow(@Param('id') id: string,

) 

{
  const requsitionid = parseInt(id);
 return this.requisitionService.RequisitionDetailShow(requsitionid  );
}




@Get('user/:user')
@ApiOperation({ summary: 'user department' })
@ApiResponse({ status: 200, description: 'show user department open orange.'})
UserDepartmentShow(@Param('user') dept: string,

) 

{

 return this.requisitionService.UserDepartmentShow(dept  );
}



@Get('workordershow')
@ApiOperation({ summary: 'Get all op from work orders' })
@ApiResponse({ status: 200, description: 'List of all work orders open orange.' })
async workordershow() {
  return this.requisitionService.workordershow();
}

@Patch('approve/:id')
@ApiParam({ name: 'id', type: Number, description: 'ID de la requisición' })
@ApiBody({ schema: { properties: { authorizedBy: { type: 'string' } } } })
async approveRequisition(
  @Param('id') id: number,
  @Body('authorizedBy') authorizedBy: string,
) {
  return this.requisitionService.approveRequisition(id, authorizedBy);
}


@Get('employees/details')
@ApiOperation({ summary: 'SHOW THE information expedient user' })
getEmployeeDetails(
  
)

{
  return this.requisitionService.getEmployeeDetails();
}

 @Get('documentation')
  @ApiOkResponse({
    description: 'Data dictionary for the vacation_requests table',
    schema: {
      example: {
        table_name: 'vacation_requests',
        description: 'Stores employee vacation requests and approval workflow',
        columns: {
          id: {
            type: 'integer',
            format: 'int32',
            description: 'Primary key, auto-incremented ID of the request'
          },
          request_date: {
            type: 'string',
            format: 'date',
            description: 'Date when the vacation was requested'
          },
          employee_code: {
            type: 'string',
            maxLength: 50,
            description: 'Unique employee code'
          },
          years_worked: {
            type: 'integer',
            format: 'int32',
            description: 'Years worked in the company'
          },
          vacation_hours: {
            type: 'number',
            format: 'decimal(10,2)',
            description: 'Total number of vacation hours requested'
          },
          vacation_start_date: {
            type: 'string',
            format: 'date',
            description: 'Start date of the vacation'
          },
          vacation_end_date: {
            type: 'string',
            format: 'date',
            description: 'End date of the vacation'
          },
          half_day_vacation: {
            type: 'boolean',
            description: 'Indicates if only a half day is requested'
          },
          vacation_period: {
            type: 'string',
            maxLength: 20,
            description: 'Vacation period (e.g. 2025–2026)'
          },
          status: {
            type: 'string',
            enum: ['pending', 'approved', 'rejected', 'register', ''],
            description: 'Current status of the request'
          },
          requester: {
            type: 'string',
            description: 'Name of the person who requested the vacation'
          },
          immediate_supervisor_approved: {
            type: 'boolean',
            description: 'Approval status from the immediate supervisor'
          },
          process_manager_approved: {
            type: 'boolean',
            description: 'Approval status from the process manager'
          },
          pending_days: {
            type: 'number',
            format: 'decimal(10,2)',
            description: 'Remaining vacation days not used'
          },
          current_days: {
            type: 'number',
            format: 'decimal(10,2)',
            description: 'Current vacation days available'
          },
          calculated_days: {
            type: 'number',
            format: 'decimal(10,2)',
            description: 'Total days calculated for the current request'
          },
          process_manageruser_by: {
            type: 'string',
            description: 'Username of the process manager who approved'
          },
          process_manager_at: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when approved by the process manager'
          },
          superviso_by: {
            type: 'string',
            description: 'Username of the supervisor who approved'
          },
          superviso_at: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when approved by the supervisor'
          }
        }
      }
    }
  })
  getVacationTableDocumentation() {
    return {
      table_name: 'vacation_requests',
      description: 'Stores employee vacation requests and approval workflow',
      columns: {
        id: {
          type: 'integer',
          format: 'int32',
          description: 'Primary key, auto-incremented ID of the request'
        },
        request_date: {
          type: 'string',
          format: 'date',
          description: 'Date when the vacation was requested'
        },
        employee_code: {
          type: 'string',
          maxLength: 50,
          description: 'Unique employee code'
        },
        years_worked: {
          type: 'integer',
          format: 'int32',
          description: 'Years worked in the company'
        },
        vacation_hours: {
          type: 'number',
          format: 'decimal(10,2)',
          description: 'Total number of vacation hours requested'
        },
        vacation_start_date: {
          type: 'string',
          format: 'date',
          description: 'Start date of the vacation'
        },
        vacation_end_date: {
          type: 'string',
          format: 'date',
          description: 'End date of the vacation'
        },
        half_day_vacation: {
          type: 'boolean',
          description: 'Indicates if only a half day is requested'
        },
        vacation_period: {
          type: 'string',
          maxLength: 20,
          description: 'Vacation period (e.g. 2025–2026)'
        },
        status: {
          type: 'string',
          enum: ['pending', 'approved', 'rejected', 'register', ''],
          description: 'Current status of the request'
        },
        requester: {
          type: 'string',
          description: 'Name of the person who requested the vacation'
        },
        immediate_supervisor_approved: {
          type: 'boolean',
          description: 'Approval status from the immediate supervisor'
        },
        process_manager_approved: {
          type: 'boolean',
          description: 'Approval status from the process manager'
        },
        pending_days: {
          type: 'number',
          format: 'decimal(10,2)',
          description: 'Remaining vacation days not used'
        },
        current_days: {
          type: 'number',
          format: 'decimal(10,2)',
          description: 'Current vacation days available'
        },
        calculated_days: {
          type: 'number',
          format: 'decimal(10,2)',
          description: 'Total days calculated for the current request'
        },
        process_manageruser_by: {
          type: 'string',
          description: 'Username of the process manager who approved'
        },
        process_manager_at: {
          type: 'string',
          format: 'date-time',
          description: 'Date and time when approved by the process manager'
        },
        superviso_by: {
          type: 'string',
          description: 'Username of the supervisor who approved'
        },
        superviso_at: {
          type: 'string',
          format: 'date-time',
          description: 'Date and time when approved by the supervisor'
        }
      }
    };
  }


 @Get('currency')
  @ApiOperation({ summary: 'Obtener todas las monedas' })
  @ApiOkResponse({ description: 'Lista de monedas' })
  async getCurrency() {
    return this.requisitionService.getCurrency();
  }

  @Get('customer')
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiOkResponse({ description: 'Lista de clientes' })
  async getCustomer() {
    return this.requisitionService.getCustomer();
  }

  @Get('unit')
  @ApiOperation({ summary: 'Obtener todas las unidades' })
  @ApiOkResponse({ description: 'Lista de unidades' })
  async getUnit() {
    return this.requisitionService.getUnit();
  }

  @Get('label/ops')
  @ApiOperation({ summary: 'Obtener todos los labels tipo OPS' })
  @ApiOkResponse({ description: 'Lista de labels OPS' })
  async getLabelOps() {
    return this.requisitionService.getLabelOps();
  }


   @Post('label/create')
  @ApiOperation({ summary: 'Crear una nueva etiqueta' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        code: { type: 'string', example: '008/0A/25' },
        name: { type: 'string', example: 'Desarrollo Progreso S. de R.L.' },
        level: { type: 'number', example: 0 },
        syncversion: { type: 'number', example: 1 },
        closed: { type: 'number', example: 0 },
        type: { type: 'string', example: 'OPS' },
      },
      required: ['code', 'name', 'level', 'syncversion', 'closed', 'type'],
    },
  })
  @ApiResponse({ status: 201, description: 'Etiqueta creada correctamente' })
  async createLabel(@Body() labelData: any) {
    return this.requisitionService.createLabelAndUpdateOrder(labelData);
  }


}
