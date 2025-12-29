import * as core from "@actions/core"
import * as github from "@actions/github"

try{
     const testInput = core.getInput("test-in");
     core.info(testInput);

     core.setOutput("test-out","Hello world");
     const payload = JSON.stringify(github.context.payload,undefined,2);
     core.info(`Paylod: ${payload}`)
} catch (error: any){
     core.setFailed(error.message)
}