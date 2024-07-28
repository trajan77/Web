import { Controller, Get } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/')
  public async home(): Promise<any> {
    return 'Hello World!';
  }
}
