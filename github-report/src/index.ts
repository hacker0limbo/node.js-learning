import { GithubApiService } from "./GithubApiService"
import { User } from './User';
import { Repo } from "./Repo";
import * as _ from "lodash";

const svc: GithubApiService = new GithubApiService()

if (process.argv.length < 3) {
  console.error('必须传入用户名')
} else {
  svc.getUserInfo(process.argv[2], (user: User) => {
    svc.getRepos(process.argv[2], (repos: Repo[]) => {
      // 根据仓库的大小降序排序
      let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.size*-1])
      user.repos = sortedRepos
      console.log(user)
    })
  })
  
}


