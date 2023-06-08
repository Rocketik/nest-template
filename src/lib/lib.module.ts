import { JwtModule } from "@nestjs/jwt";
import { Global, Module } from "@nestjs/common";
import { LibService } from "./lib.service";
// import { FCMService } from "./fcm.service";/
// import { ExpoService } from "./expor.service";
// import { TasksService } from "./task.service";

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [LibService],
  exports: [LibService]
})
export class LibModule {}
