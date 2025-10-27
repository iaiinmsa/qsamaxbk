import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateManufacturingOrderDetailDto } from './dto/create-manufacturing-order-detail.dto';
import { CreateManufacturingOrderDto } from './dto/create-manufacturing-order.dto';
import * as fs from 'fs';
import * as path from 'path'; //
import { ConfigService } from '@nestjs/config';


//const COMPARTIDO = '\\\\192.168.20.2\\tecnica\\planostecnica';
let COMPARTIDO = '';



interface CreateDetailWithFileDto {
  manufacturingOrderId: number;
  uploadBy: string;
  description?: string;
  file: Express.Multer.File;
}




@Injectable()
export class ManufacturingOrderService {

  private readonly SHARED_PATHTECNICA: string;

  constructor(private prisma: PrismaService,
     private configService: ConfigService,


  ) {


      const pathFromEnv = this.configService.get<string>('SHARED_PATHTECNICA');
    if (!pathFromEnv) throw new Error('La variable SHARED_PATHTECNICA no está definida en .env');
    this.SHARED_PATHTECNICA = pathFromEnv;

    COMPARTIDO =  this.SHARED_PATHTECNICA 
  }


  

  async createOrder(data: CreateManufacturingOrderDto) {
    return this.prisma.manufacturingOrder.create({
      data,
    });
  }

  async getOrders() {
    return this.prisma.manufacturingOrder.findMany({
      include: { details: true },
    });
  }

  async getOrderById(id: number) {
    const order = await this.prisma.manufacturingOrder.findUnique({
      where: { idManufacturingOrder: id },
      include: { details: true },
    });
    if (!order) throw new NotFoundException('Orden no encontrada');
    return order;
  }

  async createDetailb(data: CreateManufacturingOrderDetailDto) {
    return this.prisma.manufacturingOrderDetail.create({
      data,
    });
  }

  
  async createDetail(data: CreateDetailWithFileDto) {
  if (!data.file) {
    throw new Error('No se ha enviado archivo');
  }

  const originalName = data.file.originalname;

// Normalizar Unicode
let safeName = originalName.normalize('NFKC');

// Reemplazar caracteres no válidos
safeName = safeName.replace(/[^\w.-]/g, '_');

  // Generar nombre único y ruta
  const uniqueName = `${Date.now()}-${safeName}`;
//  const fullPath = path.join(COMPARTIDO, uniqueName);
  //const fullPath = `${this.SHARED_PATHTECNICA}\\${uniqueName}`;
  const fullPath = path.win32.join(this.SHARED_PATHTECNICA, uniqueName);


  // Guardar el archivo en la carpeta compartida
  fs.writeFileSync(fullPath, data.file.buffer);

  // Crear registro en la DB
  const detalle = await this.prisma.manufacturingOrderDetail.create({
    data: {
      manufacturingOrderId: Number(data.manufacturingOrderId),
      uploadBy: data.uploadBy,
      fileName: safeName,
      filePath: fullPath,
      description: data.description || '',
     
    },
    
  });
 console.log('Detalle creado:', data)
  return detalle;
}


}
