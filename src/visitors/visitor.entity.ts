import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum VisitorStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('visitors')
export class Visitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  unitNumber: string;

  @Column({ type: 'datetime' })
  visitDate: Date;

  @Column({
    type: 'enum',
    enum: VisitorStatus,
    default: VisitorStatus.PENDING,
  })
  status: VisitorStatus;

  @CreateDateColumn()
  createdAt: Date;
}