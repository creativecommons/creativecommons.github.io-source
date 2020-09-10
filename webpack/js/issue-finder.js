import Vue from 'vue';

import {hydrateAppWithData} from './hydration';
import {App} from './components'

$(document).ready(function () {
  const BASE_URL = 'https://raw.githubusercontent.com/creativecommons/ccos-scripts/master/normalize_repos'
  const FILE_URL = name => `${BASE_URL}/${name}.json`

  Promise
      .all([
        fetch(FILE_URL('skills'))
            .then(response => response.json())
            .then(data => {
              window.skills = data
            }),
        fetch(FILE_URL('labels'))
            .then(response => response.json())
            .then(data => {
              window.labels = data
            })
      ])
      .then(() => {
        hydrateAppWithData()
        window.app = new Vue(App)
      })
      .catch(err => console.error(err))
})
