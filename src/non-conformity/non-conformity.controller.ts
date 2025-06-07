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
  import { NonConformityService } from './non-conformity.service';
  import { CreateCauseNonconformityDto } from './dto/create-cause-nonconformity.dto';
  import { UpdateCauseNonconformityDto } from './dto/update-cause-nonconformity.dto';
  import { CreateNonConformingProductDto } from './dto/create-non-conforming-product.dto';
  import { UpdateNonConformingProductDto } from './dto/update-non-conforming-product.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
  
  @ApiTags('Non-Conformity')
  @Controller('non-conformity')
  export class NonConformityController {
    constructor(private readonly nonConformityService: NonConformityService) {}
  
    // --- CauseNonconformity Endpoints ---
    @Post('causes')
    @ApiOperation({ summary: 'Create a new cause of non-conformity' })
    @ApiResponse({ status: 201, description: 'The cause has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    createCause(@Body() createDto: CreateCauseNonconformityDto) {
      return this.nonConformityService.createCauseNonconformity(createDto);
    }
  
    @Get('causes')
    @ApiOperation({ summary: 'Get all causes of non-conformity' })
    @ApiResponse({ status: 200, description: 'List of all causes.'})
    findAllCauses() {
      return this.nonConformityService.findAllCauseNonconformities();
    }
  
    @Get('causes/:id')
    @ApiOperation({ summary: 'Get a cause of non-conformity by ID' })
    @ApiParam({ name: 'id', description: 'ID of the cause non-conformity', type: Number })
    @ApiResponse({ status: 200, description: 'The cause details.'})
    @ApiResponse({ status: 404, description: 'Cause not found.'})
    findOneCause(@Param('id', ParseIntPipe) id: number) {
      return this.nonConformityService.findOneCauseNonconformity(id);
    }
  
    @Put('causes/:id')
    @ApiOperation({ summary: 'Update a cause of non-conformity' })
    @ApiParam({ name: 'id', description: 'ID of the cause non-conformity to update', type: Number })
    @ApiResponse({ status: 200, description: 'The cause has been successfully updated.'})
    @ApiResponse({ status: 404, description: 'Cause not found.'})
    updateCause(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateDto: UpdateCauseNonconformityDto,
    ) {
      return this.nonConformityService.updateCauseNonconformity(id, updateDto);
    }
  
    @Delete('causes/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a cause of non-conformity' })
    @ApiParam({ name: 'id', description: 'ID of the cause non-conformity to delete', type: Number })
    @ApiResponse({ status: 204, description: 'The cause has been successfully deleted.'})
    @ApiResponse({ status: 404, description: 'Cause not found.'})
    removeCause(@Param('id', ParseIntPipe) id: number) {
      return this.nonConformityService.removeCauseNonconformity(id);
    }
  
    // --- NonConformingProduct Endpoints ---
    @Post('products')
    @ApiOperation({ summary: 'Create a new non-conforming product' })
    @ApiResponse({ status: 201, description: 'The product has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    createProduct(@Body() createDto: CreateNonConformingProductDto) {
      return this.nonConformityService.createNonConformingProduct(createDto);
    }
  
    @Get('products')
    @ApiOperation({ summary: 'Get all non-conforming products' })
    @ApiResponse({ status: 200, description: 'List of all non-conforming products.'})
    findAllProducts() {
      return this.nonConformityService.findAllNonConformingProducts();
    }
  
    @Get('products/:id')
    @ApiOperation({ summary: 'Get a non-conforming product by ID' })
    @ApiParam({ name: 'id', description: 'ID of the non-conforming product', type: Number })
    @ApiResponse({ status: 200, description: 'The non-conforming product details.'})
    @ApiResponse({ status: 404, description: 'Product not found.'})
    findOneProduct(@Param('id', ParseIntPipe) id: number) {
      return this.nonConformityService.findOneNonConformingProduct(id);
    }
  
    @Put('products/:id')
    @ApiOperation({ summary: 'Update a non-conforming product' })
    @ApiParam({ name: 'id', description: 'ID of the non-conforming product to update', type: Number })
    @ApiResponse({ status: 200, description: 'The product has been successfully updated.'})
    @ApiResponse({ status: 404, description: 'Product not found.'})
    updateProduct(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateDto: UpdateNonConformingProductDto,
    ) {
      return this.nonConformityService.updateNonConformingProduct(id, updateDto);
    }
  
    @Delete('products/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a non-conforming product' })
    @ApiParam({ name: 'id', description: 'ID of the non-conforming product to delete', type: Number })
    @ApiResponse({ status: 204, description: 'The product has been successfully deleted.'})
    @ApiResponse({ status: 404, description: 'Product not found.'})
    removeProduct(@Param('id', ParseIntPipe) id: number) {
      return this.nonConformityService.removeNonConformingProduct(id);
    }
  }