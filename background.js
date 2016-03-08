var PAUSE_LENGTH = 10000
var PAUSE_BREAK = 5000
var shouldPause = true

function delayLoad(info) {
  if (shouldPause) {
    // Next step: display a link at the top of the page that sends you through.
    // Have to move mouse to click it.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      lastTabId = tabs[0].id; // This doesn't get the tab that went to the bad page.
      setTimeout(function() {
        shouldPause = false
        chrome.tabs.update(lastTabId, { url: info.url });
      }, PAUSE_LENGTH)
    });
    return { redirectUrl: "https://ankiweb.net/study/" };
  } else {
    setTimeout(function() {
      shouldPause = true
    }, PAUSE_BREAK)
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  delayLoad,
  { urls: blacklist },
  [ "blocking" ]
);
