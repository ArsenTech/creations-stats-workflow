import { IResult } from "./types";
export declare function fetchData(): Promise<IResult>;
export declare function placeContent(generatedContent: string): void;
export declare function commitAndPush(githubToken?: string): void;
