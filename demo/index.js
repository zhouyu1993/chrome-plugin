var deleteDom = document.querySelector('#delete')

deleteDom && deleteDom.addEventListener('click', function () {
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendRequest(tab.id, {
      action: 'delete'
    }, function (response) {
      console.log(response)
    })
  })
})

var cancelFollowDom = document.querySelector('#cancelFollow')

cancelFollowDom && cancelFollowDom.addEventListener('click', function () {
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendRequest(tab.id, {
      action: 'cancelFollow'
    }, function (response) {
      console.log(response)
    })
  })
})
