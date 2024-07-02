# Automation Test Exercise

This framework is designed using WebDriverIO, Cucumber, Multiple Cucumber HTML Reporter, and Allure reporting.


## Prerequisites

* Node.js
* npm
* chrome browser


## Installation

Follow these steps to set up the project:

* Clone this repository to your local machine:

```sh
  git clone https://github.com/Venkata-Mettu/automation-test-exercise.git
  ```

* Install the project dependencies using npm:
```sh
  npm install
  ```


## Writing tests

1. Write the tests using Cucumber BDD syntax in .feature file format under the features folder. Use the Cucumber extension in VSCode if required.
2. This framework uses the Page Object Model, so page elements and page-specific functionality can be found under the pages folder.
3. Write the necessary Step Definitions under the step-definitions folder with the correct naming conventions.

## Running Tests

To execute the tests, use the following command:

```sh
npm run test
```

## Reporting

This project uses WDIO CucumberJS JSON Reporter & Multiple Cucumber HTML Reporter and Allure for reporting. The necessary dependencies are included in package.json.


### WDIO CucumberJS JSON Reporter
This reporter generates a Cucumber JSON file for each tested feature. The JSON file is processed by the multiple-cucumber-html-reporter. It also adds metadata about the running instance to the feature file and allows you to add attachments to the JSON output.

### Multiple Cucumber HTML Reporter
This module parses the JSON output from Cucumber into a beautiful report. Unlike other reporting modules, it offers:

* A quick overview of all tested features and scenarios
* An overview that can hold multiple runs of the same feature on different browsers/devices
* The ability to search/filter/sort features
* Metadata about the used browsers/devices

The Multiple Cucumber HTML Reporter can be found at: 
```sh
 .tmp/report/index.html
```


### Allure Reporting
To generate and view Allure test reports, follow these steps:

After running the tests, the reports are automatically generated using the allure generate command. (Screenshot capturing is enabled)

Open the reports by running the following command defined in the script:
```sh
npm run openreports
```
or
```sh
npm run allure-report
```

### Logging

Logging is implemented using wdio-logs to capture test execution details, errors, and debugging information. The log files are stored in the wdio-logs folder under the project root directory
