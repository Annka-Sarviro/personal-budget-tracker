import { Category } from 'src/categories/entities/categories.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'Transactions' })
export class Transaction {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: number;

  @Column({ type: 'varchar' })
  type: 'income' | 'expense';

  @Column()
  description: string;

  @Column()
  category_id: number;

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
