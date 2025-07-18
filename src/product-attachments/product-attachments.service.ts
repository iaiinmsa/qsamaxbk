import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateProductAttachmentDto } from './dto/create-product-attachment.dto';
import { UpdateProductAttachmentDto } from './dto/update-product-attachment.dto';

import {   ProductAttachments} from '@prisma/client'; // Asegúrate de que este modelo esté definido en tu esquema Prisma
// ...

@Injectable()
export class ProductAttachmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductAttachmentDto: CreateProductAttachmentDto): Promise<ProductAttachments> {
    const { nonConformingProductId, nonConformityAttachmentId } = createProductAttachmentDto;

    // Verificar que el producto no conforme exista
    const productExists = await this.prisma.nonConformingProduct.findUnique({
      where: { nonConformingProductId },
    });
    if (!productExists) {
      throw new NotFoundException(`NonConformingProduct with ID ${nonConformingProductId} not found.`);
    }

    // Verificar que el adjunto exista
    const attachmentExists = await this.prisma.nonConformityAttachment.findUnique({
      where: { nonConformityAttachmentId },
    });
    if (!attachmentExists) {
      throw new NotFoundException(`NonConformityAttachment with ID ${nonConformityAttachmentId} not found.`);
    }

    // Verificar si la relación ya existe para evitar duplicados por la restricción @@unique
    const existingLink = await this.prisma.productAttachments.findUnique({
        where: {
            unique_product_attachment_pair: {
                nonConformingProductId,
                nonConformityAttachmentId,
            }
        }
    });

    if (existingLink) {
        throw new ConflictException(`Attachment ${nonConformityAttachmentId} is already linked to product ${nonConformingProductId}.`);
    }

    return this.prisma.productAttachments.create({
      data: createProductAttachmentDto,
      include: { // Incluir detalles para la respuesta
        nonConformingProduct: { select: { nonConformingProductId: true, productionOrderId: true } },
        nonConformityAttachment: { select: { nonConformityAttachmentId: true, fileName: true } },
      }
    });
  }

  async findAll(): Promise<ProductAttachments[]> {
    return this.prisma.productAttachments.findMany({
      include: {
        nonConformingProduct: { select: { nonConformingProductId: true, productionOrderId: true } },
        nonConformityAttachment: { select: { nonConformityAttachmentId: true, fileName: true } },
      },
    });
  }

  async findOne(id: number): Promise<ProductAttachments> {
    const productAttachment = await this.prisma.productAttachments.findUnique({
      where: { ProductAttachmentsid: id },
      include: {
        nonConformingProduct: { select: { nonConformingProductId: true, productionOrderId: true } },
        nonConformityAttachment: { select: { nonConformityAttachmentId: true, fileName: true } },
      },
    });
    if (!productAttachment) {
      throw new NotFoundException(`ProductAttachment link with ID ${id} not found.`);
    }
    return productAttachment;
  }


  async findByNonConformingProductId(id: number): Promise<ProductAttachments[]> {
    const productAttachment = await this.prisma.productAttachments.findMany({
      where: { nonConformingProductId: id },
      include: {
        nonConformingProduct: {
          select: {
            nonConformingProductId: true,
            productionOrderId: true,
          },
        },
        nonConformityAttachment: {
          select: {
            nonConformityAttachmentId: true,
            fileName: true,
            filePath: true,
          },
        },
      },
    });
  
    if (!productAttachment) {
      throw new NotFoundException(`No ProductAttachment found for nonConformingProductId ${id}`);
    }
  
    return productAttachment;
  }


  async update(id: number, updateProductAttachmentDto: UpdateProductAttachmentDto): Promise<ProductAttachments> {
    const existingEntry = await this.findOne(id); // Verificar que el link exista

    const { nonConformingProductId, nonConformityAttachmentId } = updateProductAttachmentDto;

    // Si se intenta cambiar los IDs, verificar que los nuevos IDs existan
    if (nonConformingProductId && nonConformingProductId !== existingEntry.nonConformingProductId) {
        const productExists = await this.prisma.nonConformingProduct.findUnique({
            where: { nonConformingProductId },
        });
        if (!productExists) {
            throw new NotFoundException(`Target NonConformingProduct with ID ${nonConformingProductId} not found for update.`);
        }
    }
    if (nonConformityAttachmentId && nonConformityAttachmentId !== existingEntry.nonConformityAttachmentId) {
        const attachmentExists = await this.prisma.nonConformityAttachment.findUnique({
            where: { nonConformityAttachmentId },
        });
        if (!attachmentExists) {
            throw new NotFoundException(`Target NonConformityAttachment with ID ${nonConformityAttachmentId} not found for update.`);
        }
    }
    
    // Verificar si la nueva combinación ya existe (si ambos IDs cambian o uno cambia para formar un par existente)
    const targetNcpId = nonConformingProductId ?? existingEntry.nonConformingProductId;
    const targetNcaId = nonConformityAttachmentId ?? existingEntry.nonConformityAttachmentId;

    if (targetNcpId !== existingEntry.nonConformingProductId || targetNcaId !== existingEntry.nonConformityAttachmentId) {
        const conflictingLink = await this.prisma.productAttachments.findUnique({
            where: {
                unique_product_attachment_pair: {
                    nonConformingProductId: targetNcpId,
                    nonConformityAttachmentId: targetNcaId,
                }
            }
        });
        if (conflictingLink && conflictingLink.ProductAttachmentsid !== id) {
            throw new ConflictException(`The new combination of product ID ${targetNcpId} and attachment ID ${targetNcaId} already exists.`);
        }
    }


    return this.prisma.productAttachments.update({
      where: { ProductAttachmentsid: id },
      data: updateProductAttachmentDto,
      include: {
        nonConformingProduct: { select: { nonConformingProductId: true, productionOrderId: true } },
        nonConformityAttachment: { select: { nonConformityAttachmentId: true, fileName: true } },
      }
    });
  }

  async remove(id: number): Promise<ProductAttachments> {
    await this.findOne(id); // Verificar que exista
    return this.prisma.productAttachments.delete({
      where: { ProductAttachmentsid: id },
    });
  }

  // Método para encontrar por IDs de producto y adjunto (útil para desvincular)
  async findByProductAndAttachmentIds(nonConformingProductId: number, nonConformityAttachmentId: number): Promise<ProductAttachments | null> {
    return this.prisma.productAttachments.findUnique({
      where: {
        unique_product_attachment_pair: {
          nonConformingProductId,
          nonConformityAttachmentId,
        },
      },
    });
  }

  // Método para eliminar por IDs de producto y adjunto
  async removeByProductAndAttachmentIds(nonConformingProductId: number, nonConformityAttachmentId: number): Promise<ProductAttachments> {
    const link = await this.findByProductAndAttachmentIds(nonConformingProductId, nonConformityAttachmentId);
    if (!link) {
      throw new NotFoundException(`Link between product ID ${nonConformingProductId} and attachment ID ${nonConformityAttachmentId} not found.`);
    }
    return this.prisma.productAttachments.delete({
      where: {
        ProductAttachmentsid: link.ProductAttachmentsid,
      },
    });
  }
}