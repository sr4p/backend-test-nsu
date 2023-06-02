import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn,DeleteDateColumn,JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

enum EStatusOrder {
  PENDING = 'pending',
  CONFIRM = 'confirm',
  CANCEL = 'cancel',
}


@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type : "enum", enum : EStatusOrder , default : EStatusOrder.PENDING })
  status: EStatusOrder;

  @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @ManyToOne(() => User,(user) => user.id,{ onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product,(product) => product.id,{ onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
