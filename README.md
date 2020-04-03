# creativecommons.github.io-source

Source for `creativecommons.github.io`


## Overview

> **:warning: DO *NOT* MAKE CHANGES TO THE
> [creativecommons/creativecommons.github.io][ccghiorepo] REPO DIRECTLY**.

[ccghiorepo]:https://github.com/creativecommons/creativecommons.github.io

This site is built using [Lektor][lektor]. All changes to
[opensource.creativecommons.org][ccopensource]
([creativecommons.github.io][ccgithubio]) must be made **here** and deployed
via lektor (see [Deployment](#deployment), below).

[lektor]: https://www.getlektor.com/
[ccgithubio]: https://creativecommons.github.io/
[ccopensource]: https://opensource.creativecommons.org/


## Installation

1. Make sure you have [pipenv][pipenvdocs] installed.
1. Clone this repository.
1. Open your command line interface and `cd` to the repository root directory.
1. Run `pipenv install` to create a Python virtual environment and install the
   requirements for this project.

[pipenvdocs]:https://pipenv.readthedocs.io/en/latest/


### pipenv Troubleshooting

`pipenv` doesn't always provide the best error messages ([Provide better error
message if the project’s virtual environment is broken][pipenverror]). If all
else fails, try removing the virtual environment and reinstalling:
1. `pipenv --rm`
2. `pipenv install`

[pipenverror]:https://github.com/pypa/pipenv/issues/1918


## Development

- Run `pipenv run lektor server -f webpack` to start the Lektor development
  server.
- You will be able to see the website at [`http://localhost:5000/`][local5000].
  - The Lektor server will rebuild the site every time you change any content.

[local5000]:http://localhost:5000/


## Deployment

We have continuous deployment set up. To deploy, push your code to the `master`
branch (or make a pull request against the `master` branch. GitHub Actions
builds and deploys the site whenever it detects new commits on the `master`
branch.

The GitHub Actions configuration is located at
[`.github/workflows/lektor-build-deploy.yml`][lektorbuild].

[lektorbuild]: .github/workflows/lektor-build-deploy.yml


### Manual Deployment

> :warning: **For reference only, you should not need to not do this.**

When you are ready to deploy a new version of the site, run `lektor deploy`
(assuming you have your GitHub SSH key already set up and you have access to
the [creativecommons/creativecommons.github.io][ccghiorepo] repository). That's
it, it's live on production!


## Project Structure

Here's how the code is structured in the top level of the repository:
- **`assets`**: This directory contains the JavaScript and CSS files for the
  project built via webpack. Most of the JavaScript and CSS is third-party code
  and loaded via CDN so this is pretty empty.
- **`content`**: The content of the site lives here. [Here's an explanation of
  how content works in Lektor][lektorcontent]. This is probably what you'll be
  modifying most often.
- **`models`**: [All content in Lektor is associated with data
  models][lektormodels] to define their schema. Currently, we only use the
  default `page` model that ships with Lektor.
- **`templates`**: This is where the [Jinja2][jinja2] templates that render
  content are stored. See the [Lektor template documentation][lektortemplate]
  for more information.
- **`webpack`**: This is where all the webpack config files as well as Sass and
  JavaScript files for the project resides. The JavaScript and Sass files are
  compiled and saved in assets folder during lektor build process.

[lektorcontent]:https://www.getlektor.com/docs/content/
[lektormodels]:(https://www.getlektor.com/docs/models/
[jinja2]:http://jinja.pocoo.org/
[lektortemplate]:https://www.getlektor.com/docs/templates/


### Lektor Plugins

- [Lektor Plugins][plugins]:
  - [nixjdm/lektor-atom][atom]: Lektor Atom plugin.
  - [lektor/lektor-disqus-comments][disqus]: Adds disqus comments to a Lektor
    website.
  - [kmonsoor/lektor-google-analytics][lektorga]: Integration of Google
    analytics with Lektor CMS
  - [bancek/lektor-markdown-excerpt][mdexcerpt]: Adds filter for Markdown body
    excerpt.
  - [lektor/lektor-markdown-header-anchors][md-header]: Adds support for
    anchors and table of contents to Markdown.
  - [terminal-labs/lektor-strip-html-tags][striphtml]: Strip HTML tags,
    effectively turning HTML into plain text.
  - [lektor/lektor-webpack-support][webpacksupport]: Adds webpack support to
    lektor.

[plugins]: https://www.getlektor.com/docs/plugins/
[atom]: https://github.com/nixjdm/lektor-atom
[disqus]: https://github.com/lektor/lektor-disqus-comments
[lektorga]: https://github.com/kmonsoor/lektor-google-analytics
[mdexcerpt]: https://github.com/bancek/lektor-markdown-excerpt
[md-header]: https://github.com/lektor/lektor-markdown-header-anchors
[striphtml]: https://github.com/terminal-labs/lektor-strip-html-tags
[webpacksupport]: https://github.com/lektor/lektor-webpack-support


## Redirects

- `/cc-vocabulary/` to https://cc-vocabulary.netlify.com/
  - Added so that the `opensource.creativecommons.org/cc-vocabulary/` will
    continue to work with that project moving to utilize Netlify.
- `/cc-vue-vocabulary` to https://cc-vue-vocabulary.netlify.com/
  - Added so that the `opensource.creativecommons.org/cc-vue-vocabulary/` will
    continue to work with that project moving to utilize Netlify.
- `/cc-fonts` to https://cc-fonts.netlify.com/
  - Added so that the `opensource.creativecommons.org/cc-fonts/` will
    continue to work with that project moving to utilize Netlify.


## License

- [`LICENSE`](LICENSE) (Expat/[MIT][mit] License)

[mit]: http://www.opensource.org/licenses/MIT "The MIT License | Open Source Initiative"
