import {
  IsNotEmpty,
  IsString,
  IsIn,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty({
    message: 'amount is required',
  })
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty({
    message: 'type is required',
  })
  @IsString({
    message: 'type must be a string',
  })
  @IsIn(['income', 'expense'], {
    message: 'Type must be either "income" or "expense"',
  })
  type: 'income' | 'expense';

  @IsNotEmpty({
    message: 'description is required',
  })
  @IsString({
    message: 'description must be a string',
  })
  description: string;

  @IsNotEmpty({
    message: 'category id is required',
  })
  @IsNumber()
  category_id: number;
}
