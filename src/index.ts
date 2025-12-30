import * as core from "@actions/core"
import * as github from "@actions/github"

try{
     const username = core.getInput("github-username");
     const exclusions = core.getInput("exclusions");
     const targetFile = core.getInput("target-file");
     const repoLimit = core.getInput("repo-limit");
     const gistLimit = core.getInput("gist-limit");
     const showArchives = core.getBooleanInput("show-archives");
     const showForks = core.getBooleanInput("show-forks");
     const showGistStargazers = core.getInput("show-gist-stargazers");
     const commitMessage = core.getInput("commit-message");
     core.info(JSON.stringify({
          username,
          exclusions,
          targetFile,
          repoLimit,
          gistLimit,
          showArchives,
          showForks,
          showGistStargazers,
          commitMessage
     }))
} catch (error: any){
     core.setFailed(`[ERROR]: ${error.message}`)
}