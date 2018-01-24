
export namespace index {

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
    error?: string;
  }
}

export interface Log {
  sha: string;
  author: string;
}


export interface FuncStringToPromiseString {
  (str: string): Promise<string>;
}

export interface EnvVariables {
  serverUrl: string;
  token: string;
  coverageJson: string;
}

export interface GetEnvVariblesFunc {
  (): Promise<EnvVariables>;
}


