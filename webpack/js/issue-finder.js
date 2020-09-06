import {Octokit} from '@octokit/rest';
import Vue from 'vue';

import VueSelect from 'vue-select';

const octokit = new Octokit({
  auth: ''
});

const IssueCard = {
  template: `
<div class="card entry-post vertical margin-top-normal padding-normal">
  <h4 class="card-title b-header margin-bottom-small">{{ issue.title }}</h4>
  <a :href="issue.html_url" class="button is-text tiny site-link" target="_blank">
    <span class="has-color-forest-green">
      {{ issue.repository.name }}#{{ issue.number }}
    </span>
    <i class="icon external-link has-color-forest-green"></i>
  </a>
  <div class="labels margin-top-small">
    <span 
      v-for="labelName in issue.labelNames"
      class="button tag margin-right-small">
      {{ labelName }}
    </span>
  </div>
</div>`,
  props: {
    issue: {
      type: Object,
      required: true
    },
  }
}

const App = {
  el: '#vue-app',
  template: `
<div class="find-issues">
  <form id="filters">
    <label for="aspect">
      <strong>Aspect</strong><br>
      What aspect of the codebase would you like to work on?
      Leave blank if you don't have a preference.
    </label>
    <VueSelect
      v-model="filters.aspect"
      id="aspect" 
      name="aspect"
      :options="options.aspects"
      label="name"
      :reduce="aspect => aspect.code"/>
      
    <label for="skills">
      <strong>Skill set</strong><br>
      Choose up to three skills that you would like to see issues for.
      Leave blank if you don't have a preference.
    </label>
    <VueSelect
      v-model="filters.skills"
      id="skills" 
      name="skills"
      :options="options.skills"
      label="name"
      :reduce="skill => skill.code"
      :selectable="() => filters.skills.length < 3"
      multiple/>
      
    <label for="experience">
      <strong>Experience</strong><br>
      Are you a new contributor or do you have experience working with CC?
    </label>
    <VueSelect
      v-model="filters.experience"
      id="experience" 
      name="experience"
      :options="options.experiences"
      label="name"
      :reduce="experience => experience.code"
      :clearable="false"/>

    <button 
      class="button small is-success margin-top-small" 
      @click.prevent="search">
      Search
    </button>
  </form>
  
  <template v-if="issues.length">
    <issue-card 
      v-for="issue in filteredIssues" 
      :key="issue.id"
      :issue="issue"/>
  </template>
  <p
    v-else
    class="margin-top-normal">
    No results.
  </p>
</div>`,
  components: {
    VueSelect,
    IssueCard
  },
  data() {
    return {
      message: 'Hello',
      options: {
        skills: [
          {
            name: 'Python',
            code: 'python'
          },
          {
            name: 'JavaScript',
            code: 'javascript'
          },
          {
            name: 'Sass',
            code: 'sass'
          }
        ],
        experiences: [
          {
            name: 'New contributor',
            code: 'beginner'
          },
          {
            name: 'Experienced',
            code: 'experienced'
          }
        ],
        aspects: [
          {
            name: '📄 Text',
            code: '📄 aspect: text'
          },
          {
            name: '💻 Code',
            code: '💻 aspect: code'
          },
          {
            name: '🕹 Interface',
            code: '🕹 aspect: interface'
          },
          {
            name: '🤖 DX',
            code: '🤖 aspect: dx'
          }
        ]
      },
      filters: {
        aspect: null,
        skills: [],
        experience: 'experienced'
      },
      issues: []
    }
  },
  computed: {
    /**
     * Get a nested list of all the labels to search for. This is a combination
     * of the experience and aspect filter only. The skills filter must be
     * applied on the client side due to limitations of the GitHub API.
     *
     * This returns a list of lists. Each nested list corresponds to a single
     * API query and multiple queries need to be run to get the combined set of
     * valid issues.
     *
     * @returns {array} - the array of array of labels
     */
    labelsList() {
      const labelsList = [
        ['good first issue']
      ]
      if (this.filters.experience === 'experienced') {
        labelsList.push(['help wanted'])
      }
      if (this.filters.aspect) {
        labelsList.forEach(labels => {
          labels.push(this.filters.aspect)
        })
      }
      return labelsList
    },
    /**
     * Get all the promises which will yield the issues being searched for.
     *
     * @returns {array} - the array of promises that will resolve to issues
     */
    promises() {
      return this.labelsList.map(labels => this.promise(labels))
    },
    /**
     * Remove duplicates from the list of issues. Since two different API
     * queries are being collated, some issues may appear more than once. This
     * action removes such duplicates from the union of both results.
     *
     * @returns {array} - the array of issues without any duplicate entries
     */
    dedupedIssues() {
      const ids = new Set()
      const deduped = []
      this.issues.forEach(issue => {
        if (ids.has(issue.id)) {
          return
        }
        deduped.push(issue)
        ids.add(issue.id)
      })
      return deduped
    },
    filteredIssues() {
      let filtered = this.dedupedIssues
      if (this.filters.skills.length) {
        filtered = filtered.filter(issue => {
          const joinedLabels = issue.labelNames.join(',')
          return this.filters.skills.some(skill => joinedLabels.includes(skill))
        })
      }
      return filtered
    }
  },
  methods: {
    /**
     * Get a Promise for the list of issues pertaining to a given skill.
     *
     * @param {Array} labels - list of labels to search for
     * @returns {Promise} a promise that resolves into a list of issues
     */
    promise(labels = []) {
      const params = {
        org: 'creativecommons',
        state: 'open',
        filter: 'all'
      }
      if (labels) {
        params.labels = labels.join(',')
      }
      return octokit
          .issues
          .listForOrg(params)
          .then(response => response.data)
    },
    /**
     * Run the search based on the data submitted via the form and load all
     * results into the `issues` attribute.
     */
    search() {
      Promise
          .all(this.promises)
          .then(issueLists => {
            const issues = issueLists.flat()
            issues.forEach(issue => {
              issue.labelNames = issue.labels.map(label => label.name)
            })
            this.issues = issues
          })
          .catch(err => console.error(err))
    }
  }
}

$(document).ready(function () {
  window.app = new Vue(App)
})