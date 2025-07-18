/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RequeststockappService { 
      constructor(private prisma: PrismaService) {}



    async getPendingRequisitionsByDepartment(department: string ,offset: number ,
      limit: number
    ) {
        const resulta = await this.prisma.$queryRawUnsafe<any[]>(`
            CALL qsamax.requisitionPendingApproved(${JSON.stringify(department)});
          `);
    
          const countResult = await this.prisma.$queryRawUnsafe<any[]>(`
            SELECT COUNT(*) as total
            FROM inmsa.stockrequest s
            WHERE  (  s.WasApproved  = 0 or s.WasApproved is null )
              AND s.Department = ${JSON.stringify(department)}
          `);
        
          const totalItems = Number(countResult[0]?.total ?? 0);

          

          const result = await this.prisma.$queryRawUnsafe<any[]>(`
            SELECT  
              s.RequestUser AS usuario,
              s.SerNr AS numero,
              s.Labels AS op,
              s.Name AS nombre,
              CASE  
                WHEN s.status = 1 THEN 'Autorizado'
                WHEN s.status = 2 THEN 'Almacen'
                WHEN s.status = 4 THEN 'Entregado'
                ELSE 'otro' 
              END AS Estado,
              s.PlanReceiptDate ,
              internalid as Id
            FROM inmsa.stockrequest s
            WHERE  (  s.WasApproved  = 0 or s.WasApproved is null )
              AND s.Department = ${JSON.stringify(department)}
               ORDER BY s.PlanReceiptDate DESC
               LIMIT ${limit} OFFSET ${offset};
          `);

         // Convierte BigInt a string (si hay)
  const data = result.map((row: any) => {
    return Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        key,
        typeof value === 'bigint' ? value.toString() : value
      ])
    );
  });

  //return data;

  return {
    totalItems,
    data,
    offset,
    limit,
    currentPage: Math.floor(offset / limit) + 1,
    totalPages: Math.ceil(totalItems / limit),
  };


    }



    
    async workordershow() {
        const result = await this.prisma.$queryRawUnsafe<any[]>(`
            SELECT w.Labels AS op, w.SerNr AS numero, w.Comment AS descripcion
            FROM inmsa.workorder w;
          `);

          const data = result.map((row: any) => {
            return Object.fromEntries(
              Object.entries(row).map(([key, value]) => [
                key,
                typeof value === 'bigint' ? value.toString() : value
              ])
            );
          });
        
          return data;      

    }


    async UserDepartmentShow( department: string  ) {
      const result = await this.prisma.$queryRawUnsafe<any[]>(`
          SELECT Department as departamento
          FROM inmsa.user 
          where code = ${JSON.stringify(department)};
        `);

        const data = result.map((row: any) => {
          return Object.fromEntries(
            Object.entries(row).map(([key, value]) => [
              key,
              typeof value === 'bigint' ? value.toString() : value
            ])
          );
        });
      
        return data;     

  }



  async RequisitionDetailShow( requsitionid: number  ) {
    const result = await this.prisma.$queryRawUnsafe<any[]>(`
          SELECT s.ArtCode, s.Name , s.qty, s.unit , s.PlanReceiptDate 
          FROM inmsa.stockrequestitemrow s 
          where masterid = ${JSON.stringify(requsitionid)};
      `);

      const data = result.map((row: any) => {
        return Object.fromEntries(
          Object.entries(row).map(([key, value]) => [
            key,
            typeof value === 'bigint' ? value.toString() : value
          ])
        );
      });
    
      return data;      

}


// En tu servicio, por ejemplo requisition.service.ts

async approveRequisition(internalId: number, authorizedBy: string) {
  try {
    await this.prisma.$executeRawUnsafe(`
      UPDATE inmsa.stockrequest
      SET WasApproved = 1, status = 1,
          authorizedby = ${JSON.stringify(authorizedBy)}
      WHERE internalid = ${JSON.stringify(internalId)};
    `);

    return { success: true, message: 'Requisición aprobada correctamente' };
  } catch (error) {
    console.error('Error aprobando requisición:', error);
    throw new Error('No se pudo aprobar la requisición');
  }
}



}
