import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/transactions.dto';
import { Transaction } from 'typeorm';
import { PaginatedTransactions } from './pagination.interface';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getAll(
    @Query('category_id') category_id?: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('date') date?: string,
  ): Promise<PaginatedTransactions> {
    return this.transactionsService.getAll({
      category_id,
      date,
      limit,
      page,
    });
  }

  @Get('/total')
  asyncGetTotal() {
    return this.transactionsService.getTotal();
  }

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.transactionsService.remove(id);
  }
}
