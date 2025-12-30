import { IResult } from "./types";
export declare function fetchData(githubToken?: string): Promise<IResult>;
export declare function placeContent(generatedContent: string): void;
export declare function commitAndPush(githubToken?: string): void;
