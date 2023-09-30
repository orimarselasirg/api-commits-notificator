import { Injectable } from '@nestjs/common';
// import { GitResponse } from './commits.entity';
import { HttpService } from '@nestjs/axios';
import { GitResponse, data } from './commits.entity';
import {Octokit} from 'octokit'

@Injectable()
export class CommitsService {
  constructor(private readonly httpService: HttpService){}

  octokit = new Octokit({
    auth: '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'
  })
   async getAllCommits(repoName: string): Promise<GitResponse> {
    const res = await  this.octokit.request("GET /repos/{owner}/{repo}/commits",{
      owner: "orimarselasirg",
      repo: repoName ? repoName : "commitNotificator",
    }) as never
    return res
  }

}
