<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


# Proyecto QSAMAX API

API backend para la gestión de objetivos y metas, construida con NestJS, Prisma y MySQL.

## Tabla de Contenidos

-   [Descripción](#descripción)
-   [Prerrequisitos](#prerrequisitos)
-   [Configuración del Proyecto](#configuración-del-proyecto)
    -   [1. Clonar el Repositorio](#1-clonar-el-repositorio)
    -   [2. Instalar Dependencias](#2-instalar-dependencias)
    -   [3. Configurar Variables de Entorno](#3-configurar-variables-de-entorno)
    -   [4. Configuración de la Base de Datos con Prisma](#4-configuración-de-la-base-de-datos-con-prisma)
-   [Ejecutar la Aplicación](#ejecutar-la-aplicación)
    -   [Modo Desarrollo](#modo-desarrollo)
    -   [Modo Producción](#modo-producción)
-   [Documentación de la API (Swagger)](#documentación-de-la-api-swagger)
-   [Scripts Disponibles](#scripts-disponibles)

## Descripción

Este proyecto proporciona una API RESTful para administrar objetivos (`Objective`) y sus metas asociadas (`ObjectiveGoal`). Incluye funcionalidades CRUD para estas entidades, autenticación basada en JWT (implícita por `JWT_SECRET`) y utiliza Prisma como ORM para interactuar con una base de datos MySQL.

## Prerrequisitos

Asegúrate de tener instalados los siguientes componentes antes de comenzar:

-   [Node.js](https://nodejs.org/) (se recomienda la versión LTS más reciente compatible con el proyecto, por ejemplo, v18.x o superior. Si se despliega en entornos más antiguos, ajustar a la versión compatible como v12.x)
-   [npm](https://www.npmjs.com/) (generalmente se instala con Node.js)
-   [Git](https://git-scm.com/)
-   Una instancia de MySQL en ejecución.

## Configuración del Proyecto

Sigue estos pasos para configurar el proyecto en tu entorno local.

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO_GIT>
cd qsamax
```

### 2. Instalar Dependencias

Instala las dependencias del proyecto usando npm:

```bash
npm install
```

### 3. Configurar Variables de Entorno

Este proyecto utiliza variables de entorno para la configuración de la base de datos y otras claves secretas.

1.  Crea un archivo llamado `.env` en la raíz del proyecto.
2.  Copia el contenido del archivo `.env.example` en tu nuevo archivo `.env`.
3.  Modifica los valores en el archivo `.env` según tu configuración local.

**Contenido de `.env.example` (y tu `.env`):**

```bash
# .env
DB_HOST=TU_HOST_DE_BD # Ejemplo: 10.240.21.146 o localhost
DB_PORT=TU_PUERTO_DE_BD # Ejemplo: 3306
DB_USERNAME=TU_USUARIO_DE_BD # Ejemplo: inmsa o root
DB_PASSWORD=TU_CONTRASENA_DE_BD # Ejemplo: inmsa2016
DB_DATABASE=TU_NOMBRE_DE_BD # Ejemplo: qsamax
JWT_SECRET=UNA_CLAVE_SECRETA_MUY_FUERTE_Y_UNICA # ¡Cambia esto por una clave segura!

# URL de conexión para Prisma (se construye a partir de las variables anteriores o se puede definir directamente)
DATABASE_URL="mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}"

# Puerto en el que se ejecutará la aplicación NestJS (opcional, por defecto 3000)
# PORT=3000
```

**Descripción de las Variables:**

*   `DB_HOST`: La dirección del host de tu servidor MySQL.
*   `DB_PORT`: El puerto en el que tu servidor MySQL está escuchando (generalmente 3306).
*   `DB_USERNAME`: El nombre de usuario para conectarse a la base de datos MySQL.
*   `DB_PASSWORD`: La contraseña para el usuario de la base de datos MySQL.
*   `DB_DATABASE`: El nombre de la base de datos MySQL a utilizar.
*   `JWT_SECRET`: Una cadena secreta utilizada para firmar y verificar los JSON Web Tokens (JWT). **Es crucial que esta sea una cadena larga, compleja y única para entornos de producción.**
*   `DATABASE_URL`: La cadena de conexión completa que Prisma utilizará para conectarse a la base de datos. Asegúrate de que los valores coincidan con las variables individuales de la base de datos.
*   `PORT` (Opcional): El puerto en el que se ejecutará la aplicación NestJS. Si no se especifica, NestJS suele usar el puerto 3000 por defecto.

### 4. Configuración de la Base de Datos con Prisma

Prisma se utiliza para la interacción con la base de datos.

1.  **Generar el Cliente de Prisma:**
    Después de instalar las dependencias y configurar tu `.env`, genera el cliente de Prisma:
    ```bash
    npx prisma generate
    ```

2.  **Aplicar Migraciones (Crear Tablas):**
    Si es la primera vez que configuras el proyecto o si hay nuevas migraciones, aplícalas para crear la estructura de la base de datos:
    ```bash
    npx prisma migrate dev --name init
    ```
    (Reemplaza `init` con un nombre descriptivo para tu migración si es necesario).
    Para entornos de producción, después de que las migraciones se hayan creado y probado en desarrollo, usarías:
    ```bash
    npx prisma migrate deploy
    ```

## Ejecutar la Aplicación

### Modo Desarrollo

Para ejecutar la aplicación en modo desarrollo con recarga automática (hot-reloading):

```bash
npm run start:dev
```

La aplicación estará disponible por defecto en `http://localhost:3000` (o el puerto que hayas configurado en `PORT`).

### Modo Producción

Para ejecutar la aplicación en modo producción:

1.  **Construir la aplicación:**
    ```bash
    npm run build
    ```
    Esto creará una carpeta `dist` con los archivos transpilados.

2.  **Iniciar la aplicación:**
    ```bash
    npm run start:prod
    ```
    O directamente:
    ```bash
    node dist/main
    ```
    Para una gestión robusta en producción, considera usar un gestor de procesos como PM2.

## Documentación de la API (Swagger)

Una vez que la aplicación esté en ejecución, la documentación de la API generada con Swagger estará disponible en la siguiente ruta (por defecto):

`http://localhost:3000/api`

(Ajusta el puerto si lo has cambiado).

## Scripts Disponibles

En el archivo `package.json`, puedes encontrar varios scripts útiles:

-   `npm run start`: Inicia la aplicación (generalmente para producción después de un build).
-   `npm run start:dev`: Inicia la aplicación en modo desarrollo con hot-reloading.
-   `npm run start:debug`: Inicia la aplicación en modo debug.
-   `npm run start:prod`: Inicia la aplicación en modo producción (después de un build).
-   `npm run build`: Compila el proyecto TypeScript a JavaScript.
-   `npm run format`: Formatea el código usando Prettier.
-   `npm run lint`: Ejecuta ESLint para analizar el código.
-   `npm test`: Ejecuta pruebas unitarias.
-   `npm run test:watch`: Ejecuta pruebas unitarias en modo watch.
-   `npm run test:cov`: Ejecuta pruebas unitarias y genera un reporte de cobertura.
-   `npm run test:e2e`: Ejecuta pruebas de extremo a extremo.
-   `npx prisma ...`: Varios comandos de Prisma para migraciones, generación de cliente, etc.
-   `npx prisma generate`: cuando se agrega un nuevo modelo a prisma se debe ejecutar este comando.
---

Este `README.md` debería proporcionar una buena base para tu proyecto. Puedes añadir más secciones según sea necesario, como "Contribución", "Licencia", "Estructura del Proyecto", etc.

para poder actualizar los cambios en la bd con prisma nesecita los siguiente comandos npx prisma generate