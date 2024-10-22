import { Controller, Put, Body, Get, Post } from '@nestjs/common';

import { ConfigService } from './config.service';
import { UpdateConfigDto } from './dto/update-config.dto';

@Controller('config')
export class ConfigController {
  constructor(private readonly service: ConfigService) {}

  @Post('generate')
  async generateProject(@Body() config: any) {
    return this.service.createProject(config);
  }

  @Get()
  getModules() {
    return this.service.getConfig();
  }

  @Put()
  updateModules(@Body() newConfig: UpdateConfigDto) {
    try {
      this.service.updateConfig(newConfig);
      return { message: 'Configuração atualizada com sucesso.' };
    } catch (error) {
      return {
        message: 'Erro ao atualizar a configuração.',
        error: error.message,
      };
    }
  }
}
