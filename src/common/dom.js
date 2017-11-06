export function hasClass(el, className) {
  // 以 className开头 或者是 前面有空格
  // 后面跟 空格 或 结束
  // \\转义字符串
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  // dom对象, className
  if (hasClass(el, className)) {
    return
  }
  // console.log(hasClass(el, className))
  // 先拆成数组 push后再重新拼成字符串
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}