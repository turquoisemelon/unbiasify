
const TOGGLE_LINKED_IN_PHOTOS = 'togglePhotos'
const TOGGLE_LINKED_IN_NAMES = 'toggleNames'
const TOGGLE_ANGELLIST_PHOTOS = 'toggleAlPhotos'
const TOGGLE_ANGELLIST_NAMES = 'toggleAlNames'
const TOGGLE_TWITTER_PHOTOS = 'toggleTwitterPhotos'
const TOGGLE_TWITTER_NAMES = 'toggleTwitterNames'
const TOGGLE_REPLIT_PHOTOS = 'toggleReplitPhotos'
const TOGGLE_REPLIT_NAMES = 'toggleReplitNames'

const URLS = {
    'linkedIn': 'linkedin.com',
    'twitter': 'twitter.com',
    'angelList': 'angel.co',
    'replit': 'repl.it'
}

const STYLES = {
    'hidden' :  '{ visibility: hidden !important; }',
    'hiddenRelative': '{ visibility: hidden !important; position: relative; }',
    'linkText' :  '{ content: "Link to Profile"; visibility: visible; }',
    'blur': '{ opacity: 0.5; -webkit-filter: blur(50px) !important; filter: blur(50px) !important; }',
    'colorToBlack': '{ color: black !important; background-color: black !important; }',
    'visible': '{ visibility: visible !important; }',
    'replitStudentText': '',
    'emptyContent': '{ content: "" !important; }',
    'emptyBlock': '{ content: ""; text-indent: 0; display: block; line-height: initial; }',
    'zeroOpacity': '{ opacity:0 !important; }'
}

const STYLE_SHEETS = {
    'linkedIn': {
        'names': [
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
          ],
        'photos': [
            `span.full-name, a[href^='https://www.linkedin.com/profile'], #sticky-rail *,
            [id^='control_gen_'] > div.header > h3,
            #aux > div.insights > h3 ${STYLES.colorToBlack}`,
            
            `.presence-entity__image,
             .pv-top-card-section__profile-photo-container .pv-top-card-section__image,
             img ${STYLES.blur}`,
      
            `#aux > div.insights > h3::after,
            [id^='control_gen_'] > div.header > h3::after ${STYLES.emptyBlock}`,
      
            `#in-common > svg > circle[fill^='url('] { fill-opacity: 0 !important; fill: black !important; }`,
          ],
        'nameId': 'BIAS_NAMES_LINKEDIN',
        'photoId': 'BIAS_LINKEDIN',
    },
    'twitter': {
        'names': [
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
          ],
        'photos': [
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
        ],
        'nameId': 'BIAS_NAMES_TWITTER',
        'photoId': 'BIAS_PHOTOS_TWITTER'
    },
    'angelList': {
        'names':[
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
          ],
        'photos': [
            `.candidate-header-content img,
             .card-content-container img, 
             .photo .profile-link img, 
             .profiles-show.subheader img, 
             .avatar-container img, 
             .review img, 
             .qtip-content img  ${STYLES.blur} `
          ],
        'nameId': 'BIAS_ANGELLIST_NAMES',
        'photoId': 'BIAS_ANGELLIST_PHOTOS'
    },
    'replit': {
        'names':[
            `div[style*="flex: 1 1 0%; margin-left: 55px; text-align: left; line-height: 76px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"],
             div[style*="font-family:Raleway;font-size:20px;color:#b3b3b3;margin:.25em;"],
             div[style*="font-size:28px;font-family:Raleway;font-weight:400;color:#3F403F;margin:40px 0;"] ${STYLES.hidden}`,

            `h3[style*="font-weight: 400; font-size: 19px; height: 25px; display: flex; align-items: center; justify-content: center; margin-top: 10px; color: rgb(120, 121, 123); min-width: 150px; max-width: 230px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"],
             div[style*="box-sizing: border-box; height: 42px; line-height: 42px; width: 98%; border-bottom: 1px solid rgb(240, 240, 240); color: rgb(128, 127, 127);"],
             a[style*="border-bottom: none; text-decoration: none; color: rgb(65, 131, 196);"],
             a[style*="border-bottom: none; text-decoration: underline; color: rgb(65, 131, 196);"],
             h1[style*="font-family:Raleway;font-weight:100;font-size:44px;color:#404040;"] ${STYLES.hiddenRelative}`,

            'div[style*="flex: 1 1 0%; margin-left: 55px; text-align: left; line-height: 76px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"]:before { content: "Student"; visibility: visible; }',

            'h3[style*="font-weight: 400; font-size: 19px; height: 25px; display: flex; align-items: center; justify-content: center; margin-top: 10px; color: rgb(120, 121, 123); min-width: 150px; max-width: 230px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"]:before { content: "Student"; visibility: visible; position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: flex; justify-content: center; align-items: center; }',

            'div[style*="box-sizing: border-box; height: 42px; line-height: 42px; width: 98%; border-bottom: 1px solid rgb(240, 240, 240); color: rgb(128, 127, 127);"]:before { content: "Student"; visibility: visible; border-bottom: 1px solid rgb(240, 240, 240); position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: flex; align-items: center; }',

            'h1[style*="font-family:Raleway;font-weight:100;font-size:44px;color:#404040;"]:before { content: "Repl.it User"; visibility: visible; position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: flex; justify-content: center; align-items: center; }',

            'div[style*="font-size:28px;font-family:Raleway;font-weight:400;color:#3F403F;margin:40px 0;"]:before { content: "Public Repls"; visibility: visible; }',

            `a[style*="border-bottom: none; text-decoration: none; color: rgb(65, 131, 196);"]:before,
             a[style*="border-bottom: none; text-decoration: underline; color: rgb(65, 131, 196);"]:before { visibility: visible; content: "@repl_user"; position: absolute; }`
        ],
        'photos':[
            `div[style*="height:0px;margin:1em;"] > div:not([class]),
             a[href^="/@"] > div:not([class]) { background-image: none !important; background-color: #4A4A4A !important; }`,
        ],
        'nameId': 'BIAS_REPLIT_NAMES',
        'photoId': 'BIAS_REPLIT_PHOTOS'
    }
}

