import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVacationRequestDto } from './dto/create-vacation-request.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from '@prisma/client';
import { UpdateRequesterDto } from './dto/update-requester.dto';

@Injectable()
export class VacationRequestService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateVacationRequestDto) {
    return this.prisma.vacationRequest.create({ data });
  }

  async findAll() {
    return this.prisma.vacationRequest.findMany();
  }

  async findOne(id: number) {
    return this.prisma.vacationRequest.findUnique({ where: { id } });
  }

  async delete(id: number) {
    return this.prisma.vacationRequest.delete({ where: { id } });
  }

 async findRegistered() {

  const result = await this.prisma.$queryRawUnsafe<any[]>(`
    SELECT 
       vr.id,
    vr.request_date,
    vr.employee_code,
    vr.years_worked,
    ( vr.vacation_hours / 8 ) AS vacation_hours,
    vr.vacation_start_date,
    vr.vacation_end_date,
    vr.half_day_vacation,
    vr.vacation_period,
    vr.status,
    vr.requester,
    vr.pending_days,
    vr.current_days,
    vr.calculated_days,
      CONCAT(e.Name, ' ', e.LastName, ' ', e.LastName2) AS nombre,
      e.Email AS correo,
      e.startdate AS fechaingreso,
      e.labels,
      e.code AS codigo,
      e.jobposition AS posicion,
      j.Comment AS puesto,
      l.Name AS proceso
    FROM vacationRequest vr
    INNER JOIN inmsa.employee e ON e.code = vr.employee_code
    INNER JOIN inmsa.jobposition j ON j.code = e.jobposition
    INNER JOIN inmsa.label l ON l.code = e.labels
    WHERE vr.status = 'register'
  `);

  return result.map((row: any) =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        key,
        typeof value === 'bigint' ? value.toString() : value
      ])
    )
  );



}


async findRegisteredByEmail(email: string) {
  const result = await this.prisma.$queryRawUnsafe<any[]>(`
    SELECT 
       vr.id,
       vr.request_date,
       vr.employee_code,
       vr.years_worked,
       ( vr.vacation_hours / 8 ) AS vacation_hours,
       vr.vacation_start_date,
       vr.vacation_end_date,
       vr.half_day_vacation,
       vr.vacation_period,
       vr.status,
       vr.requester,
       vr.pending_days,
       vr.current_days,
       vr.calculated_days,
       CONCAT(e.Name, ' ', e.LastName, ' ', e.LastName2) AS nombre,
       e.Email AS correo,
       e.startdate AS fechaingreso,
       e.labels,
       e.code AS codigo,
       e.jobposition AS posicion,
       j.Comment AS puesto,
       l.Name AS proceso
    FROM vacationRequest vr
    INNER JOIN inmsa.employee e ON e.code = vr.employee_code
    INNER JOIN inmsa.jobposition j ON j.code = e.jobposition
    INNER JOIN inmsa.label l ON l.code = e.labels
    WHERE vr.status = 'register'  and vr.calculated_days = 0
    and vr.requester = ''
     AND TRIM(REPLACE(REPLACE(e.Email, '\r', ''), '\n', ''))  = ?
  `, email.trim());

  return result.map((row: any) =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        key,
        typeof value === 'bigint' ? value.toString() : value
      ])
    )
  );
}



