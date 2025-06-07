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
  import { DispositionService } from './disposition.service';
  import { CreateDispositionDto } from './dto/create-disposition.dto';
  import { UpdateDispositionDto } from './dto/update-disposition.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
  
  @ApiTags('Dispositions')
  @Controller('dispositions')
  export class DispositionController {
    constructor(private readonly dispositionService: DispositionService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new disposition' })
    @ApiResponse({ status: 201, description: 'The disposition has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    create(@Body() createDto: CreateDispositionDto) {
      return this.dispositionService.create(createDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all dispositions' })
    @ApiResponse({ status: 200, description: 'List of all dispositions.'})
    findAll() {
      return this.dispositionService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a disposition by ID' })
    @ApiParam({ name: 'id', description: 'ID of the disposition', type: Number })
    @ApiResponse({ status: 200, description: 'The disposition details.'})
    @ApiResponse({ status: 404, description: 'Disposition not found.'})
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.dispositionService.findOne(id);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update a disposition' })
    @ApiParam({ name: 'id', description: 'ID of the disposition to update', type: Number })
    @ApiResponse({ status: 200, description: 'The disposition has been successfully updated.'})
    @ApiResponse({ status: 404, description: 'Disposition not found.'})
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateDto: UpdateDispositionDto,
    ) {
      return this.dispositionService.update(id, updateDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a disposition' })
    @ApiParam({ name: 'id', description: 'ID of the disposition to delete', type: Number })
    @ApiResponse({ status: 204, description: 'The disposition has been successfully deleted.'})
    @ApiResponse({ status: 404, description: 'Disposition not found.'})
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.dispositionService.remove(id);
    }
  }