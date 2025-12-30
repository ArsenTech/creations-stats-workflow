import * as core from "@actions/core"
import { fetchData, placeContent, commitAndPush } from "./utils"

async function run(){
     const githubToken = process.env.GITHUB_TOKEN;
     const data = await fetchData(githubToken);
     let markdown = `#### Repositories\n${data.repositories.map(val=>`- [${val.name}](${val.url}) - ⭐ ${val.stars} - ${val.description}`).join("\n")}\n`
     if(data.gists !== null){
          markdown += `\n#### Gists\n${data.gists.map(val=>`- [${val.description}](${val.url})`).join("\n")}`;
     }
     placeContent(markdown);
     commitAndPush(githubToken);
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