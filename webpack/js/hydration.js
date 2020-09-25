export const hydrateAppWithData = () => {
  window.skills = Array.from( // Convert back into an array
      new Set( // Remove duplicates
          Object.values(window.skills)
              .flat() // Combine all skills
              .map(skill => skill.split('/')[0]) // Keep only the prefix
      )
  )

  window.categories = {}
  window.labels.groups.forEach(group => {
    group.labels.forEach(label => {
      let name = label.name
      if (group.is_prefixed !== false) {
        name = `${group.name}: ${name}`
      }
      if (label.has_emoji_name !== false) {
        name = `${label.emoji} ${name}`
      }
      let styleName = label.color;
      if (/^[A-Z]+$/.test(styleName)) {
        styleName = `${group.name}-${styleName.toLocaleLowerCase()}`
      } else {
        styleName = group.name
      }
      window.categories[name] = styleName
    })
  })
  window.labels.standalone.forEach(label => {
    let name = `${label.emoji} ${label.name}`
    window.categories[name] = 'miscellaneous'
  })
  window.skills.forEach(skill => {
    let name = `💪 skill: ${skill.toLocaleLowerCase()}`
    window.categories[name] = 'skill'
  })
}