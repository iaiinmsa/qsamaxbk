import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ObjectiveService } from './objective.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateObjectiveDto } from './dto/CreateObjective.dto';


import { ObjectiveGoalCreateInput } from './dto/ObjectiveGoalCreateInput.dto';
import { ObjectiveGoalUpdateInput } from './dto/ObjectiveGoalUpdateInput.dto';
import { ObjectiveUpdateInput } from './dto/ObjectiveUpdateInput.dto';


// ...existing code...
@ApiTags('Objectives')
@Controller('objectives')
export class ObjectiveController {
  constructor(private readonly objectiveService: ObjectiveService) {}

  @Get()
  @ApiOperation({ summary: 'Get all objectives' })
  @ApiResponse({ status: 200, description: 'List of all objectives.' })
  async findAll() {
    return this.objectiveService.getAllObjectives();
  }

  // Mover @Get('goals') ANTES de @Get(':id')
  @Get('goals')
  @ApiOperation({ summary: 'Get all objective goals' })
  @ApiResponse({ status: 200, description: 'List of all objective goals.' })
  async findAllGoals() {
    return this.objectiveService.getAllObjectiveGoals();
  }

  @Get('by-department/:departmentId')
  @ApiOperation({ summary: 'Get objectives by Department ID' })
  @ApiResponse({ status: 200, description: 'List of objectives for the given department.' })
  async findByDepartmentId(@Param('departmentId', ParseIntPipe) departmentId: number) {
    return this.objectiveService.getObjectivesByDepartmentId(departmentId);
  }

  @Get(':objectiveId/goals') // Esta ruta es más específica que :id debido al /goals
  @ApiOperation({ summary: 'Get all goals for a specific objective' })
  @ApiResponse({ status: 200, description: 'List of goals for the specified objective.' })
  @ApiResponse({ status: 404, description: 'Objective not found.' })
  async findGoalsForObjective(@Param('objectiveId', ParseIntPipe) objectiveId: number) {
    return this.objectiveService.getObjectiveGoalsByObjectiveId(objectiveId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an objective by ID' })
  @ApiResponse({ status: 200, description: 'The objective with the given ID.' })
  async findOne(@Param('id', ParseIntPipe) id: number) { // Asegúrate de usar ParseIntPipe aquí también
    return this.objectiveService.getObjectiveById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new objective' })
  @ApiResponse({ status: 201, description: 'The objective has been created.' })
  async create(@Body() data: CreateObjectiveDto) {
    return this.objectiveService.createObjective(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an objective by ID' })
  @ApiResponse({ status: 200, description: 'The updated objective.' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: ObjectiveUpdateInput) { // Asegúrate de usar ParseIntPipe
    return this.objectiveService.updateObjective(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an objective by ID' })
  @ApiResponse({ status: 200, description: 'The deleted objective.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.objectiveService.deleteObjective(id);
  }

  @Post('goal')
  @ApiOperation({ summary: 'Create a new objective goal' })
  @ApiResponse({ status: 201, description: 'The objective goal has been created.' })
  async createGoal(@Body() data: ObjectiveGoalCreateInput) {
    return this.objectiveService.createObjectiveGoal(data);
  }

  @Put('goal/:id')
  @ApiOperation({ summary: 'Update an objective goal by ID' })
  @ApiResponse({ status: 200, description: 'The updated objective goal.' })
  async updateGoal(@Param('id', ParseIntPipe) idObjgoal: number, @Body() data: ObjectiveGoalUpdateInput) { // Asegúrate de usar ParseIntPipe
    return this.objectiveService.updateObjectiveGoal(idObjgoal, data);
  }

  @Delete('goal/:id')
  @ApiOperation({ summary: 'Delete an objective goal by ID' })
  @ApiResponse({ status: 200, description: 'The deleted objective goal.' })
  async removeGoal(@Param('id', ParseIntPipe) idObjgoal: number) { // Asegúrate de usar ParseIntPipe
    return this.objectiveService.deleteObjectiveGoal(idObjgoal);
  }
}
// ...existing code...