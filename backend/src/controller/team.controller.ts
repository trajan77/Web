import { Controller, Post, Body, Inject, Get, Param } from '@midwayjs/core';
import { TeamService } from '../service/team.service';

@Controller('/api/team')
export class TeamController {
  @Inject()
  teamService: TeamService;

  @Post('/create')
  async createTeam(@Body() teamData: { user: Text; team: Text; intro: Text }) {
    return await this.teamService.createTeam(teamData);
  }
  @Post('/invite')
  async invite(@Body() ID: { teamID: number; name: Text }) {
    return await this.teamService.invite(ID);
  }
  @Get('/:userTeam')
  async getUserTeam(@Param('userTeam') userTeam: number): Promise<any> {
    try {
      return await this.teamService.getUserTeamName(userTeam);
    } catch (error) {
      console.error('Error in getUserTeam:', error);
      throw error;
    }
  }
  @Get('/members/:userTeam')
  async getMembers(@Param('userTeam') userTeam: number): Promise<any> {
    try {
      return await this.teamService.getMembers(userTeam);
    } catch (error) {
      console.error('Error in getUserTeam:', error);
      throw error;
    }
  }
}
