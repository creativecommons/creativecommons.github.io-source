# Source for creativecommons.github.io

This site is built using [Lektor](https://www.getlektor.com/). All changes to [https://creativecommons.github.io](https://creativecommons.github.io) must be made here and deployed automatically. **DO NOT MAKE CHANGES TO THE [creativecommons.github.io](https://github.com/creativecommons/creativecommons.github.io) REPO DIRECTLY**.

## Making changes

1. Make sure you have [pipenv](https://pipenv.readthedocs.io/en/latest/) installed.
1. Clone this repository.
1. Open your command line interface and `cd` to the repository root directory.
1. Run `pipenv install` to create a Python virtual environment and install the requirements for this project.
1. Run `lektor server` to start the Lektor development server. You will be able to see the website at `http://localhost:5000/`. The Lektor server will rebuild the site every time you change any content.

## Project structure

Here's how the code is structured in the top level of the repository:  
- `assets`: This directory contains the JavaScript and CSS files for the project. Most of the JavaScript and CSS is third-party code and loaded via CDN so this is pretty empty.
- `content`: The content of the site lives here. [Here's an explanation of how content works in Lektor](https://www.getlektor.com/docs/content/). This is probably what you'll be modifying most often.
- `models`: [All content in Lektor is associated with data models](https://www.getlektor.com/docs/models/) to define their schema. Currently, we only use the default `page` model that ships with Lektor.
- `templates`: This is where the [Jinja2](http://jinja.pocoo.org/) templates that render content are stored. See the [Lektor template documentation](https://www.getlektor.com/docs/templates/) for more information.

## Deploying

When you are ready to deploy a new version of the site, run `lektor deploy` (assuming you have your GitHub SSH key set up already). That's it, it's live on production!
