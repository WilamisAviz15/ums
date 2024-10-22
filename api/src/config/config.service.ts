import { Injectable } from '@nestjs/common';
import { execSync, exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

import { ConfigInterface, SelectedModules } from './config.interface';

@Injectable()
export class ConfigService {
  private configFilePath = path.join(__dirname, '..', '..', 'src', 'config', 'modules-config.json');
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

  async createProject(config: ConfigInterface) {
    const { name, database, selectedModules } = config;
    console.log('Current working directory:', process.cwd());
    selectedModules.ActionModule = {
      active: true,
      name: 'actions',
      options: {},
    };
    selectedModules.MenusModule = {
      active: true,
      name: 'menus',
      options: {},
    };
    selectedModules.MenusGroupModule = {
      active: true,
      name: 'menus-group',
      options: {},
    };
    selectedModules.ProfileModule = {
      active: true,
      name: 'profile',
      options: {},
    };
    selectedModules.UserRoleModule = {
      active: true,
      name: 'users-roles',
      options: {},
    };
    selectedModules.SubMealsModule = {
      active: true,
      name: 'submeals',
      options: {},
    };
    selectedModules.MenusMealsModule = {
      active: true,
      name: 'menus-meals',
      options: {},
    };
    selectedModules.MealsUserRolesModule = {
      active: true,
      name: 'meals-user-roles',
      options: {},
    };

    // 1. Criar novo diretório do projeto dentro de "api"
    const newProjectPath = path.join(process.cwd(), name, 'api');
    fs.mkdirSync(newProjectPath, { recursive: true });

    // 2. Inicializar novo projeto NestJS no diretório "api"
    execSync(`nest new . --package-manager npm`, {
      cwd: newProjectPath, // Define o diretório de trabalho para o novo projeto
      stdio: 'inherit',
    });

    // 3. Caminho do projeto-base para copiar arquivos
    const basePath = path.join(process.cwd()); // Caminho para a raiz de api
    const newSrcPath = path.join(newProjectPath, 'src');

    // 4. Copiar arquivos principais para o novo projeto
    this.copyCoreFiles(basePath, newProjectPath);

    // 5. Copiar módulos selecionados
    this.copySelectedModules(basePath, newSrcPath, selectedModules, newProjectPath);

    // 6. Configurar MySQL no novo projeto
    this.configureDatabase(newProjectPath, database);

    // 7. Instalar dependências
    execSync(`cd ${newProjectPath} && npm install`, { stdio: 'inherit' });

    // Sobrescrever o arquivo de seed do RoleModule no microsserviço se estiver ativo
    if (selectedModules.RoleModule?.active) {
      this.overwriteRoleSeedFileInMicroservice(newProjectPath, selectedModules.RoleModule.options);
    }

    if (selectedModules.UserModule?.active) {
      this.overwriteUserSeedFileInMicroservice(newProjectPath, selectedModules.UserModule.options);
    }

    const filteredModules = {
      AuthenticationModule: selectedModules.AuthenticationModule,
      RoleModule: selectedModules.RoleModule,
      ScheduleModule: selectedModules.ScheduleModule,
      MealModule: selectedModules.MealModule,
      RatingModule: selectedModules.RatingModule,
      PaymentsModule: selectedModules.PaymentsModule,
    };
    const modulesConfigPath = path.join(newSrcPath, 'config', 'modules-config.json');

    fs.mkdirSync(path.dirname(modulesConfigPath), { recursive: true });

    // Escrever o conteúdo filtrado no arquivo
    fs.writeFileSync(modulesConfigPath, JSON.stringify(filteredModules, null, 2), 'utf8');

    this.copyReactFrontend(name, selectedModules);

    return {
      message: `Projeto ${name} criado com sucesso dentro de ${name}/api!`,
    };
  }

  private overwriteRoleSeedFileInMicroservice(newProjectPath: string, options: any) {
    // Caminho do arquivo role.seed.ts dentro do microsserviço de roles
    const roleSeedPath = path.join(newProjectPath, 'microsservices', 'roles', 'src', 'database', 'seeds', 'role.seed.ts');

    // Gera a lista de roles com base nas opções selecionadas
    const roles = Object.keys(options)
      .filter((role) => options[role]) // Filtra apenas as opções que estão com valor `true`
      .map((role, index) => {
        return `{ id: ${index + 1}, name: '${role.charAt(0).toUpperCase() + role.slice(1)}' }`;
      });

    // Conteúdo dinâmico do arquivo seed
    const seedContent = `
      import { Seeder } from 'typeorm-extension';
      import { DataSource } from 'typeorm';
      import { RoleEntity } from '../../entities/role.entity';

      export class RolesSeed implements Seeder {
        public async run(dataSource: DataSource): Promise<any> {
          const repository = dataSource.getRepository(RoleEntity);
          await repository.insert([
            ${roles.join(',\n')}
          ]);
        }
      }
    `;

    // Sobrescreve o arquivo role.seed.ts
    fs.writeFileSync(roleSeedPath, seedContent);
    console.log(`Arquivo ${roleSeedPath} sobrescrito com sucesso.`);
  }

  private overwriteUserSeedFileInMicroservice(newProjectPath: string, options: any) {
    const userSeedPath = path.join(newProjectPath, 'microsservices', 'users', 'src', 'database', 'seeds', 'users.seed.ts');

    const users = [];

    if (options.administrador) {
      users.push(`
        {
          id: 1,
          name: 'Administrador',
          email: 'adm@nti.ufal.br',
          cpf: '11111111111',
          password: '$2b$10$djde7iddrPX7b2aGXOrK5OkkPNaT2h95fy.R613MtSnEThecFJ3Oa',
          register: '11111111',
        }
      `);
    }

    if (options.gestor) {
      users.push(`
        {
          id: 2,
          name: 'Gestor Geral',
          email: 'adm2@nti.ufal.br',
          cpf: '22222222222',
          password: '$2b$10$djde7iddrPX7b2aGXOrK5OkkPNaT2h95fy.R613MtSnEThecFJ3Oa',
          register: '22222222',
        }
      `);
    }

    // Se houver outros usuários a serem adicionados, você pode continuar com a lógica aqui.

    const seedContent = `
      import { Seeder } from 'typeorm-extension';
      import { DataSource } from 'typeorm';
      import { UserEntity } from '../../entities/user.entity';
  
      export class UsersSeed implements Seeder {
        public async run(dataSource: DataSource): Promise<any> {
          const repository = dataSource.getRepository(UserEntity);
          await repository.insert([
            ${users.join(',\n')}
          ]);
        }
      }
    `;

    fs.writeFileSync(userSeedPath, seedContent);
    console.log(`Arquivo ${userSeedPath} sobrescrito com sucesso.`);
  }

  private copyCoreFiles(basePath: string, newProjectPath: string) {
    const filesToCopy = [
      '.gitignore',
      '.env',
      '.eslintrc.js',
      '.prettierrc',
      'nest-cli.json',
      'package.json',
      'tsconfig.build.json',
      'tsconfig.json',
      path.join('src', 'main.ts'),
      path.join('src', 'app.module.ts'),
    ];

    const foldersToCopy = ['src/constants', 'src/environment', 'src/shared', 'src/config'];

    // Copiar arquivo .env da raiz de api
    const sourceEnvFile = path.join(basePath, '.env');
    const destinationEnvFile = path.join(newProjectPath, '.env');
    if (fs.existsSync(sourceEnvFile)) {
      fs.copyFileSync(sourceEnvFile, destinationEnvFile);
    } else {
      console.warn(`Arquivo não encontrado: ${sourceEnvFile}`);
    }

    // Copiar arquivos principais
    for (const file of filesToCopy) {
      const sourceFile = path.join(basePath, file);
      const destinationFile = path.join(newProjectPath, file); // Corrigido para apontar para o novo projeto
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, destinationFile);
      } else {
        console.warn(`Arquivo não encontrado: ${sourceFile}`);
      }
    }

    // Copiar pastas principais
    for (const folder of foldersToCopy) {
      const sourceFolder = path.join(basePath, folder);
      const destinationFolder = path.join(newProjectPath, folder); // Corrigido para apontar para o novo projeto
      if (fs.existsSync(sourceFolder)) {
        fs.mkdirSync(destinationFolder, { recursive: true }); // Cria a pasta de destino se não existir
        this.copyDirectory(sourceFolder, destinationFolder); // Chamada para copiar a pasta e seu conteúdo
      } else {
        console.warn(`Pasta não encontrada: ${sourceFolder}`);
      }
    }
  }

  private copyDirectory(source: string, destination: string) {
    const entries = fs.readdirSync(source, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(source, entry.name);
      const destPath = path.join(destination, entry.name);

      // Ignorar as pastas 'node_modules' e 'dist'
      if (entry.name === 'node_modules' || entry.name === 'dist') {
        console.log(`Ignorando pasta: ${entry.name}`);
        continue; // Pula a pasta
      }

      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true }); // Cria a pasta de destino
        this.copyDirectory(srcPath, destPath); // Copia recursivamente a pasta
      } else {
        fs.copyFileSync(srcPath, destPath); // Copia o arquivo
      }
    }
  }

  private copySelectedModules(basePath: string, newSrcPath: string, selectedModules: SelectedModules, newProjectPath?: string) {
    const modulesPath = path.join(basePath, 'src', 'modules'); // Ajustar para o caminho correto dos módulos
    const microservicesPath = path.join(basePath, 'microsservices');
    const ignoredModulesForMicroservices = ['submeals', 'menus-group', 'menus-meals', 'meals-user-roles'];

    for (const [moduleName, moduleConfig] of Object.entries(selectedModules)) {
      if (moduleConfig.active) {
        const moduleFolderName = moduleConfig.name.toLowerCase(); // Pega o valor da propriedade "name"
        const moduleFolder = path.join(modulesPath, moduleFolderName);
        const destinationFolder = path.join(newSrcPath, 'modules', moduleFolderName);
        // Caminho para o módulo em api/microsservices
        const moduleFolderMicroservices = path.join(microservicesPath, moduleFolderName);
        // Caminho de destino para api/microsservices
        const destinationFolderMicroservices = path.join(newProjectPath, 'microsservices', moduleFolderName);

        if (fs.existsSync(moduleFolder)) {
          fs.mkdirSync(destinationFolder, { recursive: true }); // Cria a pasta de destino se não existir
          this.copyDirectory(moduleFolder, destinationFolder); // Chama a função para copiar o módulo
        } else {
          console.warn(`Módulo não encontrado: ${moduleFolder}`);
        }

        if (!ignoredModulesForMicroservices.includes(moduleFolderName)) {
          // Copiar módulos de api/microsservices
          if (fs.existsSync(moduleFolderMicroservices)) {
            fs.mkdirSync(destinationFolderMicroservices, { recursive: true });
            this.copyDirectory(moduleFolderMicroservices, destinationFolderMicroservices); // Copia para api/microsservices
          } else {
            console.warn(`Módulo não encontrado: ${moduleFolderMicroservices}`);
          }
        }
      }
    }
  }

  private configureDatabase(newProjectPath: string, databaseName: string) {
    const envPath = path.join(newProjectPath, '.env');
    const envContent = `DATABASE_TYPE=mysql\nDATABASE_NAME=${databaseName}\nDATABASE_HOST=localhost\nDATABASE_PORT=3306\nDATABASE_USER=root\nDATABASE_PASSWORD=root`;

    fs.writeFileSync(envPath, envContent);
  }

  private copyReactFrontend(newProjectName: string, selectedModules: SelectedModules) {
    // Caminhos
    const basePath = path.join(process.cwd());
    const frontBasePath = path.join(basePath, '..', 'front'); // Caminho do front-end
    const newFrontPath = path.join(process.cwd(), newProjectName, 'front');

    // 1. Criar a pasta 'front' no novo projeto
    fs.mkdirSync(newFrontPath, { recursive: true });

    // 2. Arquivos a serem copiados
    const filesToCopy = ['.gitignore', 'package-lock.json', 'package.json', 'README.md', 'tsconfig.json'];

    // 3. Copiar arquivos principais
    for (const file of filesToCopy) {
      const sourceFile = path.join(frontBasePath, file);
      const destinationFile = path.join(newFrontPath, file);
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, destinationFile);
      } else {
        console.warn(`Arquivo não encontrado: ${sourceFile}`);
      }
    }

    // 4. Criar as pastas e copiar diretórios comuns
    const foldersToCopy = ['assets', 'components', 'decorators', 'environments', 'routes', 'shared'];

    const frontSrcPath = path.join(frontBasePath, 'src');
    const newFrontSrcPath = path.join(newFrontPath, 'src');
    fs.mkdirSync(newFrontSrcPath, { recursive: true }); // Certificar que a pasta 'src' foi criada

    for (const folder of foldersToCopy) {
      const sourceFolder = path.join(frontSrcPath, folder);
      const destinationFolder = path.join(newFrontSrcPath, folder);
      if (fs.existsSync(sourceFolder)) {
        fs.mkdirSync(destinationFolder, { recursive: true }); // Criar a pasta antes de copiar
        this.copyDirectory(sourceFolder, destinationFolder);
      } else {
        console.warn(`Pasta não encontrada: ${sourceFolder}`);
      }
    }

    // 5. Módulos a serem ignorados
    const ignoredModules = ['MealsUserRolesModule', 'SubMealsModule', 'MenusMealsModule', 'UserRoleModule', 'MenusGroupModule', 'PaymentsModule', 'AuthenticationModule'];

    // 6. Copiar a pasta 'pages' (módulos selecionados e não ignorados + pastas extras)
    const pagesFolder = path.join(frontSrcPath, 'pages');
    const newPagesFolder = path.join(newFrontSrcPath, 'pages');
    fs.mkdirSync(newPagesFolder, { recursive: true });

    // Pastas extras a serem copiadas (independente de selectedModules)
    const extraPagesToCopy = ['auth', 'config', 'confirm-meal', 'home', 'menu-meal', 'menus-groups', 'metrics'];

    for (const page of extraPagesToCopy) {
      const sourcePageFolder = path.join(pagesFolder, page);
      const destinationPageFolder = path.join(newPagesFolder, page);
      if (fs.existsSync(sourcePageFolder)) {
        fs.mkdirSync(destinationPageFolder, { recursive: true }); // Criar a pasta antes de copiar
        this.copyDirectory(sourcePageFolder, destinationPageFolder);
      } else {
        console.warn(`Pasta não encontrada: ${sourcePageFolder}`);
      }
    }

    // Copiar pastas dos módulos ativos em selectedModules (que não estão em ignoredModules)
    Object.keys(selectedModules).forEach((moduleKey) => {
      const moduleConfig = selectedModules[moduleKey];

      if (moduleConfig.active && !ignoredModules.includes(`${moduleKey}`)) {
        const sourceModuleFolder = path.join(pagesFolder, moduleConfig.name); // Usando moduleConfig.name
        const destinationModuleFolder = path.join(newPagesFolder, moduleConfig.name); // Usando moduleConfig.name

        // Verifica se a pasta de origem existe
        if (fs.existsSync(sourceModuleFolder)) {
          // Cria a pasta de destino, caso não exista
          fs.mkdirSync(destinationModuleFolder, { recursive: true });
          // Copia o conteúdo da pasta de origem para a de destino
          this.copyDirectory(sourceModuleFolder, destinationModuleFolder);
        } else {
          console.warn(`Pasta não encontrada: ${sourceModuleFolder}`);
        }
      }
    });

    // 7. Copiar arquivos individuais na pasta 'src'
    const filesInSrcToCopy = ['App.tsx', 'index.css', 'react-app-env.d.ts', 'setupTests.ts'];

    for (const file of filesInSrcToCopy) {
      const sourceFile = path.join(frontSrcPath, file);
      const destinationFile = path.join(newFrontSrcPath, file);
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, destinationFile);
      } else {
        console.warn(`Arquivo não encontrado: ${sourceFile}`);
      }
    }

    console.log(`Front-end React copiado com sucesso para ${newFrontPath}`);
  }
}
