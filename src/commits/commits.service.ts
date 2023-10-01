import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GitResponse, DataCommits, dataResponse, frontendResponse, RespositoryFrontendResponse, RepositoryListResponse, RepositoryInfo } from './commits.entity';
import {Octokit} from 'octokit'

@Injectable()
export class CommitsService {
  constructor(private readonly httpService: HttpService){}

  
  octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  })
  async getAllCommits(repoName: string): Promise<frontendResponse[] | object> {
    try {
      const res = await  this.octokit.request("GET /repos/{owner}/{repo}/commits",{
        owner: process.env.OWNER,
        repo: repoName ? repoName : "commitNotificator",
      }) as GitResponse
      const frontendStructureData: dataResponse[] = res.data.map((e: DataCommits) => ({
        name: e.author.login,
        avatar: e.author.avatar_url,
        mail: e.commit.author?.email,
        commit: e.commit.message,
        url: e.html_url,
        created: e.commit.author.date,
      }));
      return {
        sucess: true,
        principal_url: res.url,
        data: frontendStructureData
      }
    } catch (error) {
      return({
        success: false,
        status: error.status,
        message: error.response?.data?.message,
        error: error.response
      })
    }
  }

  async getAllRepositories(): Promise<RespositoryFrontendResponse[] | object> {
    try {
      const res = await this.octokit.request('GET /user/repos', {
        'X-GitHub-Api-Version': '2022-11-28'
      }) as RepositoryListResponse
      const frontendStructureData: RespositoryFrontendResponse[] = res.data.map((e: RepositoryInfo) => ({
        id: e.id,
        name: e.name,
        description: e.description,
        html_ulr: e.html_url,
        language: e.language,
        visibility: e.visibility,
        owner: e.owner.login
      }));
      return frontendStructureData
    } catch (error) {
      return({
        success: false,
        status: error.status,
        message: error.response?.data?.message,
        error: error.response
      })
    }
  }

}
