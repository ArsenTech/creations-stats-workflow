import * as core from "@actions/core"
import { Octokit } from "@octokit/rest";
import { IGitGist, IGitRepo, IResult } from "./types";
import * as fs from "fs";
import * as path from "path";
import {exec} from "child_process"

export async function fetchData(): Promise<IResult>{
     const username = core.getInput("github-username");
     const exclusionsTxt = core.getInput("exclusions");
     const repoLimit = core.getInput("repo-limit");
     const gistLimit = core.getInput("gist-limit");
     const showArchives = core.getBooleanInput("show-archives");
     const showForks = core.getBooleanInput("show-forks");
     const includeGists = core.getBooleanInput("include-gists");

     const exclusions = new Set(exclusionsTxt.split("|").map(repoName=>repoName.trim()));
     const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

     const {data: repoData} = await octokit.repos.listForUser({
          username,
          per_page: parseInt(repoLimit)
     })

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
          const {data: gistData} = await octokit.gists.listForUser({
               username,
               per_page: parseInt(gistLimit)
          });
          const gists: IGitGist[] = gistData.filter(gist=>gist.public).map(gist=>({
               url: gist.html_url,
               description: gist.description || "Untitled gist"
          }))
          return { repositories: repos, gists }
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

     core.info(updated)

     fs.writeFileSync(filePath, updated, "utf8");
}

export function commitAndPush(){
     const commitMessage = core.getInput("commit-message");
     const targetFile = core.getInput("target-file");
     exec("git config --global user.name github-actions[bot]");
     exec("git config --global user.email github-actions@github.com");
     if (process.env.GITHUB_TOKEN)
          exec(`git remote set-url origin https://${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`);
     exec("git diff --quiet",(error)=>{
          if(!error){
               core.info("No changes to commit");
               process.exit(0);
          }
          if (error.code === 1) return;
          console.error(error.message);
          process.exit(1);
     });

     exec(`git add "${targetFile}"`);
     exec(`git commit -m "${commitMessage}" && git push`)
}