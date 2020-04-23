import { NestFactory } from '@nestjs/core';
import { Logger } from "@nestjs/common";
import { AppModule } from './app.module';

async function bootstrap() {
  
  console.log('---Start:Logging---');
  const logger = new Logger('bootstrap')
  console.log('---End:Logging---');
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port);
  logger.log(`Aplication listening on port ${port}`)
}
bootstrap();
