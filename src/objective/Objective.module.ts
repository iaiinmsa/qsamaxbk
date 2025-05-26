/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ObjectiveService } from './objective.service';

import { ObjectiveController } from './Objective.controller'; // Corregido



@Module({
    imports: [ ],
    controllers: [ ObjectiveController],
    providers: [ ObjectiveService],
})
export class ObjectiveModule { }
