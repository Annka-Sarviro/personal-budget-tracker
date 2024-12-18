import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}
  async findAll() {
    return await this.categoryRepo.find();
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(createCategoryDto);
    return await this.categoryRepo.save(newCategory);
  }
}
