import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path if your PrismaService is elsewhere
import { CauseNonconformity, NonConformingProduct } from '@prisma/client';
import { CreateCauseNonconformityDto } from './dto/create-cause-nonconformity.dto';
import { UpdateCauseNonconformityDto } from './dto/update-cause-nonconformity.dto';
import { CreateNonConformingProductDto } from './dto/create-non-conforming-product.dto';
import { UpdateNonConformingProductDto } from './dto/update-non-conforming-product.dto';



@Injectable()
export class NonConformityService {
  constructor(private prisma: PrismaService) {}


  /*
 async createNonConformingProducts(
    dto: CreateNonConformingProductDto,
  ): Promise<NonConformingProduct> {
    const { nonConformityAttachmentIds, ...productData } = dto;

    // Paso 1: Validar que las entidades referenciadas directamente existan (Product, Cause, Disposition)
    const productExists = await this.prisma.product.findUnique({
      where: { productId: productData.idProduct },
    });
    if (!productExists) {
      throw new NotFoundException(`Product with ID ${productData.idProduct} not found.`);
    }

    const causeExists = await this.prisma.causeNonconformity.findUnique({
      where: { causeNonconformityId: productData.idCauseNonConformity },
    });
    if (!causeExists) {
      throw new NotFoundException(`CauseNonconformity with ID ${productData.idCauseNonConformity} not found.`);
    }

    const dispositionExists = await this.prisma.disposition.findUnique({
      where: { dispositionId: productData.iddisposition },
    });
    if (!dispositionExists) {
      throw new NotFoundException(`Disposition with ID ${productData.iddisposition} not found.`);
    }

    // Paso 2 (Opcional pero recomendado): Validar que los NonConformityAttachment IDs existan
    if (nonConformityAttachmentIds && nonConformityAttachmentIds.length > 0) {
      const attachments = await this.prisma.nonConformityAttachment.findMany({
        where: {
          nonConformityAttachmentId: { in: nonConformityAttachmentIds },
        },
        select: { nonConformityAttachmentId: true },
      });

      if (attachments.length !== nonConformityAttachmentIds.length) {
        const foundIds = attachments.map(a => a.nonConformityAttachmentId);
        const notFoundIds = nonConformityAttachmentIds.filter(id => !foundIds.includes(id));
        throw new NotFoundException(`NonConformityAttachment(s) with ID(s) ${notFoundIds.join(', ')} not found.`);
      }
    }


    // Paso 3: Crear el NonConformingProduct y las relaciones en ProductAttachments
    return this.prisma.nonConformingProduct.create({
      data: {
        ...productData,
        ...(nonConformityAttachmentIds && nonConformityAttachmentIds.length > 0 && {
          attachmentLinks: {
            create: nonConformityAttachmentIds.map((attachmentId) => ({
              nonConformityAttachment: {
                connect: { nonConformityAttachmentId: attachmentId },
              },
            })),
          },
        }),
      },
      include: { // Incluir los adjuntos en la respuesta para verificar
        attachmentLinks: {
          include: {
            nonConformityAttachment: true,
          },
        },
      },
    });
  }
*/


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
  async createNonConformingProduct(
    dto: CreateNonConformingProductDto,
  ): Promise<NonConformingProduct> {
    // Potentially add checks here if related entities (idProduct, etc.) exist
    return this.prisma.nonConformingProduct.create({ data: dto 

        
    });
  }

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