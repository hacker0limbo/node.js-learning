import * as request from 'request'
import { User } from './User'
import { Repo } from './Repo'

export class GithubApiService {
  
  getUserInfo(username: string, callback: (user: User) => any) {
    const options: request.Options = {
      url: `https://api.github.com/users/${username}`,
      headers: {
        'User-Agent': 'request'
      },
      json: true
    }

    request.get(options, (error: Error, res: request.Response, body: any) => {
      const user: User = new User(body)
      callback(user)
    })
  }

  getRepos(username: string, callback: (repos: Repo[]) => any) {
    const options: request.Options = {
      url: `https://api.github.com/users/${username}/repos`,
      headers: {
        'User-Agent': 'request'
      },
    }
    request.get(options, (error: Error, res: any, body: any) => {
      const repos: Repo[] = JSON.parse(body).map((repo: any) => new Repo(repo))
      callback(repos)
    })
  }
}