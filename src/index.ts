import * as core from "@actions/core"
import { Octokit } from "@octokit/rest";
import { IGitGist, IGitRepo, IResult } from "./types";

async function fetchData(): Promise<IResult>{
     const username = core.getInput("github-username");
     const exclusionsTxt = core.getInput("exclusions");
     const targetFile = core.getInput("target-file");
     const repoLimit = core.getInput("repo-limit");
     const gistLimit = core.getInput("gist-limit");
     const showArchives = core.getBooleanInput("show-archives");
     const showForks = core.getBooleanInput("show-forks");
     const commitMessage = core.getInput("commit-message");
     const includeGists = core.getBooleanInput("include-gists");
     const exclusions = new Set(exclusionsTxt.split("|").map(repoName=>repoName.trim()));
     const octokit = new Octokit({
          auth: process.env.GITHUB_TOKEN
     })

     const {data: repoData} = await octokit.repos.listForUser({
          username,
          per_page: parseInt(repoLimit)
     })

     const repos: IGitRepo[] = repoData.filter(repo=>!repo.disabled && !repo.private && !exclusions.has(repo.name)).map(repo=>{
          const {
               name,
               html_url,
               description,
               fork,
               forks_count,
               stargazers_count,
               watchers_count,
               archived,
               license,
          } = repo
          return {
               name,
               url: html_url,
               description: description || "No Description",
               fork,
               forks: forks_count,
               stars: stargazers_count,
               watchers: watchers_count,
               archived,
               license,
          }
     }).filter(repo=>{
          if(!showArchives && repo.archived) return false;
          if(!showForks && repo.fork) return false;
          return true
     });

     if(includeGists){
          const {data: gistData} = await octokit.gists.listForUser({
               username,
               per_page: parseInt(gistLimit)
          });
          const gists: IGitGist[] = gistData.filter(gist=>gist.public).map(gist=>({
               url: gist.html_url,
               description: gist.description
          }))
          return {
               repositories: repos,
               gists
          }
     }

     return {
          repositories: repos,
          gists: null
     }
}

try{
     fetchData().then(data=>{
          core.info(JSON.stringify(data,undefined,2))
     }).catch(error=>{
          core.setFailed(`Creations stats job failed: ${error.message}`)
          process.exit(1)
     })
} catch (error: any){
     core.setFailed(`Creations stats job failed: ${error.message}`)
     process.exit(1)
}