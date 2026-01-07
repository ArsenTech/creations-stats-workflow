import * as core from "@actions/core"
import { fetchData, placeContent, commitAndPush, errorMessage, makeList, hasGists } from "./utils"

async function run(){
     const repoListDesign = core.getInput("repo-list-design");
     if(repoListDesign!=="minimal" && repoListDesign!=="detailed")
          errorMessage('Repo List design should be either "minimal" or "detailed"')
     const data = await fetchData();
     let markdown = `#### Repositories\n${data.repositories.map(val=>makeList(val, repoListDesign)).join("\n")}\n`
     if(hasGists(data.gists)){
          markdown += `\n#### Gists\n${data.gists.map(val=>`- [${val.description}](${val.url})`).join("\n")}`;
     } else {
          core.warning("Could not fetch gists (permissions or a rate limit). Keeping prebious gist section.");
     }
     placeContent(markdown);
     commitAndPush();
}

try{
     run().catch(error=>{
          core.setFailed(`Creations stats job failed: ${error.message}`)
          process.exit(1)
     })
} catch (error: any){
     if(error.status===403){
          core.warning("The Github Action skipped due to temporary rate limit");
     } else {
          throw error;
     }
     core.setFailed(`Creations stats job failed: ${error.message}`)
     process.exit(1)
}