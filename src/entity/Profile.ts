import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn("increment")
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @OneToMany(() => User, (user) => user.profile)
  users!: User[];
}
