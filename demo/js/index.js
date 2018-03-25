console.log('chrome-plugin[weibo-delete] is ready.')

/*
 * 自动执行删除
 */
function autoAction () {
  var i = 0
  var setIntervalAutoAction = setInterval(() => {
    console.log('autoAction')

    // 删除微博
    var deleteBtn = document.querySelector('a[action-type="feed_list_delete"]')
    deleteBtn && deleteBtn.click()

    // 取消关注
    var cancelFollowBtn = document.querySelector('a[action-type="cancel_follow_single"]')
    cancelFollowBtn && cancelFollowBtn.click()

    // 出现验证码
    var yzmBtn = document.querySelector('a[action-type="yzm_submit"]')
    if (yzmBtn) {
      console.log('yzmBtn')
      clearInterval(setIntervalAutoAction)
      
      var cancelBtn = document.querySelector('a[action-type="cancel"]')
      cancelBtn && cancelBtn.click()

      yzmBtn.addEventListener('click', function () {
        console.log('click YZM')
        autoAction()
      })
    } else {
      console.log('ensureBtn')
      // 确认
      var ensureBtn = document.querySelector('a[action-type="ok"]')
      ensureBtn && ensureBtn.click()

      i++
      if (i > 20) {
        location.reload()
      }
    }
  }, 1000)
}

autoAction()

/*
 * 手动执行删除
 */

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  if (request.action == 'delete') {
    autoAction()
  } else {
    console.log('fail')
  }
})
