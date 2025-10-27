/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException, Query, Res } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { existsSync } from 'fs';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

//const COMPARTIDO = '\\\\192.168.20.2\\tecnica\\planostecnica';
let COMPARTIDO = '';


@Injectable()
export class Plan_headerService { 

  private readonly SHARED_PATHTECNICA: string;


 constructor(private prisma: PrismaService,
      private configService: ConfigService


 ) {
       const pathFromEnv = this.configService.get<string>('SHARED_PATHTECNICA');
    if (!pathFromEnv) throw new Error('La variable SHARED_PATHTECNICA no está definida en .env');
    this.SHARED_PATHTECNICA = pathFromEnv;

    COMPARTIDO =  this.SHARED_PATHTECNICA 

 }
 

  async subirPlano(
    file: Express.Multer.File,
    body: {
      user_name: string;
      production_order: string;
      project_name: string;
      plan_type: string;
      plan_review: string;
    },
  ) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
   // const fullPath = path.join(COMPARTIDO, uniqueName);
    // const fullPath = `${this.SHARED_PATHTECNICA}\\${uniqueName}`;
 const fullPath = path.win32.join(this.SHARED_PATHTECNICA, uniqueName);


    // Escribir en red compartida
    fs.writeFileSync(fullPath, file.buffer);

    // Insertar en plan_header
    const encabezado = await this.prisma.plan_header.create({
      data: {
        user_name: body.user_name,
        production_order: body.production_order,
        project_name: body.project_name,
        created_at: new Date(),
        plan_details: {
          create: {
            file_path: fullPath,
            //plan_type: body.plan_type,
            plan_type_id: Number(body.plan_type),
            uploaded_by: body.user_name,
            file_name: file.originalname,
            upload_at: new Date(),
            plan_review: body.plan_review,
            
          },
        },
      },
      include: { plan_details: true },
    });

    return encabezado;
  }


  async subirDetallePlano(planId: number, file: Express.Multer.File, body: { plan_type: string; uploaded_by: string; plan_review: string }) {

      const fileName = `${Date.now()}-${file.originalname}`;
//  const fullPath = path.join(COMPARTIDO, fileName); // 👈 Ruta completa
   // const fullPath = `${this.SHARED_PATHTECNICA}\\${fileName}`;
  const fullPath = path.win32.join(this.SHARED_PATHTECNICA, fileName);
 

  // ✅ Escribir archivo en red compartida
  fs.writeFileSync(fullPath, file.buffer);


  // Guardar en tabla plan_detail
  return this.prisma.plan_detail.create({
    data: {
      plan_header_id: planId,
      file_path: fullPath,
      file_name: fileName,
      plan_type_id: Number(body.plan_type),
     // plan_type: body.plan_type,
      uploaded_by: body.uploaded_by,
      upload_at: new Date(),
      plan_review: body.plan_review, 
      
      
    },
  });
}


// En tu servicio


async obtenerTodosLosPlanes() {
  return this.prisma.plan_header.findMany({
    include: {
      plan_details: {
        include: {
           plan_type: true, // 👈 trae también el tipo del plano
        },
      },
    },
  });
}



// En tu servicio
async obtenerPlanPorId(id: number) {
  return this.prisma.plan_header.findUnique({
    where: { idPlan: id },
    include: {
      plan_details: true, // incluye los detalles relacionados
    },
  });
}


  async downloadFile(@Query('file') fileName: string, @Res() res: Response) {
    if (!fileName) {
      throw new NotFoundException('Archivo no especificado');
    }

    // Sanitiza y construye la ruta completa
    const filePath = path.join(COMPARTIDO, fileName);

    // Verifica si el archivo existe
    if (!existsSync(filePath)) {
      throw new NotFoundException('Archivo no encontrado');
    }

    // Descarga el archivo
    return res.download(filePath, fileName);
  }

  
}
