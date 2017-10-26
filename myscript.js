
const TOGGLE_LINKED_IN_PHOTOS = 'togglePhotos'
const TOGGLE_LINKED_IN_NAMES = 'toggleNames'
const TOGGLE_ANGELLIST_PHOTOS = 'toggleAlPhotos'
const TOGGLE_ANGELLIST_NAMES = 'toggleAlNames'
const TOGGLE_TWITTER_PHOTOS = 'toggleTwitterPhotos'
const TOGGLE_TWITTER_NAMES = 'toggleTwitterNames'

var linkedinUpdater = createModel(clearPhotos, clearNames, TOGGLE_LINKED_IN_PHOTOS, TOGGLE_LINKED_IN_NAMES)();
var angellistUpdater = createModel(clearAlPhotos, clearAlNames, TOGGLE_ANGELLIST_PHOTOS, TOGGLE_ANGELLIST_NAMES)();
var twitterUpdater = createModel(clearTwitterPhotos, clearTwitterNames, TOGGLE_TWITTER_PHOTOS, TOGGLE_TWITTER_NAMES)();

changeAll = (isSet = false, val = true)  => {
    linkedinUpdater('photos',isSet,val)
    linkedinUpdater('names',isSet,val)
    angellistUpdater('photos',isSet,val)
    angellistUpdater('names',isSet,val)
    twitterUpdater('photos',isSet,val)
    twitterUpdater('names',isSet,val)
}

var toggleAll = function()  {
    var toggleAll = false;
    return () => {
        toggleAll = !toggleAll;
        changeAll(true,toggleAll)
    }
}()


function createModel(photoFunc, nameFunc, photoIdentifier, nameIdentifier) {
    
    return function() {
        let toggle = {};
        toggle['photos'] = [false, photoFunc, photoIdentifier];
        toggle['names'] = [false, nameFunc, nameIdentifier];

        return function(type, isSet = false, val){
            if (val != undefined) {
                toggle[type][0] = val;
            } else {
                toggle[type][0] = !toggle[type][0];
            }
            (toggle[type][1])(toggle[type][0])
            if (isSet) {
                chrome.storage.sync.set({ [toggle[type][2]]: toggle[type][0] })   
            }
            
        };
    }
}




changeAll();

getIntitialVal(TOGGLE_LINKED_IN_PHOTOS,linkedinUpdater,'photos')
getIntitialVal(TOGGLE_LINKED_IN_NAMES,linkedinUpdater,'names')
getIntitialVal(TOGGLE_ANGELLIST_PHOTOS,angellistUpdater,'photos')
getIntitialVal(TOGGLE_ANGELLIST_NAMES,angellistUpdater,'names')
getIntitialVal(TOGGLE_TWITTER_PHOTOS,twitterUpdater,'photos')
getIntitialVal(TOGGLE_TWITTER_NAMES,twitterUpdater,'names')

$(document).keydown(function(e){
    var ctrlKey = e.ctrlKey || e.metaKey;
    var shiftKey = e.shiftKey;
    var semiColon = e.which === 186;

    if(ctrlKey && shiftKey && semiColon){ 
        toggleAll();
    }
}); 

function getIntitialVal(property,updaterFunction,type) {
    chrome.storage.sync.get(property, function(data) {
        val = data[property] || false;
        updaterFunction(type,false,val)
    });
}


