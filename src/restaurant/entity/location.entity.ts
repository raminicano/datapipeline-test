import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doSi: string;

  @Column()
  sgg: string;

  @Column()
  lat: string;

  @Column()
  lon: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.location)
  restaurants: Restaurant[];
}
