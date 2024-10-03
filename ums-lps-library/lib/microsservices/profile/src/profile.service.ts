import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { EditPersonalDataDto } from './dto/edit-profile.dto';
import { UserJwtInterface } from './interfaces/user-jwt.interface';

@Injectable()
export class ProfileService {
  // async update(data: EditPersonalDataDto): Promise<{
  //   user: UserJwtInterface;
  //   accessToken: string;
  //   message: string;
  // }> {
  //   try {
  //     let user = await this.userRepository.findOneOrFail({
  //       where: { id: data.id },
  //       relations: ['roles'],
  //       select: ['id', 'name', 'email', 'cpf', 'password', 'register'],
  //     });
  //     if (data.password && data.newPassword && data.confirmPassword) {
  //       if (!(await user.checkPassword(data.password))) {
  //         throw new UnauthorizedException('A senha atual está incorreta.');
  //       }
  //       data.password = await user.updatePassword(data.newPassword);
  //     } else {
  //       delete data.newPassword;
  //       delete data.newPassword;
  //       delete data.confirmPassword;
  //     }
  //     const entity = Object.assign(new UserEntity(), {
  //       ...data,
  //       id: user.id,
  //     });
  //     await this.userRepository.save(entity);
  //     user = await this.userRepository.findOne({
  //       where: { id: user.id },
  //       relations: ['roles'],
  //       select: ['id', 'name', 'email', 'cpf', 'password', 'register'],
  //     });
  //     delete user.password;
  //     const { accessToken, payload } =
  //       await this.authenticationService.signToken(user);
  //     await this.userRepository.update(user.id, { lastAccess: new Date() });
  //     return {
  //       user: payload,
  //       accessToken,
  //       message: 'Dados alterados com sucesso!',
  //     };
  //   } catch (error) {
  //     if (error instanceof UnauthorizedException) {
  //       throw error;
  //     }
  //     throw new HttpException(
  //       { message: 'Não foi possível editar os dados pessoais.' },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
}
