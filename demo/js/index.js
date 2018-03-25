console.log('chrome-plugin[weibo-delete] is ready.')

var setIntervalAutoAction = null

/*
 * 删除微博
 */
function deleteAction () {
  console.log('deleteAction')

  var deleteBtn = document.querySelector('a[action-type="feed_list_delete"]')
  deleteBtn && deleteBtn.click()
}

/*
 * 取消关注
 */
function cancelFollowAction () {
  console.log('deleteAction')

  var cancelFollowBtn = document.querySelector('a[action-type="cancel_follow_single"]')
  cancelFollowBtn && cancelFollowBtn.click()
}

/*
 * 确认
 */
function ensureAction () {
  console.log('ensureAction')

  var ensureBtn = document.querySelector('a[action-type="ok"]')
  ensureBtn && ensureBtn.click()
}

/*
 * 取消
 */
function cancelAction () {
  console.log('cancelAction')

  var cancelBtn = document.querySelector('a[action-type="cancel"]')
  cancelBtn && cancelBtn.click()
}

/*
 * 取消
 */
function doAction () {
  console.log('doAction')

  // 出现验证码
  var yzmBtn = document.querySelector('a[action-type="yzm_submit"]')
  if (yzmBtn) {
    console.log('yzmBtn')

    clearInterval(setIntervalAutoAction)

    cancelAction()

    yzmBtn.addEventListener('click', function () {
      console.log('click YZM')

      autoAction()
    })
  } else {
    console.log('ensureBtn')

    ensureAction()
  }
}

/*
 * 自动执行
 */
function autoAction () {
  var i = 0
  setIntervalAutoAction = setInterval(() => {
    console.log('autoAction')

    deleteAction()

    cancelFollowAction()

    doAction()

    i++
    if (i > 20) {
      location.reload()
    }
  }, 1000)
}

/*
 * 是否自动执行
 */
if (/autoAction=true/.test(location.search)) {
  autoAction()
}

/*
 * 手动执行
 */

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  if (request.action == 'delete') {
    deleteAction()
  } else if (request.action == 'cancelFollow') {
    cancelFollowAction()
  } else {
    console.log('fail')
  }
  doAction()
})
