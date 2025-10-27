import { ApiProperty } from '@nestjs/swagger';

export class CreateVacationRequestDto {
  @ApiProperty()
  request_date: Date;

  @ApiProperty()
  employee_code: string;

  @ApiProperty()
  years_worked: number;

  @ApiProperty()
  vacation_hours: number;

  @ApiProperty()
  vacation_start_date: Date;

  @ApiProperty()
  vacation_end_date: Date;

  @ApiProperty()
  half_day_vacation: boolean;

  @ApiProperty()
  vacation_period: string;

  @ApiProperty({ enum: ['pending', 'approved', 'rejected', 'register', 'empty'] })
  status: 'pending' | 'approved' | 'rejected' | 'register' | 'empty';

  @ApiProperty()
  requester: string;

  @ApiProperty()
  immediate_supervisor_approved: boolean;

  @ApiProperty()
  process_manager_approved: boolean;

  @ApiProperty()
  pending_days: number;

  @ApiProperty()
  current_days: number;

  @ApiProperty()
  calculated_days: number;

  @ApiProperty()
  process_manageruser_by: string;

  @ApiProperty({ required: false })
  process_manager_at?: Date;

  @ApiProperty()
  superviso_by: string;

  @ApiProperty({ required: false })
  superviso_at?: Date;
}