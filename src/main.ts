import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MyLoggerService } from "./my-logger/my-logger.service";
import { AllExceptionsFilter } from "./all-exception.filter";

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, {
  //   logger: ["error", "warn", "debug", "verbose", "fatal"],
  //   bufferLogs: true,
  // });
  // app.useLogger(app.get(MyLoggerService));

  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:8000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  });
  await app.listen(8000);
}
bootstrap();
