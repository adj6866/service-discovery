import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('auth/:id')
  getAuth(@Param('id') id: string): any {
    return { auth: id };
  }

  @Get('ingress-curl')
  async publicCurl(): Promise<any> {
    return await this.appService.ingressCurl();
  }

  @Get('local-curl')
  async localCurl(): Promise<any> {
    return await this.appService.localCurl();
  }
}
