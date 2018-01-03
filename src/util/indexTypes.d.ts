
export namespace IndexTypesDefinition {
  
  export interface Body {
    branch: string;
    author: string;
    commitHash: string;
    token: string;
    commitJson: any;
  }

  export interface Options {
    uri: string;
    method: string;
    json: boolean;
    body: Body;
  }

  export interface Result {
    result: string;
    error?: ObjectOfStrings
  }

  export interface ObjectOfStrings {
    [key: string]: string;
  }
}

export interface GitInfo {
  branch: string;
  sha: string;
  abbreviatedSha: string;
  author: string;
}





