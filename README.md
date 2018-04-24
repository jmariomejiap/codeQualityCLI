# Code Quality CLI

Code Quality CLI is a tool for CI/CD, designed to be run automatically whenever code is deployed. It reports Git information, and Code Coverage Results to CodeQuality Server for visualization.

It was built using Typescript.


## Demo

![codeqcli](https://user-images.githubusercontent.com/22829270/39217266-0f2791be-47d4-11e8-9e88-a898eea0cc91.gif)




## Getting Started

##### Installation



First
```
$ git clone https://github.com/jmariomejiap/codeQualityCLI.git
```

install dependencies.
```
$ npm install 
```
or 
```
$ yarn install
```

##### Usage
Example with GitLab Continuous Integration & Deployment
___
* create a **script** inside your **package.json**

```
    "codeQualityCLI": "cd ./node_modules/code-quality-cli && npm install && npm run start:dev"
    
```
* inside `.gitlab-ci.yml` file execute the script

```
test_backend:
  script:
   - npm install --silent
   - npm run codeQualityCLI
```


* You must provide **2** environment variables to your CI/CD configurarion.(settings/secret variables)

```
    - CODE_QUALITY_SERVER_URL = where you will receive the output
    - CODE_QUALITY_TOKEN = a token for an specific project. where output will be visualized
```

* The output would be a Post request to the URL passed in your enviroment variables with a payload that looks like this.

```
{
	"token" : "fBSSBSBS090-18d6-11e8-9XXX-6fXXXXXXX555xxx",
	"commitJson" : {
		"total" : {
			"lines": {"total": 480, "covered": 345, "skipped": 0, "pct": 90},
			"statements": { "total": 775, "covered": 623, "skipped": 19, "pct": 92.39},
	    	"functions": {"total": 161, "covered": 85, "skipped": 0, "pct": 52.8},
	    	"branches": { "total": 241, "covered": 149, "skipped": 11,"pct": 61.83},
	    	"linesCovered": { "1": 82, "2": 69, "3": 37, "56": 6, "151": 3}
		}
	},
	"author" : "mario mejia",
	"branch" : "develop",
	"commitHash" : "adfadfadf",
	"message" : "adding improvements to code coverage. over 90%!!!",
	"date" : "2018-01-08T21:20:50.388Z"
}


```



___
## Contributing
I welcome contributions! Please open an issues if you have any feature ideas or find any bugs. I also accept pull requests with open arms. I will go over the issues when I have time. :)




