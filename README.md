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


## Code of Conduct

[`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md):
> The Creative Commons team is committed to fostering a welcoming community.
> This project and all other Creative Commons open source projects are governed
> by our [Code of Conduct][code_of_conduct]. Please report unacceptable
> behavior to [conduct@creativecommons.org](mailto:conduct@creativecommons.org)
> per our [reporting guidelines][reporting_guide].

[code_of_conduct]: https://creativecommons.github.io/community/code-of-conduct/ "CC Open Source Code of Conduct — Creative Commons on GitHub"
[reporting_guide]: https://creativecommons.github.io/community/code-of-conduct/enforcement/ "Codes of Conduct Enforcement — Creative Commons on GitHub"


## Contributing

- See [`CONTRIBUTING.md`](CONTRIBUTING.md) for information on how to contribute
- See [Contributors to
  creativecommons/creativecommons.github.io-source][contributors] for a
  list of authors and their contributions to this project :blush:

[contributors]: https://github.com/creativecommons/creativecommons.github.io-source/graphs/contributors "Contributors to creativecommons/creativecommons.github.io-source"


## Installation

### Pre-Requisites

Make sure you have [pipenv][pipenvdocs], [Node.js][nodejswebsite] and [npm][npmdocs] installed. To install these, execute the following commands:

> For  macOS:
1. `brew install pipenv`
2. `brew install node`

> For GNU/Linux:
1. `curl https://raw.githubusercontent.com/kennethreitz/pipenv/master/get-pipenv.py | python`
2. `sudo apt update`
3. `sudo apt install nodejs`
4. `sudo apt install npm `

[pipenvdocs]:https://pipenv.readthedocs.io/en/latest/
[nodejswebsite]:https://nodejs.org/en/
[npmdocs]:https://docs.npmjs.com/ 


### Installing Project Requirements

1. Clone this repository.
2. Open your command line interface and `cd` to the repository root directory.
3. Run `pipenv install` to create a Python virtual environment and install the requirements for this project.


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
  - [nixjdm/lektor-atom][atom]: Lektor Atom plugin
  - [lektor/lektor-disqus-comments][disqus]: Adds disqus comments to a Lektor
    website
  - [kmonsoor/lektor-google-analytics][lektorga]: Integration of Google
    analytics with Lektor CMS
  - [bancek/lektor-markdown-excerpt][mdexcerpt]: Adds filter for Markdown body
    excerpt
  - [lektor/lektor-markdown-header-anchors][md-header]: Adds support for
    anchors and table of contents to Markdown
  - [lektor/lektor-markdown-highlighter][md-highlighter]: Adds support for 
    syntax highlighting in Markdown and templates
  - [terminal-labs/lektor-strip-html-tags][striphtml]: Strip HTML tags,
    effectively turning HTML into plain text
  - [lektor/lektor-webpack-support][webpacksupport]: Adds webpack support to
    lektor

[plugins]: https://www.getlektor.com/docs/plugins/
[atom]: https://github.com/nixjdm/lektor-atom
[disqus]: https://github.com/lektor/lektor-disqus-comments
[lektorga]: https://github.com/kmonsoor/lektor-google-analytics
[mdexcerpt]: https://github.com/bancek/lektor-markdown-excerpt
[md-header]: https://github.com/lektor/lektor-markdown-header-anchors
[md-highlighter]: https://github.com/lektor/lektor-markdown-highlighter
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


### Code

- [`LICENSE`](LICENSE) (Expat/[MIT][mit] License)

[mit]: http://www.opensource.org/licenses/MIT "The MIT License | Open Source Initiative"


### Content

![CC BY 4.0 license button][cc-by-png]

All the content within this repository is licensed under a [Creative Commons 
Attribution 4.0 International License][cc-by] unless otherwise
specified.

[cc-by-png]: https://licensebuttons.net/l/by/4.0/88x31.png "CC BY 4.0 license button"
[cc-by]: https://creativecommons.org/licenses/by/4.0/ "Creative Commons — Attribution-ShareAlike 4.0 International — CC BY 4.0"


### Font Awesome

> Font Awesome Free is free, open source, and GPL friendly. You can use it for
> commercial projects, open source projects, or really almost whatever you
> want. Full Font Awesome Free license: https://fontawesome.com/license/free.

> **Icons:** CC BY 4.0 License (https://creativecommons.org/licenses/by/4.0/)
> In the Font Awesome Free download, the CC BY 4.0 license applies to all icons
> packaged as SVG and JS file types.
