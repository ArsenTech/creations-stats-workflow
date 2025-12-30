import * as core from "@actions/core"
import { Octokit } from "@octokit/rest";
import { IGitGist, IGitRepo, IResult } from "./types";
import * as fs from "fs";
import * as path from "path";
import {execSync} from "child_process"

const sleep = (ms: number) => new Promise(res=>setTimeout(res,ms))

export async function fetchData(): Promise<IResult>{
     const username = core.getInput("github-username");
     if(username.trim()==="")
          core.error("Username is required")
     const exclusionsTxt = core.getInput("exclusions");
     const repoLimit = core.getInput("repo-limit");
     if(parseInt(repoLimit) <= 0)
          core.error("Respository limit should be positive")
     const gistLimit = core.getInput("gist-limit");
     if(parseInt(gistLimit) <= 0)
          core.error("Gists limit should be positive")
     const showArchives = core.getBooleanInput("show-archives");
     const showForks = core.getBooleanInput("show-forks");
     const includeGists = core.getBooleanInput("include-gists");

     const exclusions = new Set(exclusionsTxt.split("|").map(repoName=>repoName.trim()));
     const octokit = new Octokit({
          auth: process.env.GITHUB_TOKEN,
          userAgent: "creations-stats-workflow"
     })

     const repoData = await octokit.paginate(
          octokit.rest.repos.listForUser,
          {
               username,
               per_page: parseInt(repoLimit)
          }
     )
     await sleep(750);

     const repos: IGitRepo[] = repoData.filter(repo=>!repo.disabled && !repo.private && !exclusions.has(repo.name)).map(repo=>({
          name: repo.name,
          url: repo.html_url,
          description: repo.description || "No Description",
          fork: repo.fork,
          forks: repo.forks_count,
          stars: repo.stargazers_count,
          watchers: repo.watchers_count,
          archived: repo.archived,
          license: repo.license,
     })).filter(repo=>{
          if(!showArchives && repo.archived) return false;
          if(!showForks && repo.fork) return false;
          return true
     });

     if(includeGists){
          try {
               const gistData = await octokit.paginate(
                    octokit.rest.gists.listForUser,
                    {
                         username,
                         per_page: parseInt(gistLimit)
                    }
               );
               await sleep(750);
               const gists: IGitGist[] = gistData.filter(gist=>gist.public).map(gist=>({
                    url: gist.html_url,
                    description: gist.description || "Untitled gist"
               }))
               return { repositories: repos, gists }
          } catch {
               core.warning("Could not fetch gists (token lacks permission)");
          }
     }
     return { repositories: repos, gists: null }
}

export function placeContent(generatedContent: string){
     const start = "<!-- CREATIONS-START -->";
     const end = "<!-- CREATIONS-END -->";
     const targetFile = core.getInput("target-file");

     const filePath = path.resolve(targetFile);
     const file = fs.readFileSync(filePath,"utf8");
     const startIdx = file.indexOf(start);
     const endIdx = file.indexOf(end);

     if (startIdx === -1 || endIdx === -1)
          throw new Error("CREATIONS tags not found in target file");

     const before = file.slice(0, startIdx + start.length),
          after = file.slice(endIdx);

     const updated =
     `${before}\n\n` +
     generatedContent.trim() +
     `\n\n${after}`;

     fs.writeFileSync(filePath, updated, "utf8");
}

export function commitAndPush(){
     const commitMessage = core.getInput("commit-message");
     const targetFile = core.getInput("target-file");

     execSync("git config --global user.email github-actions@github.com");
     execSync("git config --global user.name github-actions[bot]");
     if (process.env.GITHUB_TOKEN)
          execSync(`git remote set-url origin https://${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`);
     try {
          execSync("git diff --quiet");
          core.info("No changes to commit");
          return;
     } catch {
          // diff detected, continue
     }
     execSync(`git add "${targetFile}"`);
     execSync(`git commit -m "${commitMessage}"`);
     execSync("git push");
}