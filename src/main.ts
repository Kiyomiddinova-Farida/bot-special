import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 4000
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, ()=> console.log(`Server running on port:`,PORT)
  );
}
bootstrap();
