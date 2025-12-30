export interface IGitRepo{
     name: string;
     url: string;
     description: string;
     fork: boolean;
     forks?: number;
     stars?: number;
     watchers?: number;
     archived?: boolean;
     license: {
          key?: string | undefined;
          name?: string | undefined;
          spdx_id?: string | undefined;
          url?: string | undefined;
          node_id?: string | undefined;
     } | null | undefined,
}

export interface IGitGist{
     url: string;
     description: string | null;
}

export interface IResult{
     repositories: IGitRepo[],
     gists: IGitGist[] | null
}