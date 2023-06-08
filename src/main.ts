import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join, resolve } from "path";
import { GlobalExceptionFilter } from "./middlewares/filters/global-exception.filter";
import { PrismaClientExceptionFilter } from "./middlewares/filters/prisma-exception.filter";
import { ResponseFormInterceptor } from "./middlewares/interceptors/response-form.interceptor";
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(cookieParser());

  app.useGlobalFilters(new GlobalExceptionFilter(), new PrismaClientExceptionFilter());
  app.useGlobalInterceptors(new ResponseFormInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE, whitelist: true, validateCustomDecorators: true })
  );

  app.useStaticAssets(join(resolve(), "public", "protected_files"));

  const configService = app.get(ConfigService);
  const PORT = configService.get<string>("PORT");

  await app.listen(PORT, () => {
    console.log("Server started at port ", PORT);
  });
}
bootstrap();
