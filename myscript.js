
const TOGGLE_LINKED_IN_PHOTOS = 'togglePhotos'
const TOGGLE_LINKED_IN_NAMES = 'toggleNames'
const TOGGLE_ANGELLIST_PHOTOS = 'toggleAlPhotos'
const TOGGLE_ANGELLIST_NAMES = 'toggleAlNames'
const TOGGLE_TWITTER_PHOTOS = 'toggleTwitterPhotos'
const TOGGLE_TWITTER_NAMES = 'toggleTwitterNames'

var linkedinUpdater = createModel(clearPhotos, clearNames, TOGGLE_LINKED_IN_PHOTOS, TOGGLE_LINKED_IN_NAMES)();
var angellistUpdater = createModel(clearAlPhotos, clearAlNames, TOGGLE_ANGELLIST_PHOTOS, TOGGLE_ANGELLIST_NAMES)();
var twitterUpdater = createModel(clearTwitterPhotos, clearTwitterNames, TOGGLE_TWITTER_PHOTOS, TOGGLE_TWITTER_NAMES)();

const STYLES = {
    'hidden' :  '{ visibility: hidden !important; }',
    'linkText' :  '{ content: "Link to Profile"; visibility: visible; }',
    'blur': '{ opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important; }',
    'colorToBlack': '{ color: black !important; background-color: black !important; }',
    'visible': '{ visibility: visible !important; }',
    'emptyContent': '{ content: "" !important; }',
    'emptyBlock': '{ content: ""; text-indent: 0; display: block; line-height: initial; }',
    'zeroOpacity': '{ opacity:0 !important; }'
}

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
        chrome.storage.sync.set({ 'toggleAll': toggleAll });
        
    }
}()


