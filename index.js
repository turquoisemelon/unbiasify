document.addEventListener('DOMContentLoaded', function() {
  var $clearLinkedInPhotos = $('#clear-photos')
  var $clearLinkedInNames = $('#clear-names')
  var $clearAlPhotos = $('#clear-al-photos')
  var $clearAlNames = $('#clear-al-names')
  var $clearTwitterPhotos = $('#clear-twitter-photos')
  var $clearTwitterNames = $('#clear-twitter-names')

  const TOGGLE_LINKED_IN_PHOTOS = 'togglePhotos'
  const TOGGLE_LINKED_IN_NAMES = 'toggleNames'
  const TOGGLE_ANGELLIST_PHOTOS = 'toggleAlPhotos'
  const TOGGLE_ANGELLIST_NAMES = 'toggleAlNames'
  const TOGGLE_TWITTER_PHOTOS = 'toggleTwitterPhotos'
  const TOGGLE_TWITTER_NAMES = 'toggleTwitterNames'

  setInitialValues(TOGGLE_LINKED_IN_PHOTOS,$clearLinkedInPhotos)
  setInitialValues(TOGGLE_LINKED_IN_NAMES,$clearLinkedInNames)
  setInitialValues(TOGGLE_ANGELLIST_PHOTOS,$clearAlPhotos)
  setInitialValues(TOGGLE_ANGELLIST_NAMES,$clearAlNames)
  setInitialValues(TOGGLE_TWITTER_PHOTOS,$clearTwitterPhotos)
  setInitialValues(TOGGLE_TWITTER_NAMES,$clearTwitterNames)
  

  $clearLinkedInPhotos.off().on('change',function(){
    sendMessage({togglePhotos:true})
  });

  $clearLinkedInNames.off().on('change',function(){
    sendMessage({toggleNames:true})
  });

  $clearAlPhotos.off().on('change',function(){
    sendMessage({toggleAlPhotos:true})
  });

  $clearAlNames.off().on('change',function(){
    sendMessage({toggleAlNames:true})
  });
  
  $clearTwitterNames.off().on('change',function(){
    sendMessage({toggleTwitterNames:true})
  });

  $clearTwitterPhotos.off().on('change',function(){
    sendMessage({toggleTwitterPhotos:true})
  });

  function sendMessage(message) {
    chrome.tabs.query({}, function(tabs) {
      for (var i=0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, message);
      }
    }) 
  }
  function setInitialValues(identifier, toggleInput) {
    chrome.storage.sync.get(identifier, function(data) {
      val = data[identifier];
      if (val) {
          toggleInput.prop('checked',true)
      } else {
          toggleInput.prop('checked',false)
      }
    });
  }
});

