
import { Entity, Column, PrimaryGeneratedColumn,OneToMany,CreateDateColumn,UpdateDateColumn,DeleteDateColumn,JoinColumn, BeforeInsert } from 'typeorm';
import { createHash , HashOptions } from "crypto";
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" , length: 100 })
  name: string;

  @Column({ type: "varchar" , length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", select: false })
  password: string;
  
  @OneToMany(() => Order, orderProduct => orderProduct.user)
  @JoinColumn([{ name: "id", referencedColumnName: "user_id" }])
  order: Order[];

  @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @BeforeInsert()
  hashPassword() : void {
    this.password = this.hash(this.password)
  }

  comparePassword(password: string): boolean {
    return this.hash(password) === this.password
  }

  hash(password:string) : string {
    return createHash('sha256', <HashOptions>process.env.SECRET_KEY).update(password).digest('hex');
  }
}