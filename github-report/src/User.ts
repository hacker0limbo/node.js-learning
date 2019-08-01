import { Repo } from "./Repo";

export class User {
  public login: string
  public fullName: string
  public repoCount: number
  public followerCount: number
  public repos: Repo[]

  constructor(userResponse: any) {
    this.login = userResponse.login
    this.fullName = userResponse.name
    this.repoCount = userResponse.public_repos
    this.followerCount = userResponse.followers
    this.repos = []
  }
}