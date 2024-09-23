import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from './entities/comment.entity';
import { CommentCreateDto } from './dto/create-comment.dto';
import { CommentInterface } from './interfaces/comment.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
  ) {}

  async create(data: CommentCreateDto): Promise<{ comment: CommentInterface; message: string }> {
    try {
      const entity = Object.assign(new CommentEntity(), data);
      const comment = await this.commentsRepository.save(entity);

      return { comment, message: 'Comentário criado com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: `Não foi possível criar o comentário. ${error}` }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByMenuMealId(menuMealId: number): Promise<CommentInterface[]> {
    if (!menuMealId) {
      throw new HttpException({ message: 'O ID do cardápio não foi fornecido.' }, HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.commentsRepository.find({
        where: { menuMealId },
        order: { date: 'ASC' },
      });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar os cardápios.' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      console.log('ID', id);
      await this.commentsRepository.delete({ id });

      return { message: 'Comentário foi removido com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: `Não foi possível excluir o comentário. ${error}` }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
