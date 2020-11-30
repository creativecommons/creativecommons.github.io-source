export const hydrateAppWithData = (skills, labels) => {
  skills = Array.from(
    new Set( // Remove duplicates
      Object.values(skills).flat() // Combine all skills
    )
  )
  const top_level_skills = Array.from(
    new Set( // Remove duplicates
      skills.map(skill => skill.split('/')[0]) // Keep only the prefix
    )
  )

  const categories = {}
  labels.groups.forEach(group => {
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
      categories[name] = styleName
    })
  })
  labels.standalone.forEach(label => {
    let name = `${label.emoji} ${label.name}`
    categories[name] = 'miscellaneous'
  })
  skills.forEach(skill => {
    let name = `💪 skill: ${skill.toLocaleLowerCase()}`
    categories[name] = 'skill'
  })

  return [top_level_skills, categories]
}
