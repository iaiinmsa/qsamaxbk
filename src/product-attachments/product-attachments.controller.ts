import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
    Query,
    NotFoundException,
  } from '@nestjs/common';
  import { ProductAttachmentsService } from './product-attachments.service';
  import { CreateProductAttachmentDto } from './dto/create-product-attachment.dto';
  import { UpdateProductAttachmentDto } from './dto/update-product-attachment.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
  
  @ApiTags('Product Attachments (Links)')
  @Controller('product-attachments')
  export class ProductAttachmentsController {
    constructor(private readonly productAttachmentsService: ProductAttachmentsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Link an attachment to a non-conforming product' })
    @ApiResponse({ status: 201, description: 'Link created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request (e.g., validation error).' })
    @ApiResponse({ status: 404, description: 'Product or Attachment not found.' })
    @ApiResponse({ status: 409, description: 'Conflict (link already exists).' })
    create(@Body() createProductAttachmentDto: CreateProductAttachmentDto) {
      return this.productAttachmentsService.create(createProductAttachmentDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all links between products and attachments' })
    @ApiResponse({ status: 200, description: 'List of all links.' })
    findAll() {
      return this.productAttachmentsService.findAll();
    }
  
    @Get('find-by-ids')
    @ApiOperation({ summary: 'Find a specific link by product ID and attachment ID' })
    @ApiQuery({ name: 'productId', type: Number, description: 'ID of the NonConformingProduct' })
    @ApiQuery({ name: 'attachmentId', type: Number, description: 'ID of the NonConformityAttachment' })
    @ApiResponse({ status: 200, description: 'The link details.' })
    @ApiResponse({ status: 404, description: 'Link not found.' })
    async findByProductAndAttachment(
      @Query('productId', ParseIntPipe) productId: number,
      @Query('attachmentId', ParseIntPipe) attachmentId: number,
    ) {
      const link = await this.productAttachmentsService.findByProductAndAttachmentIds(productId, attachmentId);
      if (!link) {
        throw new NotFoundException(`Link not found for product ID ${productId} and attachment ID ${attachmentId}`);
      }
      return link;
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a specific link by its own ID' })
    @ApiParam({ name: 'id', description: 'ID of the ProductAttachment link entry', type: Number })
    @ApiResponse({ status: 200, description: 'The link details.' })
    @ApiResponse({ status: 404, description: 'Link not found.' })
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.productAttachmentsService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a link by its own ID' })
    @ApiParam({ name: 'id', description: 'ID of the ProductAttachment link entry to update', type: Number })
    @ApiResponse({ status: 200, description: 'Link updated successfully.' })
    @ApiResponse({ status: 404, description: 'Link, Product, or Attachment not found.' })
    @ApiResponse({ status: 409, description: 'Conflict (new link combination already exists).' })
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateProductAttachmentDto: UpdateProductAttachmentDto,
    ) {
      return this.productAttachmentsService.update(id, updateProductAttachmentDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a link by its own ID' })
    @ApiParam({ name: 'id', description: 'ID of the ProductAttachment link entry to delete', type: Number })
    @ApiResponse({ status: 204, description: 'Link deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Link not found.' })
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.productAttachmentsService.remove(id);
    }
  
    @Delete('unlink')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Unlink an attachment from a product using their respective IDs' })
    @ApiQuery({ name: 'productId', type: Number, description: 'ID of the NonConformingProduct' })
    @ApiQuery({ name: 'attachmentId', type: Number, description: 'ID of the NonConformityAttachment' })
    @ApiResponse({ status: 204, description: 'Link deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Link not found.' })
    removeByProductAndAttachment(
      @Query('productId', ParseIntPipe) productId: number,
      @Query('attachmentId', ParseIntPipe) attachmentId: number,
    ) {
      return this.productAttachmentsService.removeByProductAndAttachmentIds(productId, attachmentId);
    }
  }