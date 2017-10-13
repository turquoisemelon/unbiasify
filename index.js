document.addEventListener('DOMContentLoaded', function() {
  var $clearLinkedInPhotos = $('#clear-photos')
  var $clearLinkedInNames = $('#clear-names')
  var $clearAlPhotos = $('#clear-al-photos')
  var $clearAlNames = $('#clear-al-names')
  var $clearTwitterPhotos = $('#clear-twitter-photos')
  var $clearTwitterNames = $('#clear-twitter-names')

  chrome.storage.sync.get('togglePhotos', function(data) {
    togglePhotos = data.togglePhotos;
    if (togglePhotos) {
        $clearLinkedInPhotos.prop('checked',true)
    } else {
        $clearLinkedInPhotos.prop('checked',false)
    }
  });

  chrome.storage.sync.get('toggleNames', function(data) {
    toggleNames = data.toggleNames;
    if (toggleNames)  {
        $clearLinkedInNames.prop('checked',true)
    } else {
        $clearLinkedInNames.prop('checked',false)
    }
  });

  chrome.storage.sync.get('toggleAlNames', function(data) {
    toggleAlNames = data.toggleAlNames;
    if (toggleAlNames)  {
        $clearAlNames.prop('checked',true)
    } else {
        $clearAlNames.prop('checked',false)
    }
  });

  chrome.storage.sync.get('toggleAlPhotos', function(data) {
    toggleAlPhotos = data.toggleAlPhotos;
    if (toggleAlPhotos)  {
        $clearAlPhotos.prop('checked',true)
    } else {
        $clearAlPhotos.prop('checked',false)
    }
  });

  chrome.storage.sync.get('toggleTwitterNames', function(data) {
    toggleTwitterNames = data.toggleTwitterNames;
    if (toggleTwitterNames)  {
        $clearTwitterNames.prop('checked',true)
    } else {
        $clearTwitterNames.prop('checked',false)
    }
  });

  chrome.storage.sync.get('toggleTwitterPhotos', function(data) {
    toggleTwitterPhotos = data.toggleTwitterPhotos;
    if (toggleTwitterPhotos)  {
        $clearTwitterPhotos.prop('checked',true)
    } else {
        $clearTwitterPhotos.prop('checked',false)
    }
  });

  $('#clear-photos').off().on('change',function(){
    chrome.tabs.query({}, function(tabs) {
      var message = {togglePhotos: true};
      for (var i=0; i<tabs.length; ++i) {
          chrome.tabs.sendMessage(tabs[i].id, message);
      }
    });
  });

  $('#clear-names').off().on('change',function(){
    chrome.tabs.query({}, function(tabs) {
      var message = {toggleNames: true};
      for (var i=0; i<tabs.length; ++i) {
          chrome.tabs.sendMessage(tabs[i].id, message);
      }
    });
  });

  $('#clear-al-names').off().on('change',function(){
    chrome.tabs.query({}, function(tabs) {
      var message = {toggleAlNames: true};
      for (var i=0; i<tabs.length; ++i) {
          chrome.tabs.sendMessage(tabs[i].id, message);
      }
    });
  });

  $('#clear-al-photos').off().on('change',function(){
    chrome.tabs.query({}, function(tabs) {
      var message = {toggleAlPhotos: true};
      for (var i=0; i<tabs.length; ++i) {
          chrome.tabs.sendMessage(tabs[i].id, message);
      }
    });
  });

  $('#clear-twitter-names').off().on('change', function() {
    chrome.tabs.query({}, function(tabs) {
      var message = { toggleTwitterNames: true };
      for (var i=0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, message);
      }
    })
  })

  $('#clear-twitter-photos').off().on('change', function() {
    chrome.tabs.query({}, function(tabs) {
      var message = { toggleTwitterPhotos: true };
      for (var i=0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, message);
      }
    })
  })
});

