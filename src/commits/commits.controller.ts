import { Controller, Get, Query } from '@nestjs/common';
import {CommitsService} from './commits.service'

@Controller()
export class CommitsController {

  constructor(private commitService: CommitsService){}
  @Get('repo-list')
  getRespositoryList(){
    return this.commitService.getAllRepositories()
  }
  @Get('repo')
  getCommitsData(@Query('name') repoName: string) {
    return this.commitService.getAllCommits(repoName)
  }

}
