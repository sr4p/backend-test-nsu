import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,BeforeInsert, UpdateDateColumn,DeleteDateColumn,JoinColumn, ManyToOne, Repository } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { ProductService } from 'module/product/product.service';

export enum EStatusOrder {
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

  @Column({ type: "varchar", length: 10 })
  order_number: string;

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

  // private orderRepository: Repository<Order>
  // @BeforeInsert()
  // async orderRunningNumber(): Promise<void> {
  //   const { running_number } = await this.orderRepository.createQueryBuilder()
  //     .select([
  //       `concat(EXTRACT(YEAR FROM CURRENT_DATE)::VARCHAR,EXTRACT(MONTH FROM CURRENT_DATE)::VARCHAR,LPAD((COUNT(*)+1)::text, 5, '0')) as running_number`
  //     ])
  //     .getRawOne();
  //   this.order_number = running_number
  // }
}
