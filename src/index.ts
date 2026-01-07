import * as core from "@actions/core"
import { fetchData, placeContent, commitAndPush, errorMessage, makeList, hasGists, hasRepos } from "./utils"

async function run(){
     const repoListDesign = core.getInput("repo-list-design");
     if(repoListDesign!=="minimal" && repoListDesign!=="detailed")
          errorMessage('Repo List design should be either "minimal" or "detailed"')
     const data = await fetchData();
     const repoTag = core.getInput("repo-tag-name");
     const gistTagName = core.getInput("gist-tag-name");
     if(hasRepos(data.repositories)){
          const repoMDList = `${data.repositories.map(val=>makeList(val, repoListDesign)).join("\n")}\n`;
          placeContent(repoMDList,repoTag)
     }
     if(hasGists(data.gists)){
          const gistMDList = `${data.gists.map(val=>`- [${val.description}](${val.url})`).join("\n")}`;
          placeContent(gistMDList,gistTagName)
     }
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