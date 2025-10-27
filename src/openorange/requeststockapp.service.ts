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
        const resultd = await this.prisma.$queryRawUnsafe<any[]>(`
            SELECT w.Labels AS op, w.SerNr AS numero, w.Comment AS descripcion
            FROM inmsa.workorder w;
          `);


              const result = await this.prisma.$queryRawUnsafe<any[]>(`
        SELECT code AS op, name AS descripcion, internalId AS numero 
        FROM inmsa.label 
        WHERE type = 'OPS';
    `);
    return this.mapBigIntToString(result);
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

    authorizedBy = authorizedBy.toUpperCase();
    
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


async getEmployeeDetails() {
  const result = await this.prisma.$queryRawUnsafe<any[]>(`
    SELECT 
      CONCAT(e.Name, ' ', e.LastName, ' ', e.LastName2) AS nombre,
      e.Email AS correo,
      e.startdate AS fechaingreso,
      e.labels,
      e.code AS codigo,
      e.jobposition AS posicion,
      j.Comment AS puesto,
      l.Name AS proceso
    FROM inmsa.employee e
    left JOIN inmsa.jobposition j ON j.code = e.jobposition
    left JOIN inmsa.label l ON l.code = e.labels
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



  async getCurrency() {
    const result = await this.prisma.$queryRawUnsafe<any[]>(`
        SELECT code AS codigo, alias, internalId AS numero FROM inmsa.currency;
    `);
    return this.mapBigIntToString(result);
}

async getCustomer() {
    const result = await this.prisma.$queryRawUnsafe<any[]>(`
        SELECT code AS codigo, fantasyname, name AS nombre, taxregnr AS rtn FROM inmsa.customer;
    `);
    return this.mapBigIntToString(result);
}

async getUnit() {
    const result = await this.prisma.$queryRawUnsafe<any[]>(`
        SELECT code AS codigo, name AS nombre, internalId AS numero FROM inmsa.unit u;
    `);
    return this.mapBigIntToString(result);
}

async getLabelOps() {
    const result = await this.prisma.$queryRawUnsafe<any[]>(`
        SELECT code AS codigo, name AS nombre, internalId AS numero 
        FROM inmsa.label 
        WHERE type = 'OPS';
    `);
    return this.mapBigIntToString(result);
}

// Método helper para convertir BigInt a string
private mapBigIntToString(result: any[]) {
    return result.map(row =>
        Object.fromEntries(
            Object.entries(row).map(([k, v]) => [k, typeof v === 'bigint' ? v.toString() : v])
        )
    );
}


 // Método para insertar etiqueta
  async createLabel(labelData: {
    code: string;
    name: string;
    level: number;
    syncversion: number;
    closed: number;
    type: string;
  }) {
    const dbName = process.env.DB_DATABASEOPORANGE; // variable de entorno

    const { code, name, level, syncversion, closed, type } = labelData;

    const query = `
      INSERT INTO ${dbName}.label 
      (code, name, level, syncversion, closed, type)
      VALUES (
        ${JSON.stringify(code)},
        ${JSON.stringify(name)},
        ${level},
        ${syncversion},
        ${closed},
        ${JSON.stringify(type)}
      );
    `;

    try {
      await this.prisma.$executeRawUnsafe(query);
      return { success: true, message: 'Etiqueta creada correctamente' };
    } catch (error) {
      console.error('Error creando etiqueta:', error);
      throw new Error('No se pudo crear la etiqueta');
    }
  }


  async createLabelAndUpdateOrder(labelData: {
  code: string;
  name: string;
  level: number;
  syncversion: number;
  closed: number;
  type: string;
}) {
  const dbName = process.env.DB_DATABASEOPORANGE;
  const { code, name, level, syncversion, closed, type } = labelData;

  try {
    const result = await this.prisma.$transaction(async (tx) => {

      // 1️⃣ Crear la etiqueta
      await tx.$executeRawUnsafe(
        `INSERT INTO ${dbName}.label (code, name, level, syncversion, closed, type)
         VALUES (?, ?, ?, ?, ?, ?)`,
        code,
        name,
        level,
        syncversion,
        closed,
        type
      );

      // 2️⃣ Obtener internalId recién generado
      const queryResult: any = await tx.$queryRawUnsafe(
        `SELECT internalId FROM ${dbName}.label 
         WHERE code = ? ORDER BY internalId DESC LIMIT 1`,
        code
      );
      const internalId = queryResult[0]?.internalId;
      if (!internalId) throw new Error('No se pudo obtener internalId');

      // 3️⃣ Actualizar la orden de producción existente
      await tx.manufacturingOrder.update({
        where: { productionOrder: code },
        data: { ProductionOrderId: internalId },
      });

      return { success: true, internalId };
    });

    return result;

  } catch (error) {
    console.error('Error creando etiqueta y actualizando orden:', error);
    throw new Error('No se pudo crear la etiqueta ni actualizar la orden');
  }
}





}
