import * as core from "@actions/core"
import * as github from "@actions/github"
import { Octokit } from "@octokit/rest";

async function run(){
     const username = core.getInput("github-username");
     const exclusionsTxt = core.getInput("exclusions");
     const targetFile = core.getInput("target-file");
     const repoLimit = core.getInput("repo-limit");
     const gistLimit = core.getInput("gist-limit");
     const showArchives = core.getBooleanInput("show-archives");
     const showForks = core.getBooleanInput("show-forks");
     const showGistStargazers = core.getBooleanInput("show-gist-stargazers");
     const commitMessage = core.getInput("commit-message");
     const exclusions = exclusionsTxt.split("|").map(repoName=>repoName.trim());
     const octokit = new Octokit({
          auth: process.env.GITHUB_TOKEN
     })

     const {data} = await octokit.repos.listForUser({
          username,
          per_page: parseInt(repoLimit)
     })
     
     core.info(JSON.stringify(data,undefined,2))
}

try{
     run().catch(error=>{
          core.setFailed(`Creations stats job failed: ${error.message}`)
          process.exit(1)
     })
} catch (error: any){
     core.setFailed(`Creations stats job failed: ${error.message}`)
     process.exit(1)
}