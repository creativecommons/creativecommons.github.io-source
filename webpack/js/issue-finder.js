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

  // Fetch and load filter data (skills and labels)
  async function fetchFilterData() {
    try {
      const [skillsYaml, labelsYaml] = await Promise.all([
        fetch(getYamlFileUrl("skills")).then((res) => res.text()),
        fetch(getYamlFileUrl("labels")).then((res) => res.text()),
      ]);

      const skills = yaml.safeLoad(skillsYaml);
      populateSkillsDropdown(Object.values(skills).flat()); // Populate skills dropdown
    } catch (error) {
      console.error("Error loading filters:", error);
    }
  }

  // Populate the skills dropdown with options
  function populateSkillsDropdown(skillsArray) {
    skillsDropdown.innerHTML = ""; // Clear existing options
    const noPreferenceOption = document.createElement("option");
    noPreferenceOption.value = ""; // Empty value for "No preferences"
    noPreferenceOption.textContent = "No preferences";
    skillsDropdown.appendChild(noPreferenceOption);

    // Add a dropdown option for each skill
    skillsArray.forEach((skill) => {
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

  // function to display filtered issues
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
      issueCard.innerHTML = `
        <h4>${issue.title}</h4>
        <p>
          <a href="${issue.html_url}" target="_blank">
            <span>${issue.repo}#${issue.number}</span>
          </a>
          opened on ${issue.created_at.split("T")[0]}.
        </p>
        <div class="labels">
          ${issue.labels
            .map((label) => `<span class="label">${label}</span>`)
            .join("")}
        </div>
      `;
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
