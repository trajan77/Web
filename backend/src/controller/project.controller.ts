import { Controller, Post, Body, Inject, Get, Param } from '@midwayjs/core';
import { ProjectService } from '../service/project.service';

@Controller('/api/project')
export class ProjectController {
  @Inject()
  projectService: ProjectService;
  @Post('/create')
  async createProject(@Body() teamData: { name: Text; teamID: number }) {
    return await this.projectService.createProject(teamData);
  }
  @Get('/:userTeam')
  async getProjects(@Param('userTeam') userTeam: number): Promise<any> {
    try {
      return await this.projectService.getProjects(userTeam);
    } catch (error) {
      console.error('Error in getUserTeam:', error);
      throw error;
    }
  }
  @Post('/add')
  async addTask(
    @Body()
    taskData: {
      projectId: number;
      taskName: Text;
      taskData: Text;
      dueDate: Text;
    }
  ) {
    console.log(taskData);
    return await this.projectService.addTask(taskData);
  }
  @Get('/task/:projectID')
  async getTasks(@Param('projectID') projectID: number): Promise<any> {
    try {
      return await this.projectService.getTasks(projectID);
    } catch (error) {
      console.error('Error in getUserTeam:', error);
      throw error;
    }
  }
  @Post('/del')
  async delProject(@Body() projectData: { projectID: number }) {
    return await this.projectService.delProject(projectData);
  }
  @Post('/taskNext')
  async taskNext(@Body() taskData: { taskID: number }) {
    return await this.projectService.taskNext(taskData);
  }
  @Post('/taskPrev')
  async taskPrev(@Body() taskData: { taskID: number }) {
    return await this.projectService.taskPrev(taskData);
  }
  @Post('/taskComment')
  async taskComment(
    @Body() taskData: { comment: Text; taskID: number; userName: Text }
  ) {
    return await this.projectService.taskComment(taskData);
  }
  @Get('/comment/:taskID')
  async getComments(@Param('taskID') taskID: number): Promise<any> {
    try {
      return await this.projectService.getComments(taskID);
    } catch (error) {
      console.error('Error in getUserTeam:', error);
      throw error;
    }
  }
}
