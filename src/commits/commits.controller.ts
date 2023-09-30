import { Controller, Get, Param } from '@nestjs/common';
import {CommitsService} from './commits.service'

@Controller()
export class CommitsController {

  constructor(private commitService: CommitsService){}
  @Get(':repoName')
  getCommitsData(@Param('repoName') repoName: string) {
    return this.commitService.getAllCommits(repoName)
  }
}
