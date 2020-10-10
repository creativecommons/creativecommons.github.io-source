import VueSelect from 'vue-select';

import {hydrateAppWithData} from "./hydration";

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
      return this.$root.categories[this.name] || 'miscellaneous'
    }
  }
}

export const IssueCard = {
  template: `
<div class="card entry-post vertical margin-top-normal padding-normal">
  <h4 class="card-title b-header margin-bottom-small">
    {{ issue.title }}
  </h4>
  <p class="is-size-6">
    <a
      :href="issue.url"
      target="_blank">
      <span class="has-color-forest-green">
        {{ issue.repo }}#{{ issue.number }}
      </span>
      <i
        class="icon external-link has-color-forest-green is-size-7"
        :style="{ verticalAlign: 'baseline' }">
      </i>
    </a>
    &nbsp;&nbsp;opened on {{ dateCreated }}.
  </p>
  <div class="labels margin-top-small">
    <IssueLabel
      v-for="(name, index) in issue.labels"
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
  },
  computed: {
    dateCreated() {
      const dateCreated = new Date(this.issue.createdAt * 1000)
      const [dateComponent,] = dateCreated.toISOString().split("T")
      return dateComponent
    }
  }
}

export const App = {
  el: '#vue-app',
  template: `
<div class="find-issues">
  <div class="columns">
    <div class="column is-one-quarter">
      <form id="filters" v-if="options.skills.length">
        <label for="skills">
          <strong>*Skill set</strong><br/>
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
          <strong>Experience</strong><br/>
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
      </form>
      <div v-else>
        Loading filters, please wait...
      </div>
    </div>
    <div class="column">
      <template v-if="filteredIssues.length">
        <IssueCard
          v-for="(issue, index) in filteredIssues"
          :key="index"
          :issue="issue"/>
      </template>
      <p
        v-else
        class="margin-top-normal">
        No results.
      </p>
    </div>
  </div>
  <p>
  <small>
Not all issues have skills marked on them, especially if they are simple issues that 
do not require proficiency in any specific framework or language.Those issues will not 
appear when filtering by skill in the <a href="https://opensource.creativecommons.org/contributing-code/issue-finder/">Issue Finder</a>
  </small>
  </p>
   
</div>`,
  components: {
    VueSelect,
    IssueCard
  },
  data() {
    return {
      options: {
        skills: [],
        experiences: [
          {name: 'Yes, it is', code: 'beginner'},
          {name: 'No, it isn\'t', code: 'experienced'}
        ]
      },
      filters: {
        skills: [],
        experience: 'experienced'
      },
      categories: {},
      issues: []
    }
  },
  computed: {
    /**
     * Get a filtered list of issues matching the chosen skill labels.
     *
     * @returns {array} the array of filtered issues
     */
    filteredIssues() {
      return window.issues.filter(issue => {
        // Check experience match
        if (this.filters.experience === 'beginner' && !issue.labels.includes('good first issue')) {
          return false
        }

        // Check skill set match
        const joinedLabels = issue.labels.join(',')
        if (this.filters.skills.length && !this.filters.skills.some(skill => joinedLabels.includes(skill))) {
          return false
        }

        return true
      }).sort((a, b) => b.createdAt - a.createdAt)
    }
  },
  mounted() {
    const BASE_URL = 'https://raw.githubusercontent.com/creativecommons/ccos-scripts/master/normalize_repos'
    const FILE_URL = name => `${BASE_URL}/${name}.json`

    Promise
        .all([
          fetch(FILE_URL('skills'))
              .then(response => response.json()),
          fetch(FILE_URL('labels'))
              .then(response => response.json())
        ])
        .then(([skillResponse, labelResponse]) => {
          const [skills, categories] = hydrateAppWithData(skillResponse, labelResponse)
          this.categories = categories
          this.options.skills = skills
        })
        .catch(err => console.error(err))
  }
}
