import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateObjectiveDto } from './dto/CreateObjective.dto';
import { ObjectiveGoalUpdateInput } from './dto/ObjectiveGoalUpdateInput.dto';
import { ObjectiveGoalCreateInput } from './dto/ObjectiveGoalCreateInput.dto';
import { ObjectiveUpdateInput } from './dto/ObjectiveUpdateInput.dto';

@Injectable()
export class ObjectiveService {
  constructor(private prisma: PrismaService) {}

  // Get all Objectives with related ObjectiveGoals
  async getAllObjectives() {
    return this.prisma.objective.findMany({
      include: {
        objectiveGoal: true, // Include related ObjectiveGoals
      },
    });
  }

  // Create a new Objective
  async createObjective(data: CreateObjectiveDto) {
    try {
      return await this.prisma.objective.create({
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Objective already exists with the same unique field.');
      }
      throw error;
    }
  }

  // Update an Objective by ID
  async updateObjective(id: number, data: ObjectiveUpdateInput) {
    return this.prisma.objective.update({
      where: { id },
      data,
    });
  }

  // Delete an Objective by ID
  async deleteObjective(id: number) {
    return this.prisma.objective.delete({
      where: { id },
    });
  }

  // Get all ObjectiveGoals
  async getAllObjectiveGoals() {
    return this.prisma.objectiveGoal.findMany({
      include: {
        objective: true, // Include related Objective
      },
    });
  }


    // Get ObjectiveGoals by Objective ID
    async getObjectiveGoalsByObjectiveId(objectiveId: number) {
        const objectiveGoals = await this.prisma.objectiveGoal.findMany({
          where: {
            idObjective: objectiveId,
          },
          include: {
            objective: true, // Optionally include the parent objective details
          },
        });
    
        // Helper function or array to map month number to name
        const monthNames = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
    
        return objectiveGoals.map(goal => {
            let monthText: string | null = null;
          if (goal.month !== null && goal.month >= 1 && goal.month <= 12) {
            monthText = monthNames[goal.month - 1]; // Subtract 1 because array is 0-indexed
          }
          return {
            ...goal,
            month: monthText, // Replace the numeric month with its text representation
          };
        });
      }
  // Get an Objective by ID


  async getObjectiveById(id: number) {
    return this.prisma.objective.findUnique({
      where: { id },
      include: {
        objectiveGoal: true, // Include related ObjectiveGoals
      },
    });
  } 

    // Get Objectives by Department ID
    async getObjectivesByDepartmentId(departmentId: number) {
        return this.prisma.objective.findMany({
          where: { departmentId },
          include: {
            objectiveGoal: true, // Include related ObjectiveGoals
          },
        });
      }

  // Create a new ObjectiveGoal
  async createObjectiveGoal(data: ObjectiveGoalCreateInput) {
    try {
      return await this.prisma.objectiveGoal.create({
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('ObjectiveGoal already exists with the same unique field.');
      }
      throw error;
    }
  }

  // Update an ObjectiveGoal by ID
  async updateObjectiveGoal(idObjgoal: number, data: ObjectiveGoalUpdateInput ) {
    return this.prisma.objectiveGoal.update({
      where: { idObjgoal },
      data,
    });
  }

  // Delete an ObjectiveGoal by ID
  async deleteObjectiveGoal(idObjgoal: number) {
    return this.prisma.objectiveGoal.delete({
      where: { idObjgoal },
    });
  }
}