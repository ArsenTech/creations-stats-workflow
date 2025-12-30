import * as core from "@actions/core"
import * as github from "@actions/github"
import { Octokit, App } from "octokit";

try{
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
     core.info(JSON.stringify(octokit))
} catch (error: any){
     core.setFailed(`Creations stats job failed: ${error.message}`)
}