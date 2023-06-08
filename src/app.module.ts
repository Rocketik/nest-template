import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DbModule } from "./db/db.module";
import { ConfigModule } from "@nestjs/config";
import { ConfigModuleDto } from "./lib/common";
import { LibModule } from "./lib/lib.module";

@Module({
  imports: [DbModule, ConfigModule.forRoot(ConfigModuleDto), LibModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
