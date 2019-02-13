# Code Quality CLI
[![Build Status](https://travis-ci.org/jmariomejiap/codeQualityCLI.svg?branch=master)](https://travis-ci.org/jmariomejiap/codeQualityCLI)
[![Coverage Status](https://coveralls.io/repos/github/jmariomejiap/codeQualityCLI/badge.svg?branch=master)](https://coveralls.io/github/jmariomejiap/codeQualityCLI?branch=master)


Code Quality CLI is a tool for CI/CD, designed to run automatically whenever code is deployed. It reports Git information, and Code Coverage Results to [`Code Quality`](https://github.com/jmariomejiap/codeQuality) for visualization.

It was built using Typescript.


## Demo

![codeqcli](https://user-images.githubusercontent.com/22829270/39217266-0f2791be-47d4-11e8-9e88-a898eea0cc91.gif)




## Getting Started

#### Installation



First
```
$ git clone https://github.com/jmariomejiap/codeQualityCLI.git
```

install dependencies.
```
$ npm install 
```

## Configure your App to report and visualize its code coverage.

In order for the codeQuality Platform to receive and track the progress you make while developing your App you must add [`CodeQualityCLI`](https://github.com/jmariomejiap/codeQualityCLI) dependency to your project and enable a Continues Integration service of your choice.

The idea is to use CI to run your tests on every new commit to your repository. Once the tests are run a summary will be generated (make sure your the testing framework is configured to generate this report) and automatically sent to **codeQuality**.

1. Add **CodeQualityCLI** as a dependency to the project for which you want to do codeQuality.

![screen shot 2019-02-12 at 10 28 54 pm](https://user-images.githubusercontent.com/22829270/52682474-f43d7d80-2f15-11e9-8f48-31e75b883ecc.png)



2. Add two scripts to your **package.json** to generate coverage report and to send its results to codeQuality.
   (--coverage flag may vary across testing frameworks, example below uses _jest_)

```
"coverage-report": "npm test -— -—coverage",
"report-codeQuality": "cd ./node_modules/code-quality-cli && npm install && npm run start:dev"
```


CodeQualityCLI needs the output generated by istanbul (json-summary) to extract the data that will be send for visualization. You must specify the type of reporter your test framework will use.

3. Add jest configuration to your **package.json**.

```
"jest": {
  "coverageReporters": [
    "text",
    "json-summary"
  ]
}
```


Since CodeQualityCLI is designed to run in the CI of your choice 

Now, let's add a `.yml` file and the scripts needed to send the report.

This is an example using **Travis-CI**

4.  Add a `.travis.yml` file to your project.

```
language: node_js
node_js:
  - "9"

install:
  - npm install

services: mongodb

script:
  - npm run test
  - npm run coverage-report
  - npm run report-codeQuality

```

All set on this end.

---

### Configure Travis


1. Login into your travis account.
2. Select the your project.
3. Go to Settings
4. Under _Environment Variables_ section.

- You must provide **3** environment variables to your CI/CD configuration.

```
  CODE_QUALITY_SERVER_URL = https://<..........>/api/v1/commit
  CODE_QUALITY_TOKEN = fa2331-dfadfa-1223fs
  CODE_QUALITY_JSON_COVERAGE = path to coverage data. (ex. ../../coverage/coverage-summary.json)
```

**What is CODE-QUALITY-SERVER-URL ?**

The CodeQuality Application that you have already deployed and running, exposes an endpoint `/api/v1/commit`.
You will need to add this to your domain so the your code coverage summary can be received and visualized

example.

`https://code-quality.herokuapp.com/api/v1/commit`

**What is CODE-QUALITY-TOKEN ?**

When you create a new project (follow instructions inside [`Code Quality`](https://github.com/jmariomejiap/codeQuality) repo) a `projectKey` is generated. This key is your **CODE_QUALITY_TOKEN**. Since you can manage and visualize multiple projects with CodeQuality, this token helps the platform know where to put an incoming report.

**What is CODE-QUALITY-JSON-COVERAGE ?**

Since CodeQualityCLI dependency is located inside your `node_modules` we need to pass the correct path to the **coverage** folder that was generated when test were run.

Normally this path will be `../../coverage/coverage-summary.json`. Make sure the output generate is `coverage-summary.json`, in case it is not, verify your jest config.


You can find more information in the **CodeQuality** [`Readme`](https://github.com/jmariomejiap/codeQuality) 

## Contributing

I welcome contributions! Please open an issue if you have any feature ideas or find any bugs. I also accept pull requests with open arms. I will go over the issues when I have time. :)
