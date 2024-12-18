import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsString({
    message: 'Name must be a string',
  })
  name: string;

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
}
