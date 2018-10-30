// View it on Chrome
var wrap = document.getElementById('recog')
var mc = new Hammer(wrap)

var animateCss = function(animationName, animationElem) {
  animationElem.classList.add(animationName)
  animationElem.addEventListener('animationend', function() {
    animationElem.classList.remove(animationName);
  })
}

var items = document.querySelectorAll('.item')
var bullets = wrap.querySelector('.indicators')
var patterns = wrap.querySelectorAll('.pattern')

var moveForward = function() {
  var active = wrap.querySelector('.active')
  if (active != items[0]) {
    active.classList.add('paned')
    active.classList.remove('active')
    for (var i = 0; i < patterns.length; ++i) {
      animateCss('pulse', patterns[i])
    }
  }
  var prev = active.previousElementSibling
  prev && prev.matches('.item') ? prev.classList.add('active') : null
}

var moveBackward = function() {
  var paned = wrap.querySelector('.paned')
  paned.classList.add('active')
  paned.classList.remove('paned')
  var prev = paned.previousElementSibling
  prev && prev.matches('.item') ? prev.classList.remove('active') : null

  for (var i = 0; i < patterns.length; ++i) {
    animateCss('pulse', patterns[i])
  }
}

var bulletLinks = document.querySelectorAll('.indicators li')
var linksArray = Array.prototype.slice.call(bulletLinks)
var itemsSlice = Array.prototype.slice.call(items);
var itemsArray = itemsSlice.reverse();

var bulletMove = function() {
  var activeItem = document.querySelector('.item.active')
  var itemIndex = itemsArray.indexOf(activeItem);
  var activeBullet = linksArray[itemIndex]
  activeBullet.classList.add('active')
  for (var i = 0; i < linksArray.length; i++) {
    linksArray[i] != activeBullet ? linksArray[i].classList.remove('active') : null
  }
}

mc.on('swipeleft', function() {
  moveForward();
  bulletMove();
})

mc.on('swiperight', function() {
  moveBackward();
  bulletMove();

})

var details = document.querySelector('.details')
var inputWrap = document.querySelector('.inputswrap')
var btnBack = document.querySelector('.btn-back')

for (var i = 0; i < items.length; ++i) {
  items[i].addEventListener('click', function(e) {
    e.preventDefault()
    this.classList.add('shrink')
    this.classList.remove('active')
    wrap.classList.add('frm')
    details.classList.add('active')
    animateCss('pulse', this)
    animateCss('pulse', inputWrap)
    btnBack.classList.add('show')
    btnBack.addEventListener('click', function(s) {
      s.preventDefault()
      var shrink = wrap.querySelector('.shrink')
      this.classList.remove('show')
      setTimeout(function() {
        shrink.classList.remove('shrink')
        shrink.classList.add('active')
        wrap.classList.remove('frm')
        details.classList.remove('active')
      }, 800);
    })
  })
}

var form = document.getElementsByTagName("form")
for (var i = 0; i < form.length; i++) {
  form[i].addEventListener('focus', function(e) {
    e.target.classList.add('active')
  }, true)
  form[i].addEventListener('blur', function(e) {
    e.target.value != 0 ? e.target.classList.add('active') : e.target.classList.remove('active')
  }, true)
}

document.querySelector('.form-btn').addEventListener('click', function(event) {
  event.preventDefault()
  this.classList.add('act')
})