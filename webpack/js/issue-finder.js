import { Octokit } from "@octokit/rest"; // GitHub API
import yaml from "js-yaml"; // Parse YAML files into JS objects

// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {
  // HTML element references
  const issuesContainer = document.getElementById("issues-container");
  const aimDropdown = document.getElementById("aim");
  const skillsDropdown = document.getElementById("skills");
  const experienceDropdown = document.getElementById("experience");
  const skillFiltersDiv = document.getElementById("skill-filters");

  // Base URL for fetching YAML data
  const BASE_YAML_URL =
    "https://raw.githubusercontent.com/creativecommons/ccos-scripts/main/ccos/norm";
  const getYamlFileUrl = (fileName) => `${BASE_YAML_URL}/${fileName}.yml`;

  // Initial state for issues and filters
  let issuesList = []; // 
  const userFilters = {
    aim: "contribute", // Default to "Contribute"
    skills: [], // Default to "No preferences"
    experience: "experienced", // Default to "Experienced"
  };

  let categories = {}; // Dynamic categories for labels

  // Fetch and load filter data (skills and labels)
  async function fetchFilterData() {
    try {
      const [skillsYaml, labelsYaml] = await Promise.all([
        fetch(getYamlFileUrl("skills")).then((res) => res.text()),
        fetch(getYamlFileUrl("labels")).then((res) => res.text()),
      ]);

      const skills = yaml.safeLoad(skillsYaml);
      const labels = yaml.safeLoad(labelsYaml);

      // Hydrate and process categories
      const [skillsList, categoriesData] = hydrateAppWithData(skills, labels);
      categories = categoriesData;

      populateSkillsDropdown(Object.values(skills).flat()); // Populate skills dropdown
    } catch (error) {
      console.error("Error loading filters:", error);
    }
  }

  function hydrateAppWithData(skills, labels) {
    const categories = {};
    labels.groups.forEach((group) => {
      group.labels.forEach((label) => {
        let name = label.name;
        if (group.is_prefixed !== false) {
          name = `${group.name}: ${name}`;
        }
        if (label.has_emoji_name !== false) {
          name = `${label.emoji} ${name}`;
        }
        let styleName = label.color;
        if (/^[A-Z]+$/.test(styleName)) {
          styleName = `${group.name}-${styleName.toLocaleLowerCase()}`;
        } else {
          styleName = group.name;
        }
        categories[name] = styleName;
      });
    });

    labels.standalone.forEach((label) => {
      let name = `${label.emoji} ${label.name}`;
      categories[name] = "miscellaneous";
    });

    skills = Array.from(new Set(Object.values(skills).flat()));

    return [skills, categories];
  }

  function populateSkillsDropdown(skills) {
    // Process skills to remove duplicates
    const uniqueSkills = Array.from(new Set(Object.values(skills).flat())); // Flatten and remove duplicates
    const topLevelSkills = Array.from(
      new Set(uniqueSkills.map((skill) => skill.split("/")[0]))
    ); // Extract prefixes

    // Populate skills dropdown
    const skillsDropdown = document.getElementById("skills");
    skillsDropdown.innerHTML = ""; // Clear existing options
    const noPreferenceOption = document.createElement("option");
    noPreferenceOption.value = ""; // Empty value for no preference
    noPreferenceOption.textContent = "No preferences";
    skillsDropdown.appendChild(noPreferenceOption);
    // Add each top-level skill to the dropdown
    topLevelSkills.forEach((skill) => {
      const optionElement = document.createElement("option");
      optionElement.value = skill.toLowerCase();
      optionElement.textContent = skill;
      skillsDropdown.appendChild(optionElement);
    });
  }

  // Build GitHub search query based on user-selected filters
  function loadIssues() {
    const query = ["org:creativecommons", "is:open", "is:issue"];

    if (userFilters.aim === "contribute") query.push('label:"help wanted"');
    if (userFilters.aim === "triage")
      query.push('label:"🚦 status: awaiting triage"');
    if (userFilters.aim === "label")
      query.push('label:"🏷 status: label work required"');

    return query.join(" ");
  }

  // Fetch and display GitHub issues based on filters
  async function fetchAndDisplayIssues() {
    try {
      const octokit = new Octokit();
      const query = loadIssues();
      const response = await octokit.search.issuesAndPullRequests({
        q: query,
        per_page: 100,
        sort: "created",
        order: "desc",
      });

      // Extract needed data from issues
      issuesList = response.data.items.map((issue) => ({
        ...issue,
        labels: issue.labels.map((label) => label.name),
        repo: issue.repository_url.split("/").pop(),
      }));

      displayFilteredIssues(); // Display filtered issues
    } catch (error) {
      console.error("Error loading GitHub issues:", error);
    }
  }

  // Function to display filtered issues with dynamic label classes
  function displayFilteredIssues() {
    issuesContainer.innerHTML = ""; // Clear any existing issues

    const filteredIssues = issuesList.filter((issue) => {
      if (userFilters.aim !== "contribute") return true;

      // Show only "good first issues" for beginners
      if (
        userFilters.experience === "beginner" &&
        !issue.labels.includes("good first issue")
      )
        return false;

      // Check if issue matches selected skills
      if (
        userFilters.skills.length &&
        !userFilters.skills.some((skill) =>
          issue.labels.includes(`💪 skill: ${skill}`)
        )
      )
        return false;

      return true; // Show issue if it meets all criteria
    });

    // Show "No results" message if no issues match
    if (filteredIssues.length === 0) {
      issuesContainer.innerHTML = "<p>No results.</p>";
      return;
    }

    // Create an issue card for each filtered issue
    filteredIssues.forEach((issue) => {
      const issueCard = document.createElement("div");
      issueCard.className = "issue-card";
      //safely render the title
      const titleElement = document.createElement("h4");
      titleElement.textContent = issue.title; // Safely set text content

      issueCard.innerHTML = `
      <p>
        <a href="${issue.html_url}" target="_blank">
          <span>${issue.repo}#${issue.number}</span>
        </a>
        opened on ${issue.created_at.split("T")[0]}.
      </p>
      <div class="labels">
        ${issue.labels
          .map((label) => {
            const labelClass = categories[label] || "miscellaneous";
            return `<span class="gh-label ${labelClass}">${label}</span>`;
          })
          .join("")}
      </div>
    `;
      // Add the title element before everything else in the issue card
      issueCard.prepend(titleElement);
      issuesContainer.appendChild(issueCard);
    });
  }

  // Update filters and reload issues when the user changes selections
  aimDropdown.addEventListener("change", (event) => {
    userFilters.aim = event.target.value;
    skillFiltersDiv.style.display =
      userFilters.aim === "contribute" ? "block" : "none";
    fetchAndDisplayIssues();
  });

  skillsDropdown.addEventListener("change", (event) => {
    const selectedSkills = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    userFilters.skills = selectedSkills.includes("") ? [] : selectedSkills;
    displayFilteredIssues();
  });

  experienceDropdown.addEventListener("change", (event) => {
    userFilters.experience = event.target.value;
    displayFilteredIssues();
  });

  // Load filters and issues when the page loads
  fetchFilterData();
  fetchAndDisplayIssues();
});
