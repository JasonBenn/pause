console.log('background is up')

// chrome.storage.sync.set({'value': theValue}, function() {
//   message('Settings saved');
// })

var whitelist = ['stackoverflow.com', 'babeljs.io']

function notWhitelisted(host) {
  return whitelist.includes(host)
}

// It's been 10 minutes on this page! 10 cards. Can't escape by going to a new page.
// New page that isn't whitelisted! 3 cards.
// Click on Reddit! 1 card.
// chrome.browserAction.setBadgeText({ text: "0h" })
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.text === 'new-tab' && notWhitelisted(request.host)) {
    sendResponse({ pauseAmount: 3 })
  }

  if (request.text === 'click' && notWhitelisted(request.host)) {
    // IF it's been more than 4 minutes
    // 1 flashcard per minute beyond 4 minutes
    sendResponse({ pauseAmount: 5 })
  }
  // TODO: keep track of time since last pause.
})
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {text: 'browser-action'});

  // chrome.browserAction.setBackgroundColor({ color: "#000" })

  // Alternative: respond to communication!
  // if sendRespose is invoked, pass arguments to responseCallback. Cool!
  // chrome.tabs.sendMessage(tab.id, {text: 'browser-action'}, responseCallback);
  // }
});

// Background is a long running process.

// Content script will send a message back here once DOM content is loaded.
// That's how I'll track the time spent on blocked sites.

// chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
//   document.addEventListener('DOMContentLoaded', function() {
//     console.log('Content loaded - before status was complete!')
//     console.log(tabId, changeInfo, tab)
//     // chrome.tabs.executeScript(null, {file: "pause.js"})
//   })
//
//   if (changeInfo.status == 'loading') {
//     document.addEventListener('DOMContentLoaded', function() {
//       console.log('Content loaded - before status was complete!')
//       console.log(tabId, changeInfo, tab)
//       // chrome.tabs.executeScript(null, {file: "pause.js"})
//     })
//   }
//
//   // tab.url will be useful
//
//   console.log("TAB UPDATED")
//   console.log(document)
//   if (changeInfo.status == 'complete' && tab.active) {
//     console.log("Tab COMPLETED")
//     document.addEventListener('DOMContentLoaded', function() {
//       console.log('Content load - after status was complete!')
//       console.log()
//       // chrome.tabs.executeScript(null, {file: "pause.js"})
//     })
//     // do your things
//   }
// })


// function pause(info) {
  // method: GET
  // type: stylesheet
// }

// console.log(chrome.webRequest)
// chrome.webRequest.onBeforeRequest.addListener(
//   throttle(pause, ONE_MINUTE),
//   { urls: ["http://*/*", "https://*/*"] }
//   // ['blocking']
// );
