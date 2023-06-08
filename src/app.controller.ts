import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("ping")
  ping(): string {
    return `𓆝 𓆟 (👁 ͜ʖ👁) 𓆟 𓆝`;
  }
}
