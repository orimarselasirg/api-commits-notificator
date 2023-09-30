import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GitResponse, DataCommits, frontendResponse } from './commits.entity';
import {Octokit} from 'octokit'

@Injectable()
export class CommitsService {
  constructor(private readonly httpService: HttpService){}

  octokit = new Octokit({
    auth: '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'
  })
   async getAllCommits(repoName: string): Promise<frontendResponse[]> {
    try {
      const res = await  this.octokit.request("GET /repos/{owner}/{repo}/commits",{
        owner: "orimarselasirg",
        repo: repoName ? repoName : "commitNotificator",
      }) as GitResponse
      // console.log(res);
      const frontendStructureData: frontendResponse[] = res.data.map((e: DataCommits) => ({
        name: e.author.login,
        avatar: e.author.avatar_url,
        mail: e.commit.author?.email,
        commit: e.commit.message,
        url: e.html_url,
        created: e.commit.author.date,
      }));

      return frontendStructureData
    } catch (error) {
      return Promise.reject(error)
    }
  }

}
