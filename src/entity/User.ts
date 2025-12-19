import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import { Profile } from './Profile';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  cpf!: string;
  
  @Column({ type: 'varchar', length: 255, nullable: false })
  passwordHash!: string;

  @Column({ type: 'int', nullable: true })
  profileId!: string | null;
  
  @ManyToOne(() => Profile, (profile) => profile.users, { nullable: true })
  @JoinColumn({ name: 'profileId' })
  profile!: Profile | null;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', length: 16, nullable: true })
  status!: string | null;
  
  @CreateDateColumn({ type: 'timestamp', })
  createdAt!: Date;
  
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @BeforeInsert()
  async hashPassword() {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }
}