async findLastApprovedByEmployee(employeeCode: string) {
  return this.prisma.vacationRequest.findFirst({
    where: {
      employee_code: employeeCode,
      status: 'approved',
    },
    orderBy: {
      id: 'desc', // o 'id': 'desc' si no tienes fecha
    },
  });
}

 
async getRequestsBySupervisor(supervisorCode: string) {
  // 1. Buscar todos los códigos de empleados que pertenecen a un grupo de este supervisor
  const employees = await this.prisma.approvalGroupEmployee.findMany({
    where: {
      group: {
        managers: {
          some: { superviserCode: supervisorCode },
        },
      },
    },
    select: { employeeCode: true },
  });

 const employeeCodes = employees.map(e => e.employeeCode);
 
 console.log('Códigos de empleados bajo el supervisor', supervisorCode, ':', employeeCodes);

  // 2. Si no hay empleados, devolver arreglo vacío
  if (employees.length === 0) {
    return [];
  }

  // 3. Buscar todas las solicitudes de vacaciones de esos empleados
   const result = await this.prisma.$queryRawUnsafe<any[]>(`
    SELECT 
       vr.id,
       vr.request_date,
       vr.employee_code,
       vr.years_worked,
       ( vr.vacation_hours / 8 ) AS vacation_hours,
       vr.vacation_start_date,
       vr.vacation_end_date,
       vr.half_day_vacation,
       vr.vacation_period,
       vr.status,
       vr.requester,
       vr.pending_days,
       vr.current_days,
       vr.calculated_days,
       CONCAT(e.Name, ' ', e.LastName, ' ', e.LastName2) AS nombre,
       e.Email AS correo,
       e.startdate AS fechaingreso,
       e.labels,
       e.code AS codigo,
       e.jobposition AS posicion,
       j.Comment AS puesto,
       l.Name AS proceso
    FROM vacationRequest vr
    INNER JOIN inmsa.employee e ON e.code = vr.employee_code
    INNER JOIN inmsa.jobposition j ON j.code = e.jobposition
    INNER JOIN inmsa.label l ON l.code = e.labels
    WHERE vr.status = 'pending'
      AND vr.calculated_days = 0
      and immediate_supervisor_approved = false
      AND vr.employee_code IN (${employeeCodes.map(c => `'${c}'`).join(',')})
  `);

  // 3️⃣ Convertir bigint a string si es necesario
  return result.map((row: any) =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        key,
        typeof value === 'bigint' ? value.toString() : value,
      ])
    )
  );

}





private async getEmployeeCodesBySupervisor(supervisorCode: string) {
  const groups = await this.prisma.approvalGroupEmployee.findMany({
    where: {
      group: {
        managers: {
          some: { superviserCode: supervisorCode }
        }
      }
    },
    select: { employeeCode: true }
  });

  return groups.map(e => e.employeeCode);
}





async updateStatusByIdAndCurrentStatus(id: number, currentStatus: Status, newStatus: Status) {
    const result = await this.prisma.vacationRequest.updateMany({
      where: {
        id,
        status: currentStatus
      },
      data: {
        status: newStatus
      }
    });
    return result; // { count: X }
  }


   async updateRequester(id: number, dto: UpdateRequesterDto) {
    const request = await this.prisma.vacationRequest.findUnique({ where: { id } });

    if (!request) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }

    return this.prisma.vacationRequest.update({
      where: { id },
      data: { requester: dto.requester },
    });
  }
  

   async approveBySupervisor(
    id: number,
    supervisedBy: string,
    approved: boolean
  ) {
    return this.prisma.vacationRequest.update({
      where: { id },
      data: {
        immediate_supervisor_approved: approved,
        superviso_by: supervisedBy,
        superviso_at: new Date(), // Fecha y hora actual
      },
    });
  }


   async updateDaysVacationAvailable(
    id: number,
    days: number,
    vacationPeriod: string
  ) {
    return this.prisma.vacationRequest.update({
      where: { id },
      data: {
        calculated_days: days,
        pending_days: days,
        vacation_period: vacationPeriod
      },
    });
  }


  async findApprovedByEmployeeCode(employeeCode: string) {
  const result = await this.prisma.$queryRawUnsafe<any[]>(`
    SELECT 
      vr.id,
      vr.request_date,
      vr.employee_code,
      vr.years_worked,
      (vr.vacation_hours / 8) AS vacation_hours,
      vr.vacation_start_date,
      vr.vacation_end_date,
      vr.half_day_vacation,
      vr.vacation_period,
      vr.status,
      vr.requester,
      vr.pending_days,
      vr.current_days,
      vr.calculated_days,
      CONCAT(e.Name, ' ', e.LastName, ' ', e.LastName2) AS nombre,
      e.Email AS correo,
      e.startdate AS fechaingreso,
      e.labels,
      e.code AS codigo,
      e.jobposition AS posicion,
      j.Comment AS puesto,
      l.Name AS proceso,
      vr.pending_days +  vr.current_days as   dias_previos ,
      CASE
        WHEN vr.calculated_days < 1 THEN 'carga días'
        ELSE 'días descansados'
      END AS tipo_dias
    FROM qsamax.vacationRequest vr
    INNER JOIN inmsa.employee e ON e.code = vr.employee_code
    INNER JOIN inmsa.jobposition j ON j.code = e.jobposition
    INNER JOIN inmsa.label l ON l.code = e.labels
    WHERE vr.status = 'approved'
    and vr.calculated_days < 1
      AND e.code = ? ORDER BY vr.id DESC
  `, employeeCode.trim());

  return result.map((row: any) =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        key,
        typeof value === 'bigint' ? value.toString() : value
      ])
    )
  );
}


  

}