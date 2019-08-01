export class Repo {
  public name: string
  public description: string
  public url: string
  public size: number
  public forks_count: number

  constructor(repo: any) {
    this.name = repo.name
    this.description = repo.description
    this.url = repo.html_url
    this.size = repo.size
    this.forks_count = repo.forks_count
  }
}