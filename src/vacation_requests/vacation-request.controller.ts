import { Controller, Get, Post, Body, Param, Delete, Query, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery ,
  ApiBody ,ApiParam } from '@nestjs/swagger';
import { VacationRequestService } from './vacation-request.service';
import { CreateVacationRequestDto } from './dto/create-vacation-request.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from '@prisma/client';
import { UpdateRequesterDto } from './dto/update-requester.dto';
import { VacationRequest } from '@prisma/client';
import { UpdateDaysVacationDto } from './dto/update-days-vacation.dto';

@ApiTags('Vacation Requests')
@Controller('vacation-requests')
export class VacationRequestController {
  constructor(private readonly service: VacationRequestService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vacation request' })
  @ApiResponse({ status: 201, description: 'Vacation request created' })
  create(@Body() dto: CreateVacationRequestDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vacation requests' })
  findAll() {
    return this.service.findAll();
  }

  
  @Get('registered')
 @ApiOperation({ summary: 'show a vaction registers' })
async findRegistered() {
  return this.service.findRegistered();
}

  @Get('registered-by-email')
  @ApiOperation({ summary: 'Get registered vacation requests filtered by employee email' })
  @ApiQuery({ name: 'email', required: true, description: 'Employee email to filter' })
  async findRegisteredByEmail(@Query('email') email: string) {
    return this.service.findRegisteredByEmail(email);
  }

 
  @Get('employeeapproved/:employeeCode')
  @ApiOperation({ summary: 'Obtener el último registro aprobado de vacaciones por empleado' })
  async findLastApprovedByEmployee(
    @Param('employeeCode') employeeCode: string,
  ) {
    return this.service.findLastApprovedByEmployee(employeeCode);
  }



  @Get(':id')
  @ApiOperation({ summary: 'Get a vacation request by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }


    @Get('by-supervisor/:supervisorCode')
  @ApiOperation({
    summary: 'Obtener solicitudes de vacaciones por supervisor',
    description:
      'Devuelve todas las solicitudes de vacaciones de empleados que pertenezcan a un grupo gestionado por el supervisor especificado.',
  })
  @ApiParam({
    name: 'supervisorCode',
    type: String,
    description: 'Código del supervisor (ej. rfunes)',
    example: 'rfunes',
  })

 
   @Get('by-supervisor/:supervisorCode')
  async getRequestsBySupervisor(
    @Param('supervisorCode') supervisorCode: string,
  ) {
  
    const requests = await this.service.getRequestsBySupervisor(supervisorCode);

    return requests;
  }


  @Get('approved-by-employee/:employeeCode')
   @ApiOperation({ summary: 'vactions record for employee' })
async getApprovedRequestsByEmployee(
  
  @Param('employeeCode') employeeCode: string
) {
  return this.service.findApprovedByEmployeeCode(employeeCode);
}


  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a vacation request by ID' })
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

 @Patch('update-status')
  @ApiOperation({ summary: 'Update status by id' })
  @ApiQuery({
    name: 'currentStatus',
    enum: Status,
    required: true,
    description: 'Current status of the vacation request',
  })
  async updateStatus(
    @Query('currentStatus') currentStatus: Status,
    @Body() updateStatusDto: UpdateStatusDto
  ) {
    return this.service.updateStatusByIdAndCurrentStatus(
      updateStatusDto.id,
      currentStatus,
      updateStatusDto.newStatus
    );
  }
  

   @Patch(':id/update-requester')
  @ApiOperation({ summary: 'Actualizar el requester de una solicitud de vacaciones por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la solicitud de vacaciones' })
  @ApiResponse({ status: 200, description: 'Requester actualizado correctamente' })
  async updateRequester(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRequesterDto,
  ) {
    return this.service.updateRequester(id, dto);
  }
  

   @Patch(':id/approve-by-supervisor')
  @ApiOperation({ summary: 'Aprobar solicitud por supervisor' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la solicitud' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        supervisedBy: { type: 'string', example: 'rfunes' },
        approved: { type: 'boolean', example: true },
      },
      required: ['supervisedBy', 'approved'],
    },
  })
  approveBySupervisor(
    @Param('id') id: string,
    @Body('supervisedBy') supervisedBy: string,
    @Body('approved') approved: boolean,
  ) {
    return this.service.approveBySupervisor(Number(id), supervisedBy, approved);
  }


  @Patch(':id/days')
  @ApiOperation({ summary: 'Actualizar días de vacaciones disponibles' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la solicitud de vacaciones' })
  @ApiBody({ type: UpdateDaysVacationDto })
  @ApiResponse({ status: 200, description: 'Días actualizados correctamente' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  async updateDaysVacationAvailable(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateDaysVacationDto
  ) {
    return this.service.updateDaysVacationAvailable(
      id,
      body.days,
      body.vacationPeriod
    );
  }



}