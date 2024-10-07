import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';

export class ConfigService {
  private configFilePath = path.join(__dirname,'..','..', 'src', 'config', 'modules-config.json');
  getConfig() {
    try {
      const config = fs.readFileSync(this.configFilePath, 'utf-8');
      return JSON.parse(config);
    } catch (error) {
      console.error('Erro ao ler o arquivo de configuração:', error);
      throw error;
    }
  }

  updateConfig(newConfig: any) {
    try {
      fs.writeFileSync(this.configFilePath, JSON.stringify(newConfig, null, 2));
      console.log('Arquivo de configuração atualizado com sucesso.');
      this.restartApplication();
    } catch (error) {
      console.error('Erro ao atualizar o arquivo de configuração:', error);
      throw error; 
    }
  }

  private restartApplication() {
    exec('npm run start:dev', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao reiniciar a aplicação: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }
}
