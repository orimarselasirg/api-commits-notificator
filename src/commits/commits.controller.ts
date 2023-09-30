import { Controller, Get } from '@nestjs/common';
import {CommitsService} from './commits.service'

@Controller()
export class CommitsController {

  constructor(private commitService: CommitsService){}
  @Get()
  getCommitsData() {
    return this.commitService.getAllCommits()
  }
}
