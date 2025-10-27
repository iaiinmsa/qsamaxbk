




import { Controller, Get, Post, Body, Param, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiProperty, ApiBody } from '@nestjs/swagger';
import { ManufacturingOrderService } from './manufacturing-order.service';
import { CreateManufacturingOrderDto } from './dto/create-manufacturing-order.dto';
import { CreateManufacturingOrderDetailDto } from './dto/create-manufacturing-order-detail.dto';
import { FileInterceptor } from '@nestjs/platform-express';








@ApiTags('manufacturing-order')
@Controller('manufacturing-order')
export class ManufacturingOrderController {
  constructor(private readonly service: ManufacturingOrderService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva orden de fabricación' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente' })
  create(@Body() dto: CreateManufacturingOrderDto) {
    return this.service.createOrder(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las órdenes' })
  getAll() {
    return this.service.getOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener orden por ID' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.getOrderById(id);
  }


@Post('detail')
@ApiOperation({ summary: 'Agregar detalle a una orden' })
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      file: { type: 'string', format: 'binary' },
      manufacturingOrderId: { type: 'number' },
      uploadBy: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['file', 'manufacturingOrderId', 'uploadBy'],
  },
})
@UseInterceptors(FileInterceptor('file'))
createDetail(
  @UploadedFile() file: Express.Multer.File,
  @Body() body: { manufacturingOrderId: number; uploadBy: string; description?: string },
) {
  // Pasamos todo al servicio
  return this.service.createDetail({ ...body, file });
}



}
