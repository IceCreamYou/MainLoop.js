Thank you for your interest in contributing to this library!

## Using the issue tracker

The issue tracker on GitHub is the preferred channel for bug reports, feature
requests, and submitting pull requests about this project.

## Pull requests

If you submit a pull request that changes source code, please run a build
before submitting so that your pull request also includes the built code and
documentation. Running a build will also run code style checks. When you submit
a pull request, the code changes will be automatically linted by
[Travis CI](https://travis-ci.com/) and the pull request will only be merged if
the checks pass.

To run a build or lint, you must have the following dependencies installed:
- [node.js](https://nodejs.org/en/)
- [grunt-cli](http://gruntjs.com/getting-started)
- [ruby](https://www.ruby-lang.org/en/) (to generate documentation)
- [jsduck](https://github.com/senchalabs/jsduck) (to generate documentation)

To set up the build, run `npm install` on the command line from the directory
containing the library's code. This will install software (listed in
`package.json` if you want to check) which is used to perform the build and
linting. Once you do this, you will not need to do it again. To upgrade these
developer dependencies, run `npm update`.

To run a build, just run `grunt` on the command line from the directory
containing the extension's code. To run just the code style checks, run
`grunt lint`. If you'd like the linting to run any time you change a source
code file, run `grunt watch` and it will run in the background.

## License

By submitting a contribution to this project, you agree to allow the project
owners to license your work as part of this project under this project's
[license](LICENSE.txt).
