// TODO: don't even initialize if on whitelist
initializePause()
onMessageFromBackground('pause', popUp)
sendToBackground('new-tab', { host: location.host })
// TODO: send new tab when tab URL is updated.

function onMessageFromBackground(messageText, callback) {
  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text === messageText) callback()
    // Call the specified callback, passing
    // the web-page's DOM content as argument
    // sendResponse(document.all[0].outerHTML);
  })
}

document.onclick = function() {
  sendToBackground('click', { host: location.host })
}

function sendToBackground(messageText, options) {
  var message = Object.assign(options, { text: messageText })
  chrome.runtime.sendMessage(message, function(response) {
    console.log('received response!', response.pauseAmount)
  })
}

function popUp() {
  console.log('SHOWING PAUSE (didnt insert tho)')
}

function initializePause() {
  // var html = ""
  // var div = document.createElement('div')
  // div.innerHTML = html

  // BUG: stackoverflow detects and blocks iframes.
  console.log('inserting PAUSE')
  var tagString = "<div id='pause-area' class='pause-area-hide'>\
    <style>\
      #pause-area {\
        z-index: 1000000000;\
        transform: translateZ(100000px);\
        position: fixed;\
        top: 0;\
        left: 0;\
        height: 100vh;\
        width: 100vw;\
      }\
      #pause-area.pause-area-hide {\
        display: none;\
      }\
      #pause-area nav {\
        background-color: white;\
      }\
      #pause-area iframe {\
        width: 100%;\
        height: 100%;\
      }\
    </style>\
    <nav>\
      PAUSE\
      <a href='#'>go to reddit</a>\
    </nav>\
    <iframe src='#'>\
  </div>";
  var range = document.createRange();

  // make the parent of the first div in the document becomes the context node
  // range.selectNode(document.getElementsByTagName("div").item(0));

  var documentFragment = range.createContextualFragment(tagString);
  document.body.appendChild(documentFragment);

  // setTimeout(function() { debugger }, 5000)

  var pauseArea = document.getElementById('pause-area');
  var a = pauseArea.getElementsByTagName('a')[0];

  a.onclick = toggleClass.bind(null, pauseArea, 'pause-area-hide');
}