function clearAlNames(toggleAlNames) {
    var prevStyle = document.getElementById('BIAS_ANGELLIST_NAMES');
    if (!toggleAlNames) {
        prevStyle.parentNode.removeChild(prevStyle);
      } else if (!prevStyle && toggleAlNames){
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

function clearAlPhotos(toggleAlPhotos) {

    var prevStyle = document.getElementById('BIAS_ANGELLIST_PHOTOS');
    if (!toggleAlPhotos) {
        prevStyle.parentNode.removeChild(prevStyle);
      } else if (toggleAlPhotos && !prevStyle) {
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

function clearPhotos(togglePhotos) {
    if (window.location.href.indexOf('linkedin.com') == -1) {
        return;
    }
    var prevStyle = document.getElementById('BIAS_LINKEDIN');

  if (!togglePhotos) {
    prevStyle.parentNode.removeChild(prevStyle)
  } else if (togglePhotos && !prevStyle) {
    const style = document.createElement('style')
    style.id = 'BIAS_LINKEDIN'

    document.body.appendChild(style)

    const obfuscate = [
      "span.full-name, a[href^='https://www.linkedin.com/profile'], #sticky-rail * { color: black !important; background-color: black !important; }",

      '.presence-entity__image {opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important;}',

      '.pv-top-card-section__profile-photo-container .pv-top-card-section__image { opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important; }',

      'img { opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important; }',

      '#aux > div.insights > h3 { color: black !important; background-color: black !important; }',

      "#aux > div.insights > h3::after { content: ''; text-indent: 0; display: block; line-height: initial; }",

      "[id^='control_gen_'] > div.header > h3 { color: black !important; background-color: black !important; }",

      "[id^='control_gen_'] > div.header > h3::after { content: ''; text-indent: 0; display: block; line-height: initial; }",

      "#in-common > svg > circle[fill^='url('] { fill-opacity: 0 !important; fill: black !important; }",
    ]

    obfuscate.forEach((r, i) => style.sheet.insertRule(r, i))
  }
}
function clearNames(toggleNames) {
    if (window.location.href.indexOf('linkedin.com') == -1) {
        return;
    }
    var prevStyle = document.getElementById('BIAS_NAMES_LINKEDIN');
              if (!toggleNames) {
                prevStyle.parentNode.removeChild(prevStyle);
              } else if (toggleNames && !prevStyle) {
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

function clearTwitterNames(toggleTwitterNames) {
    if (window.location.href.indexOf('twitter.com') === -1) {
        return;
    }

    var prevStyle = document.getElementById('BIAS_NAMES_TWITTER');
    if (!toggleTwitterNames) {
      prevStyle.parentNode.removeChild(prevStyle);
    } else if (toggleTwitterNames) {

        // This won't re-run on page change, meaning that if you go home
        // then back to profile you'll get the users name as the title
        document.title = "Twitter";

        if (!prevStyle) {
            var style = document.createElement('style');
            style.id = 'BIAS_NAMES_TWITTER';

            document.body.appendChild(style);

            var rules = [
              'strong.fullname.show-popup-with-id { visibility: hidden; }',
              'strong.fullname.show-popup-with-id:before { content: "Link To Profile"; visibility: visible; }',
              'span.username.u-dir { visibility: hidden; }',
              '.ProfileNameTruncated-link { visibility: hidden; }',
              '.ProfileNameTruncated-link:before { content: "Link To Profile"; visibility: visible; }',
              '.ProfileHeaderCard-nameLink { visibility: hidden; }',
              '.ProfileHeaderCard-nameLink:before { content: "Link To Profile", visibility: visible; }',
              'span.NewTweetButton-text { visibility: hidden; }',
              'span.ProfileHeaderCard-urlText > a { visibility: hidden; }',
              '.js-retweet-text b { visibility: hidden; }',
              '.js-retweet-text b:before { visibility: visible; content: "User"; }',
              'div.tooltip { visibility: hidden; }',
              '.js-recommended-followers .fullname { visibility: hidden; }',
              '.js-recommended-followers .fullname:before { visibility: visible; content: "Link To Profile" }',
              '.ActivityItem .fullname { visibility: hidden; }',
              '.ActivityItem .fullname:before { visibility: visible; content: "Link To Profile" }',
            ]

            rules.forEach((r, i) => style.sheet.insertRule(r, i));
        }
    }
}

function clearTwitterPhotos(toggleTwitterPhotos) {
    if (window.location.href.indexOf('twitter.com') === -1) {
        return;
    }

    var styleId = 'BIAS_PHOTOS_TWITTER'
    var prevStyle = document.getElementById(styleId);
    if (!toggleTwitterPhotos && prevStyle) {
        prevStyle.parentNode.removeChild(prevStyle);
    } else if (toggleTwitterPhotos && !prevStyle) {
        var style = document.createElement('style');
        style.id = styleId;

        document.body.appendChild(style);

        var rules = [
            'img.avatar.js-action-profile-avatar { visibility: hidden; }',
            '.ProfileCard-bg { visibility: hidden; }',
            '.ProfileCard-avatarImage.js-action-profile-avatar { visibility: hidden; }',
            '.ProfileAvatar-image { visibility: hidden; }',
            '.ProfileCanopy-headerBg > img { opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important; }',
            '.ProfileCardMini-avatarImage { visibility: hidden; }',
            '.ActivityItem .avatar { visibility: hidden; }',
            '.js-profile-popup-actionable .avatar { opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important;  }',
            '.ActivityItem-displayText strong { visibility: hidden; }'
        ]

        rules.forEach((r, i) => style.sheet.insertRule(r, i));
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (true) {
            case request.toggleNames:
                linkedinUpdater('names',true);
                break;
            case request.togglePhotos:
                linkedinUpdater('photos',true);
                break;
            case request.toggleAlNames:
                angellistUpdater('names',true)
                break;
            case request.toggleAlPhotos:
                angellistUpdater('photos',true)
                break;
            case request.toggleTwitterNames:
                twitterUpdater('names',true)
                break;
            case request.toggleTwitterPhotos:
                twitterUpdater('photos',true)
                break;
        }
});


