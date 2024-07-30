import { Provide, Controller, Post, Body, Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Provide()
@Controller('/api')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/sign')
  async saveUser(@Body() userData: { username: string; password: string }) {
    console.log(111);
    try {
      await this.userService.saveUser(userData);
      return { message: 'User data saved successfully' };
    } catch (error) {
      this.ctx.logger.error('Failed to save user data:', error);
      return { message: 'Failed to save user data', error };
    }
  }
}
