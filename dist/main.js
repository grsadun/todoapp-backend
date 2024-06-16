"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const all_exception_filter_1 = require("./all-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new all_exception_filter_1.AllExceptionsFilter(httpAdapter));
    app.setGlobalPrefix("api");
    app.enableCors({
        origin: ["http://localhost:3000", "http://localhost:8000"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    });
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map