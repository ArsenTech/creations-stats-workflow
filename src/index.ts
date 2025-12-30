import * as core from "@actions/core"
import { fetchData, placeContent, commitAndPush } from "./utils"

async function run(){
     const data = await fetchData();
     const markdown = `#### Repositories
     ${data.repositories.map(val=>`- [${val.name}](${val.url}) - ⭐ ${val.stars} - ${val.description}`).join("\n")}\n`
     if(data.gists){
          markdown.concat(`#### Gists
          ${data.gists.map(val=>`- (${val.description})[${val.url}]`).join("\n")}`)
     }
     core.info(markdown)
}

try{
     fetchData().then(data=>{
          core.info(JSON.stringify(data,undefined,2))
     }).catch(error=>{
          core.setFailed(`Creations stats job failed: ${error.message}`)
          process.exit(1)
     })
} catch (error: any){
     core.setFailed(`Creations stats job failed: ${error.message}`)
     process.exit(1)
}