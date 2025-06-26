import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { ValidationExceptionFilter } from '@common/filters/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('In Time API')
    .setDescription('API para el manejo de In Time')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.use((req, res, next) => {
    if (!req.originalUrl.startsWith('/v1') && !req.originalUrl.startsWith('/swagger')) {
      res.sendFile(join(__dirname, '..', 'public', 'index.html'));
    } else {
      next();
    }
  });

  app.setGlobalPrefix('v1');

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type, Authorization, X-Forwarded-For',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new ValidationExceptionFilter());

  // Habilitar el manejo de JSON y formularios en NestJS
  app.use(json({ limit: '50mb' })); // Ajusta el límite según necesites
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
