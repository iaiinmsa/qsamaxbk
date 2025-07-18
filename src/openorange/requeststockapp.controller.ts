/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { RequeststockappService } from './requeststockapp.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller()
export class RequeststockappController { 
     constructor(private readonly requisitionService: RequeststockappService) {}


 @Get('requisitions/:department')
 @ApiOperation({ summary: 'Get all request fro deparments' })
 @ApiResponse({ status: 200, description: 'List of all request stock deparment open orange.'})
getPending(@Param('department') dept: string,
 @Query('offset') offset = '0',
  @Query('limit') limit = '20'

) 

{

  const offsetNumber = parseInt(offset);
  const limitNumber = parseInt(limit);

  return this.requisitionService.getPendingRequisitionsByDepartment(dept,  offsetNumber, limitNumber);
}


@Get('requisitionsdetail/:id')
@ApiOperation({ summary: 'detail requisition' })
@ApiResponse({ status: 200, description: 'show requisition detail open orange.'})
RequisitionDetailShow(@Param('id') id: string,

) 

{
  const requsitionid = parseInt(id);
 return this.requisitionService.RequisitionDetailShow(requsitionid  );
}




@Get('user/:user')
@ApiOperation({ summary: 'user department' })
@ApiResponse({ status: 200, description: 'show user department open orange.'})
UserDepartmentShow(@Param('user') dept: string,

) 

{

 return this.requisitionService.UserDepartmentShow(dept  );
}



@Get('workordershow')
@ApiOperation({ summary: 'Get all op from work orders' })
@ApiResponse({ status: 200, description: 'List of all work orders open orange.' })
async workordershow() {
  return this.requisitionService.workordershow();
}

@Patch('approve/:id')
@ApiParam({ name: 'id', type: Number, description: 'ID de la requisición' })
@ApiBody({ schema: { properties: { authorizedBy: { type: 'string' } } } })
async approveRequisition(
  @Param('id') id: number,
  @Body('authorizedBy') authorizedBy: string,
) {
  return this.requisitionService.approveRequisition(id, authorizedBy);
}


}