function createModel(photoFunc, nameFunc, photoIdentifier, nameIdentifier) {

    return function() {
        let toggle = {};
        toggle['photos'] = [false, photoFunc, photoIdentifier];
        toggle['names'] = [false, nameFunc, nameIdentifier];

        return function(type, isSet = false, val){
            if (!toggle || !toggle[type] || !(toggle[type].length)) {
                return;
            }
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


chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
      var storageChange = changes[key];
      if (key === 'toggleAll') {
          let isTrue = storageChange.newValue
          changeAll(true,isTrue)
      }
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
    if (!toggleAlNames && prevStyle) {
        prevStyle.parentNode.removeChild(prevStyle);
      } else if (!prevStyle && toggleAlNames){
        const style = document.createElement('style');
        style.id = 'BIAS_ANGELLIST_NAMES';

        document.body.appendChild(style);

        const obfuscate = [
          `a.u-colorGray3.u-uncoloredLink,
          .qtip a.profile-link,
          .connection-text,
          .people-list.connection  > div,
          .profile-text > h1,
          .profiles-show.connections .object-list-title a.profile-link,
          .profiles-show.connections .object-list-subtitle,
          .candidate-header-content .u-uncoloredLink,
          .card-content-container .js-browse-table-row-name a.u-unstyledLink,
          .avatar-container .name,
          .review a.profile-link.u-uncoloredLink,
          .similar-profile .object-list-title  ${STYLES.hidden}`,

          `.qtip a.profile-link:before,
           a.u-colorGray3.u-uncoloredLink:before,
          .profiles-show.connections .object-list-title a.profile-link:before,
          .candidate-header-content .u-uncoloredLink:before,
          .card-content-container .js-browse-table-row-name a.u-unstyledLink:before,
          .review a.profile-link.u-uncoloredLink:before   ${STYLES.linkText}`
        ];


        obfuscate.forEach((r, i) => style.sheet.insertRule(r, i));
      }
}

function clearAlPhotos(toggleAlPhotos) {

    var prevStyle = document.getElementById('BIAS_ANGELLIST_PHOTOS');
    if (!toggleAlPhotos && prevStyle) {
        prevStyle.parentNode.removeChild(prevStyle);
      } else if (toggleAlPhotos && !prevStyle) {
        const style = document.createElement('style');
        style.id = 'BIAS_ANGELLIST_PHOTOS';

        document.body.appendChild(style);

        const obfuscate = [
            `.candidate-header-content img,
             .card-content-container img, 
             .photo .profile-link img, 
             .profiles-show.subheader img, 
             .avatar-container img, 
             .review img, 
             .qtip-content img  ${STYLES.blur} `
          ];



        obfuscate.forEach((r, i) => style.sheet.insertRule(r, i));
    }
}

function clearPhotos(togglePhotos) {
    if (window.location.href.indexOf('linkedin.com') == -1) {
        return;
    }
    var prevStyle = document.getElementById('BIAS_LINKEDIN');

  if (!togglePhotos && prevStyle) {
    prevStyle.parentNode.removeChild(prevStyle)
  } else if (togglePhotos && !prevStyle) {
    const style = document.createElement('style')
    style.id = 'BIAS_LINKEDIN'

    document.body.appendChild(style)

    const obfuscate = [
      `span.full-name, a[href^='https://www.linkedin.com/profile'], #sticky-rail *,
      [id^='control_gen_'] > div.header > h3,
      #aux > div.insights > h3 ${STYLES.colorToBlack}`,
      
      `.presence-entity__image,
       .pv-top-card-section__profile-photo-container .pv-top-card-section__image,
       img ${STYLES.blur}`,

      `#aux > div.insights > h3::after,
      [id^='control_gen_'] > div.header > h3::after ${STYLES.emptyBlock}`,

      `#in-common > svg > circle[fill^='url('] { fill-opacity: 0 !important; fill: black !important; }`,
    ]

    obfuscate.forEach((r, i) => style.sheet.insertRule(r, i))
  }
}
function clearNames(toggleNames) {
    if (window.location.href.indexOf('linkedin.com') == -1) {
        return;
    }
    var prevStyle = document.getElementById('BIAS_NAMES_LINKEDIN');
              if (!toggleNames && prevStyle) {
                prevStyle.parentNode.removeChild(prevStyle);
              } else if (toggleNames && !prevStyle) {
                const style = document.createElement('style');
                style.id = 'BIAS_NAMES_LINKEDIN';

                document.body.appendChild(style);

                const nameObfuscate = [
                  `[data-control-name="identity_welcome_message"] { color: white !important; background-color: white !important; }`,

                  `.neptune-grid > .launchpad__title,
                   .msg-conversation-card__message-snippet-body,
                   .pv-contact-info__card-sub-heading,
                   .entity-hovercard ${STYLES.zeroOpacity}`,

                  `[data-control-name="actor"] > h3 >  span:first-child,
                   span[class*="__name"],
                   h3[class*="__name"],
                   h3[class*="-name"], 
                   a[class*="name"],
                   .profile-rail-card__actor-link > p,
                   .pv-entity__summary-info > p,
                   [data-control-name="edit_endorsements"],
                   [data-control-name="update_topbar_actor"], 
                   .pv-recent-activity-section__card-heading,
                   [data-control-name="topcard"] h2,
                   .pv-top-card-section__name,
                   span[class*="-name"]  ${STYLES.hidden }`,


                  `[data-control-name="actor"] > h3 >  span:first-child:before,
                   span[class*="-name"]:before,
                   h3[class*="__name"]:before,
                   a[class*="name"]:before, 
                   [data-control-name="update_topbar_actor"]:before, 
                   [data-control-name="topcard"] h2:before ${STYLES.linkText }`,
                 

                  `[class*="person-info__shared"] ${ STYLES.blur }`,

               
                
                  `.pv-top-card-section__name:before,
                    span[class*="school"]:before,
                    span[class*="skill"]:before,
                    span[class*="degree"]:before ${ STYLES.emptyContent }`,


                  `span[class*="school"],
                   span[class*="skill"],
                   span[class*="degree"] ${ STYLES.visible }`
                ];


                nameObfuscate.forEach((r,i) => style.sheet.insertRule(r,i));
              }
}

function clearTwitterNames(toggleTwitterNames) {
    if (window.location.href.indexOf('twitter.com') === -1) {
        return;
    }

    var prevStyle = document.getElementById('BIAS_NAMES_TWITTER');
    if (!toggleTwitterNames && prevStyle) {
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
              `strong.fullname.show-popup-with-id,
              span.username.u-dir,
              .ProfileNameTruncated-link,
              .ProfileHeaderCard-nameLink,
              span.NewTweetButton-text,
              span.ProfileHeaderCard-urlText > a,
              .js-retweet-text b,
              div.tooltip ,
              .js-recommended-followers .fullname, 
              .ActivityItem .fullname ${ STYLES.hidden }`,

              `.js-retweet-text b:before { visibility: visible; content: "User"; }`,

              `.ActivityItem .fullname:before,
              .js-recommended-followers .fullname:before,
              .ProfileHeaderCard-nameLink:before,
              .ProfileNameTruncated-link:before,
              strong.fullname.show-popup-with-id:before ${ STYLES.linkText }`,

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
            `img.avatar.js-action-profile-avatar,
            .ProfileCard-bg,
            .ProfileCard-avatarImage.js-action-profile-avatar,
            .ProfileAvatar-image,
            .ProfileCardMini-avatarImage,
            .ActivityItem .avatar,
            .ActivityItem-displayText strong,
            .tweet-content .QuoteTweet-originalAuthor ${ STYLES.hidden }`,

            `.js-profile-popup-actionable .avatar,
            .ProfileCanopy-headerBg > img ${ STYLES.blur }`,
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
