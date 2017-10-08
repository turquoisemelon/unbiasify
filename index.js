const StorageArea = chrome.storage.local
const KEYS = ['linkedinPhotos', 'linkedinNames']

const setStorageValue = (val, callback) => {
  StorageArea.set(val, function() {
    if (callback) {
      callback()
    }
  })
}

const getStoredSettings = async () => {
  return new Promise(function(resolve, reject) {
    StorageArea.get(KEYS, values => {
      resolve(values)
    })
  })
}

const injectScripts = () => {
  return new Promise(function(resolve, reject) {
    // TODO - Check if page is linkedin
    chrome.tabs.executeScript(
      {
        file: 'page-scripts/linkedin.js'
      },
      () => {
        resolve()
      }
    )
  })
}

// When a tab finishes loading; hide stuff if applicable
// Todo - inject scripts on page start if valid url
chrome.tabs.onUpdated.addListener(function(tabId, info) {
  if (info.status === 'complete') {
    chrome.tabs.get(tabId, async tab => {
      if (tab.url.includes('linkedin')) {
        let settings = await getStoredSettings()
        await injectScripts()

        if (settings.linkedinPhotos) {
          chrome.tabs.executeScript({
            code: `
              obscureLinkedinPhotos()`
          })
        }

        if (settings.linkedinNames) {
          chrome.tabs.executeScript({
            code: `
              obscureLinkedinNames()`
          })
        }
      }
    })
  }
})

document.addEventListener('DOMContentLoaded', async () => {
  let settings = await getStoredSettings()

  // TODO - remove jQuery dependency
  $('#clear-photos')
    .off()
    .on('click', function() {
      settings.linkedinPhotos = !settings.linkedinPhotos
      setStorageValue({ linkedinPhotos: settings.linkedinPhotos })

      chrome.tabs.executeScript({
        code: `
        if (${settings.linkedinPhotos}) {
          obscureLinkedinPhotos()
        } else {
          resetLinkedinPhotos()
        }
      `
      })
    })

  $('#clear-names')
    .off()
    .on('click', function() {
      settings.linkedinNames = !settings.linkedinNames
      setStorageValue({ linkedinNames: settings.linkedinNames })

      chrome.tabs.executeScript({
        code: `
        if (${settings.linkedinNames}) {
          obscureLinkedinNames()
        } else {
          resetLinkedinNames()
        }
        `
      })
    })
})

// TODO -- Can we remove this? What's this for?
// chrome.browserAction.onClicked.addListener(tab => {
// chrome.tabs.executeScript({
//   code: `
//     var prevStyle = document.getElementById('BIAS_LINKEDIN');
//
//     if (prevStyle) {
//       prevStyle.parentNode.removeChild(prevStyle);
//     } else {
//       const style = document.createElement('style');
//       style.id = 'BIAS_LINKEDIN';
//
//       document.body.appendChild(style);
//
//       const obfuscate = [
//         "span.full-name, a[href^='https://www.linkedin.com/profile'], #sticky-rail * { color: black !important; background-color: black !important; }",
//
//         "img { opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important; }",
//
//         "#aux > div.insights > h3 { color: black !important; background-color: black !important; }",
//
//         "#aux > div.insights > h3::after { content: ''; text-indent: 0; display: block; line-height: initial; }",
//
//         "[id^='control_gen_'] > div.header > h3 { color: black !important; background-color: black !important; }",
//
//         "[id^='control_gen_'] > div.header > h3::after { content: ''; text-indent: 0; display: block; line-height: initial; }",
//
//         "#in-common > svg > circle[fill^='url('] { fill-opacity: 0 !important; fill: black !important; }"
//       ];
//
//       const nameObfuscate = [
//         '[data-control-name="identity_welcome_message"] { color: white !important; background-color: white !important; }',
//         '.neptune-grid > .launchpad__title { opacity: 0; }',
//         '[data-control-name="actor"] > h3 >  span { color: white !important; background-color: white !important; }',
//         '.hoverable-link-text { display: none; }',
//         '[class*="name"] { display: none !important; }',
//         '[class*="person-info__shared"] { opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important; }',
//         '.msg-conversation-card__message-snippet-body { opacity: 0; }',
//         '.profile-rail-card__actor-link > p { display: none; }',
//         '.pv-contact-info__card-sub-heading { opacity: 0; }',
//         '.pv-entity__summary-info > p { display: none; }',
//         '[data-control-name="edit_endorsements"] { visibility: hidden; }'
//       ];
//
//       obfuscate.forEach((r, i) => style.sheet.insertRule(r, i));
//       nameObfuscate.forEach((r,i) => style.sheet.insertRule(r,i));
//     }
//   `
// })
// });
