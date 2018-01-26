
// types used in index file
export namespace index {
  export interface Body {
    branch: string;
    author: string;
    commitHash: string;
    token: string;
    commitJson: ObjectKeysStrinsAndValuesAny;
  }

  export interface Options {
    uri: string;
    method: string;
    json: boolean;
    body: Body;
  }

  export interface IndexResult {
    result: string;
    error?: string;
  }
}



// types used in gitInfoReader
export namespace gitInfoReader {
  export interface LogData {
    hash: string;
    author: string;
  }
  
  export interface Result {
    author: string,
    hash: string,
    branch: string,
  }
  
  export interface GetAuthorAndHash {
    (): Promise<LogData | string>; 
  }

  export interface GetGitData {
    (): Promise<Result | string>;
  }

  export interface FuncReturnsPromiseString {
    (): Promise<string>;
  }
}



// types used in envVariablesValidator
export namespace envVariables {
  export interface EnvVariables {
    serverUrl: string;
    token: string;
    coverageJson: string;
  }
  
  export interface GetEnvVariblesFunc {
    (): Promise<EnvVariables>;
  }
}



// Generic function, used in fileReader
export interface FuncStringToPromiseString {
  (str: string): Promise<string>;
}

// Generic object, use for tests
export interface ObjectStringsKeysAndValues {
  [key:string]: string; 
}

// Super Generic object
export interface ObjectKeysStrinsAndValuesAny {
  [key:string]: any;
}
