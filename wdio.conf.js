import fs from 'node:fs/promises'
import { generate } from 'multiple-cucumber-html-reporter'
import cucumberJson from 'wdio-cucumberjs-json-reporter';


export const config = {
    runner: 'local',
    specs: [
        './features/**/*.feature'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome',
        'cjson:metadata': {
            browser: {
                name: 'chrome',
                version: '126',
            },
            app: {
                name: 'automation.test.exercise',
                version: '1.2.3',
            },
            device: 'MacBook Air M2,2022',
            platform: {
                name: 'OSX',
                version: '14.5'
            }
        },
    }],

    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    outputDir: 'wdio-logs',
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    // baseUrl: 'http://localhost:8080',
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    // Default request retries count
    connectionRetryCount: 3,
    // Test runner services
    // services: [],

    framework: 'cucumber',
    // specFileRetries: 1,
    // specFileRetriesDelay: 0,
    // specFileRetriesDeferred: false,
    reporters: ['spec', ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: true
    }], 'cucumberjs-json',
        ['cucumberjs-json', {
            jsonFolder: '.tmp/new/',
            language: 'en',
        },
        ],],

    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        require: ['./step-definitions/*.js'],
        // <boolean> show full backtrace for errors
        backtrace: true,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <string[]> Only execute the scenarios with name matching the expression (repeatable).
        name: [],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '',
        // <number> timeout for step definitions
        timeout: 60000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },

    // =====
    // Hooks
    // =====

    onPrepare: () => {
        return fs.rm('.tmp/', { recursive: true });
    },

    before: async function (capabilities, specs) {
        await browser.addCommand('waitForPageToLoad', async function (timeout = 10000) {
            await this.waitUntil(async () => {
                const state = await this.execute(() => document.readyState);
                return state === 'complete';
            }, {
                timeout: timeout,
                timeoutMsg: 'Page did not load within the timeout period'
            });
        });
    },

    afterStep: async function (step, scenario, { error, duration, passed }, context) {
        if (error) {
            cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
        }
    },

    onComplete: () => {
        generate({
            jsonDir: '.tmp/json/',
            reportPath: '.tmp/report/',
        });

        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
}
