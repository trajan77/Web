import { Inject, Controller, Post, Body, Get, Param } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  userService: UserService;

  @Post('/sign')
  async login(@Body() userData: { username: Text; password: Text }) {
    return await this.userService.login(userData);
  }
  @Get('/user/:username')
  async getUserTeam(@Param('username') username): Promise<any> {
    try {
      return await this.userService.getUserTeamId(username);
    } catch (error) {
      console.error('Error in getUserTeam:', error);
      throw error;
    }
  }
}
