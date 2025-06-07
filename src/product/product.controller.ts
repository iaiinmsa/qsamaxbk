import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { ProductService } from './product.service';
  import { CreateProductDto } from './dto/create-product.dto';
  import { UpdateProductDto } from './dto/update-product.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
  
  @ApiTags('Products')
  @Controller('products')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'The product has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    create(@Body() createDto: CreateProductDto) {
      return this.productService.create(createDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'List of all products.'})
    findAll() {
      return this.productService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a product by ID' })
    @ApiParam({ name: 'id', description: 'ID of the product', type: Number })
    @ApiResponse({ status: 200, description: 'The product details.'})
    @ApiResponse({ status: 404, description: 'Product not found.'})
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.productService.findOne(id);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update a product' })
    @ApiParam({ name: 'id', description: 'ID of the product to update', type: Number })
    @ApiResponse({ status: 200, description: 'The product has been successfully updated.'})
    @ApiResponse({ status: 404, description: 'Product not found.'})
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateDto: UpdateProductDto,
    ) {
      return this.productService.update(id, updateDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a product' })
    @ApiParam({ name: 'id', description: 'ID of the product to delete', type: Number })
    @ApiResponse({ status: 204, description: 'The product has been successfully deleted.'})
    @ApiResponse({ status: 404, description: 'Product not found.'})
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.productService.remove(id);
    }
  }