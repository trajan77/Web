import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  userService: UserService;

  @Post('/sign')
  async saveUser(@Body() userData: { username: Text; password: Text }) {
    try {
      return this.userService.login(userData);
    } catch (error) {
      return { message: 'Failed to save user data', error };
    }
  }
}
