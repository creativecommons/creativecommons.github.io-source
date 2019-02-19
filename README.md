# creativecommons.github.io-source

Source for `creativecommons.github.io`


## Overview

This site is built using [Lektor][lektor]. All changes to
[https://creativecommons.github.io][ccgithubio] must be made **here** and
deployed via lektor (see [Deploying](#deploying), below).

**:warning:DO *NOT* MAKE CHANGES TO THE [creativecommons.github.io][ccghiorepo]
REPO DIRECTLY**.

[lektor]:https://www.getlektor.com/
[ccgithubio]:https://creativecommons.github.io
[ccghiorepo]:https://github.com/creativecommons/creativecommons.github.io


## Installation

1. Make sure you have [pipenv][pipenvdocs] installed.
1. Clone this repository.
1. Open your command line interface and `cd` to the repository root directory.
1. Run `pipenv install` to create a Python virtual environment and install the
   requirements for this project.

[pipenvdocs]:https://pipenv.readthedocs.io/en/latest/


## Development

1. Run `pipenv shell` to spawn a shell with the virtualenv activated
1. Run `lektor server` to start the Lektor development server. You will be able
   to see the website at [`http://localhost:5000/`][lektorlocal]. The Lektor
   server will rebuild the site every time you change any content.

[lektorlocal]:http://localhost:5000/


## Deploying

We have continuous deployment set up. Travis CI builds and deploys the site whenever it detects new commits on the `master` branch.

### Manual Deployment

When you are ready to deploy a new version of the site, run `lektor deploy`
(assuming you have your GitHub SSH key already set up and you have access to
the [creativecommons.github.io][ccghiorepo] repository). That's it, it's live
on production!


## Project Structure

Here's how the code is structured in the top level of the repository:
- **`assets`**: This directory contains the JavaScript and CSS files for the
  project. Most of the JavaScript and CSS is third-party code and loaded via
  CDN so this is pretty empty.
- **`content`**: The content of the site lives here. [Here's an explanation of
  how content works in Lektor][lektorcontent]. This is probably what you'll be
  modifying most often.
- **`models`**: [All content in Lektor is associated with data
  models][lektormodels] to define their schema. Currently, we only use the
  default `page` model that ships with Lektor.
- **`templates`**: This is where the [Jinja2][jinja2] templates that render
  content are stored. See the [Lektor template documentation][lektortemplate]
  for more information.

[lektorcontent]:https://www.getlektor.com/docs/content/
[lektormodels]:(https://www.getlektor.com/docs/models/
[jinja2]:http://jinja.pocoo.org/
[lektortemplate]:https://www.getlektor.com/docs/templates/