var linkedinUpdater = createModel('linkedIn', TOGGLE_LINKED_IN_PHOTOS, TOGGLE_LINKED_IN_NAMES)();
var angellistUpdater = createModel('angelList', TOGGLE_ANGELLIST_PHOTOS, TOGGLE_ANGELLIST_NAMES)();
var twitterUpdater = createModel('twitter', TOGGLE_TWITTER_PHOTOS, TOGGLE_TWITTER_NAMES)();
var replitUpdater = createModel('replit', TOGGLE_REPLIT_PHOTOS, TOGGLE_REPLIT_NAMES)();

changeAll = (isSet = false, val = true)  => {
    linkedinUpdater('photos',isSet,val)
    linkedinUpdater('names',isSet,val)
    angellistUpdater('photos',isSet,val)
    angellistUpdater('names',isSet,val)
    twitterUpdater('photos',isSet,val)
    twitterUpdater('names',isSet,val)
    replitUpdater('photos',isSet,val)
    replitUpdater('names',isSet,val)
}

var toggleAll = function()  {
    var toggleAll = false;
    return () => {
        toggleAll = !toggleAll;
        chrome.storage.sync.set({ 'toggleAll': toggleAll });
        
    }
}()

function createModel(styleIdentifier, photoIdentifier, nameIdentifier) {

    return function() {
        let toggle = {};
        let url = URLS[styleIdentifier];
        toggle['photos'] = [false, photoIdentifier, STYLE_SHEETS[styleIdentifier].photoId, STYLE_SHEETS[styleIdentifier].photos];
        toggle['names'] = [false, nameIdentifier, STYLE_SHEETS[styleIdentifier].nameId, STYLE_SHEETS[styleIdentifier].names];

        return function(type, isSet = false, val){
            if (!toggle || !toggle[type] || !(toggle[type].length)) {
                return;
            }
            if (val != undefined) {
                toggle[type][0] = val;
            } else {
                toggle[type][0] = !toggle[type][0];
            }
            const id = toggle[type][2];
            const styles = toggle[type][3];
            const nextVal = toggle[type][0];
            toggleStyles(id, styles, nextVal, url)
            if (isSet) {
                chrome.storage.sync.set({ [toggle[type][1]]: nextVal })
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
getIntitialVal(TOGGLE_REPLIT_PHOTOS,replitUpdater,'photos')
getIntitialVal(TOGGLE_REPLIT_NAMES,replitUpdater,'names')

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

function toggleStyles(styleId, obfuscate, toggleBoolVar, url) {
    if (window.location.href.indexOf(url) == -1) {
        return;
    }
    var prevStyle = document.getElementById(styleId);
    if (!toggleBoolVar && prevStyle) {
        prevStyle.parentNode.removeChild(prevStyle);
      } else if (!prevStyle && toggleBoolVar){
        const style = document.createElement('style');
        style.id = styleId;

        document.body.appendChild(style);

        obfuscate.forEach((r, i) => style.sheet.insertRule(r, i));
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
            case request.toggleReplitNames:
                replitUpdater('names',true)
                break;
            case request.toggleReplitPhotos:
                replitUpdater('photos',true)
                break;
        }
});
