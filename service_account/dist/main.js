"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const fs_1 = require("fs");
const reflection_1 = require("@grpc/reflection");
async function bootstrap() {
    const protoPath = (0, fs_1.readdirSync)((0, path_1.join)(__dirname, '../dist/proto'))
        .filter((file) => file.endsWith('.proto'))
        .map((file) => (0, path_1.join)(__dirname, '../dist/proto', file));
    const packages = ['hero'];
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.connectMicroservice({
        transport: microservices_1.Transport.GRPC,
        options: {
            url: '0.0.0.0:50051',
            package: packages,
            protoPath,
            onLoadPackageDefinition: (pkg, server) => {
                new reflection_1.ReflectionService(pkg).addToServer(server);
            },
        },
    });
    await app.listen(3000);
    await app.startAllMicroservices();
}
bootstrap();
//# sourceMappingURL=main.js.map