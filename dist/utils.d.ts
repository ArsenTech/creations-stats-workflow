import { IGitGist, IGitRepo, IResult } from "./types";
export declare function errorMessage(msg: string): never;
export declare function fetchData(): Promise<IResult>;
export declare function placeContent(generatedContent: string): void;
export declare function commitAndPush(): void;
export declare function makeList(val: IGitRepo, type: "minimal" | "detailed"): string;
export declare function hasGists(gists: IGitGist[] | "skipped"): gists is IGitGist[];
