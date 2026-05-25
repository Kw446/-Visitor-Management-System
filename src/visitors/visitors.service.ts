import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visitor, VisitorStatus } from './visitor.entity';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectRepository(Visitor)
    private visitorRepo: Repository<Visitor>,
  ) {}

  async create(dto: CreateVisitorDto) {
    const visitor = this.visitorRepo.create({
      ...dto,
      visitDate: new Date(dto.visitDate),
    });
    const savedVisitor = await this.visitorRepo.save(visitor);
    return { message: 'Visitor created successfully', data: savedVisitor };
  }

  async findAll() {
    const visitors = await this.visitorRepo.find();
    return { message: 'Visitors fetched successfully', data: visitors };
  }

  async findOne(id: number) {
    const visitor = await this.visitorRepo.findOne({ where: { id } });
    if (!visitor) throw new NotFoundException(`Visitor #${id} not found`);
    return { message: 'Visitor fetched successfully', data: visitor };
  }

  async update(id: number, dto: UpdateVisitorDto) {
    const visitor = await this.visitorRepo.findOne({ where: { id } });
    if (!visitor) throw new NotFoundException(`Visitor #${id} not found`);
    Object.assign(visitor, {
      ...dto,
      visitDate: dto.visitDate ? new Date(dto.visitDate) : visitor.visitDate,
    });
    const updatedVisitor = await this.visitorRepo.save(visitor);
    return { message: 'Visitor data updated successfully', data: updatedVisitor };
  }

  async remove(id: number) {
    const visitor = await this.visitorRepo.findOne({ where: { id } });
    if (!visitor) throw new NotFoundException(`Visitor #${id} not found`);
    await this.visitorRepo.remove(visitor);
    return { message: 'Visitor deleted successfully', data: null };
  }

  async approve(id: number) {
    const visitor = await this.visitorRepo.findOne({ where: { id } });
    if (!visitor) throw new NotFoundException(`Visitor #${id} not found`);
    visitor.status = VisitorStatus.APPROVED;
    const approvedVisitor = await this.visitorRepo.save(visitor);
    return { message: 'Visitor approved successfully', data: approvedVisitor };
  }
}