import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from './Review';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  title!: string;

  @OneToMany(() => Review, (review) => review.book)
  reviews!: Review[];
}