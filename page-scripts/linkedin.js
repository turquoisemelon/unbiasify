const obscureLinkedinPhotos = () => {
  const style = document.createElement('style')
  style.id = 'BIAS_LINKEDIN'

  document.body.appendChild(style)

  const obfuscate = [
    "span.full-name, a[href^='https://www.linkedin.com/profile'], #sticky-rail * { color: black !important; background-color: black !important; }",

    'img { opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important; }',

    '#aux > div.insights > h3 { color: black !important; background-color: black !important; }',

    "#aux > div.insights > h3::after { content: ''; text-indent: 0; display: block; line-height: initial; }",

    "[id^='control_gen_'] > div.header > h3 { color: black !important; background-color: black !important; }",

    "[id^='control_gen_'] > div.header > h3::after { content: ''; text-indent: 0; display: block; line-height: initial; }",

    "#in-common > svg > circle[fill^='url('] { fill-opacity: 0 !important; fill: black !important; }"
  ]

  obfuscate.forEach((r, i) => style.sheet.insertRule(r, i))
}

const resetLinkedinPhotos = () => {
  var prevStyle = document.getElementById('BIAS_LINKEDIN')
  if (prevStyle) {
    prevStyle.parentNode.removeChild(prevStyle)
  }
}

const obscureLinkedinNames = () => {
  const style = document.createElement('style')
  style.id = 'BIAS_NAMES_LINKEDIN'

  document.body.appendChild(style)

  const nameObfuscate = [
    '[data-control-name="identity_welcome_message"] { color: white !important; background-color: white !important; }',
    '.neptune-grid > .launchpad__title { opacity: 0; }',
    '[data-control-name="actor"] > h3 >  span:first-child { visibility: hidden;}',
    '[data-control-name="actor"] > h3 >  span:first-child:before { content: "Link to Profile"; visibility: visible;}',
    'span[class*="-name"] { visibility: hidden !important; }',
    'span[class*="-name"]:before { content: "Link to Profile"; visibility: visible !important; }',
    'span[class*="__name"] { visibility: hidden !important; }',
    'h3[class*="__name"] { visibility: hidden !important; }',
    'h3[class*="-name"] { visibility: hidden !important; }',
    'a[class*="name"] { visibility: hidden !important; }',
    'h3[class*="__name"]:before { content: "Link to Profile"; visibility: visible !important; }',
    'a[class*="name"]:before { content: "Link to Profile"; visibility: visible !important; }',
    '[class*="person-info__shared"] { opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important; }',
    '.msg-conversation-card__message-snippet-body { opacity: 0; }',
    '.profile-rail-card__actor-link > p { visibility: hidden; }',
    '.pv-contact-info__card-sub-heading { opacity: 0; }',
    '.pv-entity__summary-info > p { visibility: hidden; }',
    '.entity-hovercard { opacity:0 !important;}',
    '[data-control-name="edit_endorsements"] { visibility: hidden; }',
    '[data-control-name="update_topbar_actor"] {visibility: hidden;}',
    '.pv-recent-activity-section__card-heading {visibility: hidden}',
    '[data-control-name="update_topbar_actor"]:before {content: "Link to Profile"; visibility: visible;}',
    '[data-control-name="topcard"] h2 { visibility:hidden !important; }',
    '[data-control-name="topcard"] h2:before { content: "Link to Profile"; visibility:visible !important; }',
    '.pv-top-card-section__name:before {content : "" !important;}',
    '.pv-top-card-section__name {visibility: hidden !important;}',
    'span[class*="school"] { visibility: visible !important; }',
    'span[class*="school"]:before { content: "" !important; }',
    'span[class*="skill"]:before { content: "" !important; }',
    'span[class*="skill"] { visibility: visible !important; }',
    'span[class*="degree"]:before { content: "" !important; }',
    'span[class*="degree"] { visibility: visible !important; }'
  ]

  nameObfuscate.forEach((r, i) => style.sheet.insertRule(r, i))
}

const resetLinkedinNames = () => {
  var prevStyle = document.getElementById('BIAS_NAMES_LINKEDIN')
  prevStyle.parentNode.removeChild(prevStyle)
}
