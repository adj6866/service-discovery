import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';
import { readdirSync } from 'fs'; // Import fs module
import { ReflectionService } from '@grpc/reflection';

async function bootstrap() {
  // Mendapatkan semua file .proto di direktori proto
  const protoPath = readdirSync(join(__dirname, '../dist/proto')) // Baca direktori proto relatif ke dist
    .filter((file) => file.endsWith('.proto')) // Filter hanya file dengan ekstensi .proto
    .map((file) => join(__dirname, '../dist/proto', file)); // Buat path absolut untuk setiap file .proto
  const packages = ['hero'];

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051', // Menentukan URL dan port di sini
      package: packages,
      protoPath,
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });

  await app.listen(3000);
  await app.startAllMicroservices();
}
bootstrap();
