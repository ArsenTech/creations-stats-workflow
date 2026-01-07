export interface IGitRepo {
    name: string;
    url: string;
    description: string;
    fork: boolean;
    forks?: number;
    stars?: number;
    archived?: boolean;
    license: string;
}
export interface IGitGist {
    url: string;
    description: string;
}
export interface IResult {
    repositories: IGitRepo[] | "skipped";
    gists: IGitGist[] | "skipped";
}
