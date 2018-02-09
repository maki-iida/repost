import escapeStringRegexp from 'escape-string-regexp'
import sanitizeHtml from 'sanitize-html'
import emojis from './emojis.json'

const emojiStrategy = {
  match: /(^|\s):([\w+-]+)$/,
  search: (term, callback) => {
    callback(Object.keys(emojis).filter((name) => {
      return name.startsWith(term)
    }))
  },
  template: (name) => {
    return `<img src="${emojis[name]}" width="20" height="20" class="text-middle" /> ${name}`
  },
  replace: (name) => {
    return `$1:${name}: `
  }
}

const mentionStrategy = (screenNames) => {
  return {
    match: /(^|\s)@([0-9_a-zA-Z]+)$/,
    search: (term, callback) => {
      callback(screenNames.filter((name) => {
        return name.match(new RegExp(escapeStringRegexp(term), 'i'))
      }))
    },
    template: (name) => {
      return `<span class="label"><span class="label-icon">@</span> ${sanitizeHtml(name, { allowedTags: [] })}</span>`
    },
    replace: (name) => {
      return `$1@${name} `
    }
  }
}

const tagStrategy = (tagNames) => {
  return {
    match: /(^|\s)#(.+)$/,
    search: (term, callback) => {
      callback(tagNames.filter((name) => {
        return name.match(new RegExp(escapeStringRegexp(term), 'i'))
      }))
    },
    template: (name) => {
      return `<span class="label"><i class="material-icons">local_offer</i> ${sanitizeHtml(name, { allowedTags: [] })}</span>`
    },
    replace: (name) => {
      return `$1#${name} `
    }
  }
}

const textcompleteOptions = {
  dropdown: {
    item: {
      className: 'dropdown-item'
    }
  }
}

export { emojiStrategy, mentionStrategy, tagStrategy, textcompleteOptions }
