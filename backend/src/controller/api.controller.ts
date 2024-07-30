import { Inject, Controller, Get, Query, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
  @Post('/sign')
  async saveUser(@Body() userData: { username: string; password: string }) {
    try {
      await this.userService.saveUser(userData);
      return { message: 'User data saved successfully' };
    } catch (error) {
      this.ctx.logger.error('Failed to save user data:', error);
      return { message: 'Failed to save user data', error };
    }
  }
}
