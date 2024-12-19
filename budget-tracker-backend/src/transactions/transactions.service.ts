import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transactions.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/transactions.dto';
import { Category } from 'src/categories/entities/categories.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAll(filters: {
    category_id?: number;
    date?: string;
    page?: number;
    limit?: number;
  }): Promise<any> {
    const queryBuilder =
      this.transactionRepository.createQueryBuilder('transaction');

    if (filters.category_id) {
      const categoryExists = await this.categoryRepository.exist({
        where: { id: filters.category_id },
      });

      if (!categoryExists) {
        throw new NotFoundException(
          `Category with id ${filters.category_id} not found`,
        );
      }

      queryBuilder.andWhere('transaction.category_id = :category_id', {
        category_id: filters.category_id,
      });
    }

    if (filters.category_id) {
      queryBuilder.andWhere('transaction.category_id = :category_id', {
        category_id: filters.category_id,
      });
    }

    if (filters.date) {
      queryBuilder.andWhere('transaction.createdAt = :date', {
        date: filters.date,
      });
    }

    const page = filters.page || 1;
    const limit = filters.limit || 10;

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    queryBuilder.leftJoinAndSelect('transaction.category', 'category');

    const [transactions, total] = await queryBuilder.getManyAndCount();

    return {
      transactions,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    };
  }

  async create(createTransactionDto: CreateTransactionDto) {
    const { category_id } = createTransactionDto;
    const categoryExists = await this.categoryRepository.exist({
      where: { id: category_id },
    });

    if (!categoryExists) {
      throw new NotFoundException(`Category with id ${category_id} not found`);
    }
    const newTransaction =
      this.transactionRepository.create(createTransactionDto);
    return await this.transactionRepository.save(newTransaction);
  }

  async remove(id: number): Promise<void> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }

    await this.transactionRepository.remove(transaction);
  }
}
