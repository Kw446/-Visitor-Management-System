import { IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { VisitorStatus } from '../visitor.entity';

export class CreateVisitorDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  unitNumber: string;

  @IsDateString()
  visitDate: string;

  @IsOptional()
  @IsEnum(VisitorStatus)
  status?: VisitorStatus;
}