import { ApiProperty } from '@nestjs/swagger';

export class CreateVacationRequestDto {
  @ApiProperty({ description: 'Date of the request (YYYY-MM-DD)' })
  request_date: string;

  @ApiProperty({ description: 'Employee code' })
  employee_code: string;

  @ApiProperty({ description: 'Years worked by the employee' })
  years_worked: number;

  @ApiProperty({ description: 'Total vacation hours requested', example: 8.00 })
  vacation_hours: number;

  @ApiProperty({ description: 'Start date of the vacation (YYYY-MM-DD)' })
  vacation_start_date: string;

  @ApiProperty({ description: 'End date of the vacation (YYYY-MM-DD)' })
  vacation_end_date: string;

  @ApiProperty({ description: 'If the vacation is only a half-day', default: false })
  half_day_vacation: boolean;

  @ApiProperty({ description: 'Vacation period (e.g., 2025-2026)' })
  vacation_period: string;

  @ApiProperty({ 
    description: 'Request status', 
    enum: ['pending', 'approved', 'rejected', 'register', ''],
    default: 'register'
  })
  status: 'pending' | 'approved' | 'rejected' | 'register' | '';

  @ApiProperty({ description: 'Name of the person requesting the vacation' })
  requester: string;

  @ApiProperty({ description: 'Whether the immediate supervisor approved the request', default: false })
  immediate_supervisor_approved: boolean;

  @ApiProperty({ description: 'Whether the process manager approved the request', default: false })
  process_manager_approved: boolean;

  @ApiProperty({ description: 'Remaining vacation days', example: 5.00 })
  pending_days: number;

  @ApiProperty({ description: 'Current available vacation days', example: 10.00 })
  current_days: number;

  @ApiProperty({ description: 'Number of days calculated for this request', example: 3.00 })
  calculated_days: number;

  @ApiProperty({ description: 'Username of the process manager who approved' })
  process_manageruser_by: string;

  @ApiProperty({ description: 'Date and time the process manager approved the request', required: false })
  process_manager_at?: Date;

  @ApiProperty({ description: 'Username of the supervisor who approved' })
  superviso_by: string;

  @ApiProperty({ description: 'Date and time the supervisor approved the request', required: false })
  superviso_at?: Date;
}
