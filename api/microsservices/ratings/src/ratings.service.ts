import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RatingEntity } from './entities/rating.entity';
import { RatingCreateDto } from './dto/create-rating.dto';
import { RatingInterface } from './interfaces/rating.interface';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingsRepository: Repository<RatingEntity>,
  ) {}

  async create(data: RatingCreateDto): Promise<{ rating: RatingInterface; message: string }> {
    try {
      const entity = Object.assign(new RatingEntity(), data);
      const rating = await this.ratingsRepository.save(entity);

      return { rating, message: 'Avaliação criada com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: `Não foi possível criar a avaliação. ${error}` }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByMenuMealId(menuMealId: number): Promise<RatingInterface[]> {
    if (!menuMealId) {
      throw new HttpException({ message: 'O ID do cardápio não foi fornecido.' }, HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.ratingsRepository.find({
        where: { menuMealId },
        order: { date: 'ASC' },
      });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar as avaliações.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      console.log('ID', id);
      await this.ratingsRepository.delete({ id });

      return { message: 'Avaliação foi removida com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: `Não foi possível excluir a avaliação. ${error}` }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
