import VueSelect from 'vue-select';

import {octokit} from './octokit';

export const IssueLabel = {
  template: `
<span class="gh-label" :class="className">
  {{ name }} 
</span>`,
  data() {
    return {
      labels: window.labels
    }
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    /**
     * Get the name of the class to apply to the label based on the group to
     * which it belongs. Falls back to miscellaneous if the label does not
     * belong to a group or a class cannot be identified.
     *
     * @returns {string} the name of the class to apply to the label
     */
    className() {
      return window.className[this.name] || 'miscellaneous'
    }
  }
}

export const IssueCard = {
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
    <IssueLabel 
      v-for="(name, index) in issue.labelNames"
      :key="index"
      :name="name"/>
  </div>
</div>`,
  components: {
    IssueLabel
  },
  props: {
    issue: {
      type: Object,
      required: true
    },
  }
}

export const App = {
  el: '#vue-app',
  template: `
<div class="find-issues">
  <div class="columns">
    <div class="column is-one-quarter">
      <form id="filters">
        <label for="skills">
          <strong>Skill set</strong><br>
          Choose up to three skills that you would like to see issues for.
        </label>
        <VueSelect
          v-model="filters.skills"
          id="skills" 
          name="skills"
          placeholder="No preference"
          :options="options.skills"
          :reduce="skill => skill.toLocaleLowerCase()"
          :selectable="() => filters.skills.length < 3"
          multiple/>
        <br/>  
        <label for="experience">
          <strong>Experience</strong><br>
          Is this your first time contributing to CC?
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
    </div>
    <div class="column">
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
    </div>
  </div>
</div>`,
  components: {
    VueSelect,
    IssueCard
  },
  data() {
    return {
      options: {
        skills: window.skillSet,
        experiences: [
          {name: 'Yes, it is', code: 'beginner'},
          {name: 'No, it isn\'t', code: 'experienced'}
        ]
      },
      filters: {
        skills: [],
        experience: 'experienced'
      },
      issues: []
    }
  },
  computed: {
    /**
     * Get a nested list of all the labels to search for. This is only based on
     * the experience filter. The skills filter must be applied on the client
     * side due to limitations of the GitHub API.
     *
     * This returns a list of lists. Each nested list corresponds to a single
     * API query and multiple queries need to be run to get the combined set of
     * valid issues.
     *
     * @returns {array} the array of array of labels
     */
    labelsList() {
      const labelsList = []
      if (this.filters.experience === 'experienced') {
        labelsList.push('help wanted')
      } else {
        labelsList.push('good first issue')
      }
      return labelsList
    },
    /**
     * Get a filtered list of issues matching the chosen skill labels.
     *
     * @returns {array} the array of filtered issues
     */
    filteredIssues() {
      let filtered = this.issues
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
     * Get a Promise for the list of issues pertaining to a given labels.
     *
     * @param {Array} labels - list of labels to search for
     * @returns {Promise} a promise that resolves into a list of issues
     */
    promise(labels = []) {
      const params = {
        org: 'creativecommons',
        state: 'open',
        filter: 'all',
        per_page: 200
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
      this.promise(this.labelsList)
          .then(issueLists => {
            const issues = issueLists.flat()
            issues.forEach(issue => {
              issue.labelNames = issue.labels.map(label => label.name)
            })
            this.issues = issues
          })
          .catch(err => console.error(err))
    }
  },
  mounted() {
    this.search()
  }
}