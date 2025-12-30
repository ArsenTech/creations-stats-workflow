import * as core from "@actions/core"
import { fetchData, placeContent, commitAndPush } from "./utils"

async function run(){
     const data = await fetchData();
     const markdown = `#### Repositories\n${data.repositories.map(val=>`- [${val.name}](${val.url}) - ⭐ ${val.stars} - ${val.description}`).join("\n")}\n`
     if(data.gists && data.gists.length<=0){
          markdown.concat(`\n#### Gists\n${data.gists.map(val=>`- (${val.description})[${val.url}]`).join("\n")}`)
     }
     core.info(markdown)
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