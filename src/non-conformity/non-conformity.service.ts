import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path if your PrismaService is elsewhere
import { CauseNonconformity, NonConformingProduct } from '@prisma/client';
import { CreateCauseNonconformityDto } from './dto/create-cause-nonconformity.dto';
import { UpdateCauseNonconformityDto } from './dto/update-cause-nonconformity.dto';
import { CreateNonConformingProductDto } from './dto/create-non-conforming-product.dto';
import { UpdateNonConformingProductDto } from './dto/update-non-conforming-product.dto';



@Injectable()
export class NonConformityService {
  constructor(private prisma: PrismaService) {}


  
  async createNonConformingProduct(
    dto: CreateNonConformingProductDto,
  ): Promise<NonConformingProduct> {
    const { nonConformityAttachmentIds, ...productData } = dto;


    console.log('Received DTO:', JSON.stringify(dto, null, 2)); // Log completo del DTO
    console.log('Extracted nonConformityAttachmentIds:', nonConformityAttachmentIds); // Log de los IDs
    console.log('Product Data for creation:', productData); // Log de los datos del producto


    // Paso 1: Validar que las entidades referenciadas directamente existan (Product, Cause, Disposition)
    // (Este código ya lo tienes o es similar al que te he mostrado antes)
    const productExists = await this.prisma.product.findUnique({
      where: { productId: productData.idProduct },
    });
    if (!productExists) {
      throw new NotFoundException(`Product with ID ${productData.idProduct} not found.`);
    }

   

    const dispositionExists = await this.prisma.disposition.findUnique({
      where: { dispositionId: productData.iddisposition },
    });
    if (!dispositionExists) {
      throw new NotFoundException(`Disposition with ID ${productData.iddisposition} not found.`);
    }
    // ... Fin de validaciones de entidades principales

    // Paso 2 (Opcional pero recomendado): Validar que los NonConformityAttachment IDs existan
    if (nonConformityAttachmentIds && nonConformityAttachmentIds.length > 0) {
      const attachments = await this.prisma.nonConformityAttachment.findMany({
        where: {
          nonConformityAttachmentId: { in: nonConformityAttachmentIds },
        },
        select: { nonConformityAttachmentId: true }, // Solo necesitamos los IDs para verificar existencia
      });

      if (attachments.length !== nonConformityAttachmentIds.length) {
        const foundIds = attachments.map(a => a.nonConformityAttachmentId);
        const notFoundIds = nonConformityAttachmentIds.filter(id => !foundIds.includes(id));
        throw new NotFoundException(
          `NonConformityAttachment(s) with ID(s) ${notFoundIds.join(', ')} not found. Cannot create links.`
        );
      }
    }

    // Paso 3: Crear el NonConformingProduct y las relaciones en ProductAttachments
    try {
      const createdNonConformingProduct = await this.prisma.nonConformingProduct.create({
        data: {
          ...productData, // Todos los campos de NonConformingProduct
          // Crear las relaciones en ProductAttachments si se proporcionaron IDs
          ...(nonConformityAttachmentIds && nonConformityAttachmentIds.length > 0 && {
            attachmentLinks: { // Este es el nombre de la relación en tu modelo NonConformingProduct
              create: nonConformityAttachmentIds.map((attachmentId) => ({
                // Prisma infiere nonConformingProductId porque estamos creando dentro de un NonConformingProduct
                nonConformityAttachment: { // Esta es la relación en ProductAttachments hacia NonConformityAttachment
                  connect: { nonConformityAttachmentId: attachmentId },
                },
              })),
            },
          }),
        },
        include: { // Opcional: Incluir los adjuntos en la respuesta para verificar
          attachmentLinks: {
            include: {
              nonConformityAttachment: true,
            },
          },
        },
      });
      return createdNonConformingProduct;
    } catch (error) {
      // Manejo de errores más específico si es necesario
      if (error.code === 'P2003') { // Ejemplo: Error de clave foránea
          throw new BadRequestException(`Foreign key constraint failed. Ensure all provided IDs are valid. Details: ${error.meta?.field_name}`);
      }
      console.error("Error creating non-conforming product with attachments:", error);
      throw new InternalServerErrorException('Could not create non-conforming product with attachments.');
    }
  }





  // --- CauseNonconformity CRUD ---
  async createCauseNonconformity(
    dto: CreateCauseNonconformityDto,
  ): Promise<CauseNonconformity> {
    return this.prisma.causeNonconformity.create({ data: dto });
  }

  async findAllCauseNonconformities(): Promise<CauseNonconformity[]> {
    return this.prisma.causeNonconformity.findMany();
  }

  async findOneCauseNonconformity(
    id: number,
  ): Promise<CauseNonconformity | null> {
    const cause = await this.prisma.causeNonconformity.findUnique({
      where: { causeNonconformityId: id },
    });
    if (!cause) {
      throw new NotFoundException(`CauseNonconformity with ID ${id} not found`);
    }
    return cause;
  }

  async updateCauseNonconformity(
    id: number,
    dto: UpdateCauseNonconformityDto,
  ): Promise<CauseNonconformity> {
    await this.findOneCauseNonconformity(id); // Check if exists
    return this.prisma.causeNonconformity.update({
      where: { causeNonconformityId: id },
      data: dto,
    });
  }

  async removeCauseNonconformity(id: number): Promise<CauseNonconformity> {
    await this.findOneCauseNonconformity(id); // Check if exists
    return this.prisma.causeNonconformity.delete({
      where: { causeNonconformityId: id },
    });
  }

  // --- NonConformingProduct CRUD ---
 /* async createNonConformingProduct(
    dto: CreateNonConformingProductDto,
  ): Promise<NonConformingProduct> {
    // Potentially add checks here if related entities (idProduct, etc.) exist
    return this.prisma.nonConformingProduct.create({ data: dto 

        
    });
  }*/

  async findAllNonConformingProducts(): Promise<NonConformingProduct[]> {
    return this.prisma.nonConformingProduct.findMany({
      include: {
        product: true,
        causeNonConformity: true,
        disposition: true,
        
        attachmentLinks: true,
      },
    });
  }

  async findOneNonConformingProduct(
    id: number,
  ): Promise<NonConformingProduct | null> {
    const product = await this.prisma.nonConformingProduct.findUnique({
      where: { nonConformingProductId: id },
      include: {
        product: true,
        causeNonConformity: true,
        disposition: true,
        attachmentLinks: true,
      },
    });
    if (!product) {
      throw new NotFoundException(`NonConformingProduct with ID ${id} not found`);
    }
    return product;
  }

  async updateNonConformingProduct(
    id: number,
    dto: UpdateNonConformingProductDto,
  ): Promise<NonConformingProduct> {
    await this.findOneNonConformingProduct(id); // Check if exists
    return this.prisma.nonConformingProduct.update({
      where: { nonConformingProductId: id },
      data: dto,
    });
  }

  async removeNonConformingProduct(id: number): Promise<NonConformingProduct> {
    await this.findOneNonConformingProduct(id); // Check if exists
    return this.prisma.nonConformingProduct.delete({
      where: { nonConformingProductId: id },
    });
  }
}