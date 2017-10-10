var togglePhotos =  false;
var toggleNames = false;
var toggleAlPhotos = false;
var toggleAlNames = false;

chrome.storage.sync.get('togglePhotos', function(data) {
    togglePhotos = data.togglePhotos;
    if (togglePhotos) {
        clearPhotos()
    }
});

chrome.storage.sync.get('toggleNames', function(data) {
    toggleNames = data.toggleNames;
    if (toggleNames)  {
        clearNames()
    }
});

chrome.storage.sync.get('toggleAlNames', function(data) {
    toggleAlNames = data.toggleAlNames;
    if (toggleAlNames)  {
        clearAlNames()
    }
});

chrome.storage.sync.get('toggleAlPhotos', function(data) {
    toggleAlPhotos = data.toggleAlPhotos;
    if (toggleAlPhotos)  {
        clearAlPhotos()
    }
});

function clearAlNames() {
    var prevStyle = document.getElementById('BIAS_ANGELLIST_NAMES');
    if (prevStyle) {
        prevStyle.parentNode.removeChild(prevStyle);
      } else {
        const style = document.createElement('style');
        style.id = 'BIAS_ANGELLIST_NAMES';

        document.body.appendChild(style);

        const obfuscate = [
          'a.u-colorGray3.u-uncoloredLink { visibility: hidden !important; }',
          'a.u-colorGray3.u-uncoloredLink:before {content: "Link to Profile"; visibility: visible;}',
          '.qtip a.profile-link { visibility: hidden !important; }',
          '.qtip a.profile-link:before { content: "Link to Profile"; visibility: visible; }',
          '.connection-text { visibility: hidden !important; }',
          '.people-list.connection  > div { visibility: hidden !important; }',
          '.profile-text > h1 { visibility: hidden !important; }',
          '.profiles-show.connections .object-list-title a.profile-link { visibility: hidden !important; }',
          '.profiles-show.connections .object-list-title a.profile-link:before { content: "Link to Profile"; visibility: visible;}',
          '.profiles-show.connections .object-list-subtitle { visibility: hidden !important; }',
          '.candidate-header-content .u-uncoloredLink {visibility:hidden !important; }',
          '.candidate-header-content .u-uncoloredLink:before {content: "Link to Profile"; visibility: visible;}',
          '.card-content-container .js-browse-table-row-name a.u-unstyledLink {visibility:hidden !important; }',
          '.card-content-container .js-browse-table-row-name a.u-unstyledLink:before {content: "Link to Profile"; visibility: visible; }',
          '.avatar-container .name {visibility: hidden;}',
          '.review a.profile-link.u-uncoloredLink {visibility: hidden;}',
          '.review a.profile-link.u-uncoloredLink:before {content: "Link to Profile"; visibility: visible;}'
        ];


        obfuscate.forEach((r, i) => style.sheet.insertRule(r, i));
      }
}

function clearAlPhotos() {
    var prevStyle = document.getElementById('BIAS_ANGELLIST_PHOTOS');
    if (prevStyle) {
        prevStyle.parentNode.removeChild(prevStyle);
      } else {
        const style = document.createElement('style');
        style.id = 'BIAS_ANGELLIST_PHOTOS';

        document.body.appendChild(style);

        const obfuscate = [
          '.candidate-header-content img { opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important; }',
          '.card-content-container img { opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important; }',
          '.photo .profile-link img {opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important;}',
          '.profiles-show.subheader img {opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important;}',
          '.avatar-container img {opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important;}',
          '.review img {opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important;} ',
          '.qtip-content img {opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important;}'
        ];
        


        obfuscate.forEach((r, i) => style.sheet.insertRule(r, i));
    }
}

function clearPhotos() {
    var prevStyle = document.getElementById('BIAS_LINKEDIN');
    
            if (prevStyle) {
              prevStyle.parentNode.removeChild(prevStyle);
            } else {
              const style = document.createElement('style');
              style.id = 'BIAS_LINKEDIN';
    
              document.body.appendChild(style);
    
              const obfuscate = [
                "span.full-name, a[href^='https://www.linkedin.com/profile'], #sticky-rail * { color: black !important; background-color: black !important; }",
    
                "img { opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important; }",
    
                "#aux > div.insights > h3 { color: black !important; background-color: black !important; }",
    
                "#aux > div.insights > h3::after { content: ''; text-indent: 0; display: block; line-height: initial; }",
    
                "[id^='control_gen_'] > div.header > h3 { color: black !important; background-color: black !important; }",
    
                "[id^='control_gen_'] > div.header > h3::after { content: ''; text-indent: 0; display: block; line-height: initial; }",
    
                "#in-common > svg > circle[fill^='url('] { fill-opacity: 0 !important; fill: black !important; }"
              ];
    
              obfuscate.forEach((r, i) => style.sheet.insertRule(r, i));
            }
}
function clearNames() {
    var prevStyle = document.getElementById('BIAS_NAMES_LINKEDIN');
              if (prevStyle) {
                prevStyle.parentNode.removeChild(prevStyle);
              } else {
                const style = document.createElement('style');
                style.id = 'BIAS_NAMES_LINKEDIN';
    
                document.body.appendChild(style);
    
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
                  'span[class*="degree"] { visibility: visible !important; }',
                ];
    
    
                nameObfuscate.forEach((r,i) => style.sheet.insertRule(r,i));
              }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.toggleNames) {
            toggleNames = !toggleNames
            clearNames();
            chrome.storage.sync.set({toggleNames: toggleNames})
        } 
        if (request.togglePhotos) {
          togglePhotos = !togglePhotos
          clearPhotos();
          chrome.storage.sync.set({togglePhotos: togglePhotos})
        }
        if (request.toggleAlNames) {
            toggleAlNames = !toggleAlNames
            clearAlNames();
            chrome.storage.sync.set({toggleAlNames: toggleAlNames})
        }
        if (request.toggleAlPhotos) {
            toggleAlPhotos = !toggleAlPhotos
            clearAlPhotos();
            chrome.storage.sync.set({toggleAlPhotos: toggleAlPhotos})
        }
    });

