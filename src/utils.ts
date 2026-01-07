import * as core from "@actions/core"
import { Octokit } from "@octokit/rest";
import { IGitGist, IGitRepo, IResult } from "./types";
import * as fs from "fs";
import * as path from "path";
import {execSync} from "child_process"

const sleep = (ms: number) => new Promise(res=>setTimeout(res,ms));
export function errorMessage(msg: string): never {
     core.error(msg)
     throw new Error(msg)
}

export async function fetchData(): Promise<IResult>{
     const username = core.getInput("github-username");
     if(username.trim()==="") errorMessage("Username is required")
     const exclusionsTxt = core.getInput("exclusions");
     const repoLimit = core.getInput("repo-limit");
     if(parseInt(repoLimit) <= 0) errorMessage("Respository limit should be positive")
     const gistLimit = core.getInput("gist-limit");
     if(parseInt(gistLimit) <= 0) errorMessage("Gists limit should be positive")
     const showArchives = core.getBooleanInput("show-archives");
     const showForks = core.getBooleanInput("show-forks");
     const includeGists = core.getBooleanInput("include-gists");

     const exclusions = new Set(exclusionsTxt.split(",").map(repoName=>repoName.trim()).filter(Boolean));
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
          forks: repo.forks,
          stars: repo.stargazers_count,
          archived: repo.archived,
          license: repo.license?.name || "Unlicensed",
     })).filter(repo=>{
          if(!showArchives && repo.archived) return false;
          if(!showForks && repo.fork) return false;
          return true
     }).slice(0, parseInt(repoLimit));

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
               return { repositories: repos, gists: "skipped" }
          }
     }
     return { repositories: repos, gists: "skipped" }
}

export function placeContent(generatedContent: string){
     const commentTagName = core.getInput("comment-tag-name")
     if(commentTagName.trim()==="") errorMessage('Comment Tag Name should be either "CREATIONS" or any other name, not an empty string')
     const start = `<!-- ${commentTagName}-START -->`;
     const end = `<!-- ${commentTagName}-END -->`;
     const targetFile = core.getInput("target-file");

     const filePath = path.resolve(targetFile);
     const file = fs.readFileSync(filePath,"utf8");
     const startIdx = file.indexOf(start);
     const endIdx = file.indexOf(end);

     if (startIdx === -1 || endIdx === -1)
          throw new Error(
               `Comment tags <!-- ${commentTagName}-START --> / <!-- ${commentTagName}-END --> not found in target file`
          );

     const before = file.slice(0, startIdx + start.length),
          after = file.slice(endIdx);

     const updated =
     `${before}\n\n` +
     generatedContent.trim() +
     `\n\n${after}`;

     if (process.env.ACT) {
          core.info("Generated content preview:\n================");
          core.info(generatedContent.trim());
          return;
     } else {
          fs.writeFileSync(filePath, updated, "utf8");
     }
}

export function commitAndPush(){
     if (process.env.ACT) {
          core.info("Skipping git commit and push under act");
          return;
     }
     const commitMessage = core.getInput("commit-message");
     const targetFile = core.getInput("target-file");

     execSync("git config --global user.email 41898282+github-actions[bot]@users.noreply.github.com");
     execSync("git config --global user.name github-actions[bot]");
     if (process.env.GITHUB_TOKEN)
          execSync(`git remote set-url origin git remote set-url origin https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`,{ stdio: "inherit" });
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
export function makeList(val: IGitRepo, type: "minimal" | "detailed"){
     if(type==="minimal")
          return `- [${val.name}](${val.url}) - ⭐ ${val.stars} - ${val.description}`;
     return [
          `- [${val.name}](${val.url}) - ${val.description}`,
          `  - ⚖️ ${val.license}`,
          `  - ⭐ Stargazers: ${val.stars}`,
          `  - 🍴 Forks: ${val.forks}`,
     ].join("\n");
}