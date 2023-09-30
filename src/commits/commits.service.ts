import { Injectable } from '@nestjs/common';
// import { GitResponse } from './commits.entity';
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
      const newData: frontendResponse[] = res.data.map((e: DataCommits) => ({
        name: e.author.login,
        avatar: e.author.avatar_url,
        mail: e.commit.author?.email,
        commit: e.commit.message,
        url: e.html_url,
        created: e.commit.author.date,
      }));

      return newData
    } catch (error) {
      return Promise.reject(error)
    }
  }

}
