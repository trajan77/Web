import { Controller, Post, Body, Inject } from '@midwayjs/core';
import { TeamService } from '../service/team.service';

@Controller('/api/team')
export class TeamController {
  @Inject()
  teamService: TeamService;

  @Post('/create')
  async createTeam(
    @Body() teamData: { username: Text; team: Text; introduce: Text }
  ) {
    return await this.teamService.createTeam(teamData);
  }
}
