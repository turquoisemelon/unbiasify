
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
          `a.u-colorGray3.u-uncoloredLink ${STYLES.hidden}`,
          `a.u-colorGray3.u-uncoloredLink:before ${STYLES.linkText}`,
          `.qtip a.profile-link ${STYLES.hidden}`,
          `.qtip a.profile-link:before  ${STYLES.linkText}`,
          `.connection-text ${STYLES.hidden}`,
          `.people-list.connection  > div ${STYLES.hidden}`,
          `.profile-text > h1 ${STYLES.hidden}`,
          `.profiles-show.connections .object-list-title a.profile-link ${STYLES.hidden}`,
          `.profiles-show.connections .object-list-title a.profile-link:before  ${STYLES.linkText}`,
          `.profiles-show.connections .object-list-subtitle ${STYLES.hidden}`,
          `.candidate-header-content .u-uncoloredLink ${STYLES.hidden}`,
          `.candidate-header-content .u-uncoloredLink:before  ${STYLES.linkText}`,
          `.card-content-container .js-browse-table-row-name a.u-unstyledLink ${STYLES.hidden}`,
          `.card-content-container .js-browse-table-row-name a.u-unstyledLink:before  ${STYLES.linkText}`,
          `.avatar-container .name ${STYLES.hidden}`,
          `.review a.profile-link.u-uncoloredLink ${STYLES.hidden}`,
          `.review a.profile-link.u-uncoloredLink:before  ${STYLES.linkText}`
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
          `.candidate-header-content img  ${STYLES.blur} `,
          `.card-content-container img  ${STYLES.blur} `,
          `.photo .profile-link img  ${STYLES.blur} `,
          `.profiles-show.subheader img  ${STYLES.blur} `,
          `.avatar-container img  ${STYLES.blur} `,
          `.review img ${STYLES.blur} `,
          `.qtip-content img  ${STYLES.blur} `,
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
      `span.full-name, a[href^='https://www.linkedin.com/profile'], #sticky-rail * ${STYLES.colorToBlack}`,

      `.presence-entity__image ${STYLES.blur}`,

      `.pv-top-card-section__profile-photo-container .pv-top-card-section__image ${STYLES.blur}`,

      `img ${STYLES.blur}`,

      `#aux > div.insights > h3 ${STYLES.colorToBlack}`,

      `#aux > div.insights > h3::after { content: ''; text-indent: 0; display: block; line-height: initial; }`,

      `[id^='control_gen_'] > div.header > h3 ${STYLES.colorToBlack}`,

      `[id^='control_gen_'] > div.header > h3::after { content: ''; text-indent: 0; display: block; line-height: initial; }`,

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
              if (!toggleNames) {
                prevStyle.parentNode.removeChild(prevStyle);
              } else if (toggleNames && !prevStyle) {
                const style = document.createElement('style');
                style.id = 'BIAS_NAMES_LINKEDIN';

                document.body.appendChild(style);

                const nameObfuscate = [
                  `[data-control-name="identity_welcome_message"] { color: white !important; background-color: white !important; }`,
                  `.neptune-grid > .launchpad__title { opacity: 0; }`,
                  `[data-control-name="actor"] > h3 >  span:first-child ${STYLES.hidden }`,
                  `[data-control-name="actor"] > h3 >  span:first-child:before  ${STYLES.linkText }`,
                  `span[class*="-name"] ${ STYLES.hidden } `,
                  `span[class*="-name"]:before  ${ STYLES.linkText }`,
                  `span[class*="__name"]  ${ STYLES.hidden }`,
                  `h3[class*="__name"]  ${ STYLES.hidden }`,
                  `h3[class*="-name"]  ${ STYLES.hidden }`,
                  `a[class*="name"]  ${ STYLES.hidden }`,
                  `h3[class*="__name"]:before  ${ STYLES.linkText }`,
                  `a[class*="name"]:before  ${ STYLES.linkText }`,
                  `[class*="person-info__shared"] ${ STYLES.blur }`,
                  `.msg-conversation-card__message-snippet-body { opacity: 0; }`,
                  `.profile-rail-card__actor-link > p ${ STYLES.hidden } `,
                  `.pv-contact-info__card-sub-heading { opacity: 0; }`,
                  `.pv-entity__summary-info > p  ${ STYLES.hidden } `,
                  `.entity-hovercard { opacity:0 !important;}`,
                  `[data-control-name="edit_endorsements"] ${STYLES.hidden } `,
                  `[data-control-name="update_topbar_actor"] ${STYLES.hidden }`,
                  `.pv-recent-activity-section__card-heading  ${STYLES.hidden } `,
                  `[data-control-name="update_topbar_actor"]:before ${ STYLES.linkText } `,
                  `[data-control-name="topcard"] h2 ${ STYLES.hidden }`,
                  `[data-control-name="topcard"] h2:before ${ STYLES.linkText } `,
                  `.pv-top-card-section__name:before ${ STYLES.emptyContent }`,
                  `.pv-top-card-section__name ${ STYLES.hidden }`,
                  `span[class*="school"] ${ STYLES.visible }`,
                  `span[class*="school"]:before ${ STYLES.emptyContent }`,
                  `span[class*="skill"]:before ${ STYLES.emptyContent }`,
                  `span[class*="skill"] ${ STYLES.visible }`,
                  `span[class*="degree"]:before ${ STYLES.emptyContent }`,
                  `span[class*="degree"] ${ STYLES.visible }`,
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
              `strong.fullname.show-popup-with-id ${ STYLES.hidden }`,
              `strong.fullname.show-popup-with-id:before ${ STYLES.linkText }`,
              `span.username.u-dir ${ STYLES.hidden }`,
              `.ProfileNameTruncated-link ${ STYLES.hidden }`,
              `.ProfileNameTruncated-link:before ${ STYLES.linkText }`,
              `.ProfileHeaderCard-nameLink ${ STYLES.hidden }`,
              `.ProfileHeaderCard-nameLink:before ${ STYLES.linkText }`,
              `span.NewTweetButton-text ${ STYLES.hidden }`,
              `span.ProfileHeaderCard-urlText > a ${ STYLES.hidden }`,
              `.js-retweet-text b ${ STYLES.hidden }`,
              `.js-retweet-text b:before { visibility: visible; content: "User"; }`,
              `div.tooltip ${ STYLES.hidden }`,
              `.js-recommended-followers .fullname ${ STYLES.hidden }`,
              `.js-recommended-followers .fullname:before ${ STYLES.linkText }`,
              `.ActivityItem .fullname ${ STYLES.hidden }`,
              `.ActivityItem .fullname:before ${ STYLES.linkText }`,
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
            `img.avatar.js-action-profile-avatar ${ STYLES.hidden }`,
            `.ProfileCard-bg ${ STYLES.hidden }`,
            `.ProfileCard-avatarImage.js-action-profile-avatar ${ STYLES.hidden }`,
            `.ProfileAvatar-image ${ STYLES.hidden }`,
            `.ProfileCanopy-headerBg > img ${STYLES.blur}`,
            `.ProfileCardMini-avatarImage ${ STYLES.hidden }`,
            `.ActivityItem .avatar ${ STYLES.hidden }`,
            `.js-profile-popup-actionable .avatar ${STYLES.blur}`,
            `.ActivityItem-displayText strong ${ STYLES.hidden }`,
            `.tweet-content .QuoteTweet-originalAuthor ${ STYLES.hidden } `
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
