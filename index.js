

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };
  E = new window.E();

  window.onload = () => {
    const modal = document.querySelector('.modal');
    const navTl = gsap.timeline({ defaults: { duration: 1 } });
  
    let slides = [...document.querySelectorAll('.slider__slide')];
    let slideTl = [];
  
    // add all slide timelines
    for (let i = 0; i < slides.length; i++) {if (window.CP.shouldStopExecution(0)) break;
      const slide = slides[i];
      const viewMore = slide.querySelectorAll('.slider__slide__more');
      const scene = slide.querySelectorAll('.slider__slide__scene span');
      const img = slide.querySelector('.slider__slide__img');
      const number = slide.querySelector('.slider__slide__number');
      const numbers = number.querySelectorAll('span');
      const tl = gsap.timeline({ paused: true, defaults: { duration: 1.1, ease: "power2.inOut" } });
  
      tl.
      to(img, {
        clipPath: 'inset(18%)',
        scale: 0.95 },
      0).
      to(viewMore[0], { x: '2rem' }, 0).
      to(viewMore[1], { x: '-2rem' }, 0).
      to(number, { y: '0rem', duration: 1 }, 0.3).
      to(number, { opacity: 1 }, 0.4).
      to(numbers, { rotateY: 0, duration: 1.6 }, 0).
      to(scene, {
        x: '0%',
        y: 0,
        opacity: 1,
        duration: 1.2 },
      0.2);
  
      slideTl.push(tl);
    }
  
    // hover interaction
    window.CP.exitedLoop(0);E.on('mouseenter mouseleave', '.slider__slide', e => {
      const slide = e.target;
  
      const tl = slideTl[slides.indexOf(slide)];
  
      if (e.type === 'mouseenter') {
        tl.play();
      } else {
        tl.reverse();
      }
    });
  
    // Next button
    E.on('click', '.js-up, .js-down', e => {
      const sides = document.querySelectorAll('.slider__side');
  
      if (navTl.isActive() === false) {
        navTl.clear();
  
        sides.forEach((side, k) => {
          const slides = side.querySelectorAll('.slider__slide');
          let activeSlide, nextSlide, initialClip;
  
          if (e.target.classList.contains('js-up')) {
            initialClip = k === 0 ? 'inset(100% 0 0%)' : 'inset(0 0 100%)';
          } else {
            initialClip = k === 1 ? 'inset(100% 0 0%)' : 'inset(0 0 100%)';
          }
  
          for (let i = 0; i < slides.length; i++) {if (window.CP.shouldStopExecution(1)) break;
            if (slides[i].classList.contains('active')) {
              activeSlide = slides[i];
              nextSlide = slides[i + 1] || slides[0];
              break;
            }
          }window.CP.exitedLoop(1);
  
          activeSlide.classList.remove('active');
          nextSlide.classList.add('active');
  
          gsap.set(nextSlide, {
            autoAlpha: 1,
            scale: 1.2,
            clipPath: initialClip });
  
  
          navTl.to(nextSlide, {
            clipPath: 'inset(0% 0 0%)',
            scale: 1,
            ease: 'power2.inOut',
            duration: 1,
            onComplete: () => {
              gsap.set(activeSlide, { autoAlpha: 0 });
            } },
          0);
        });
      }
    });
  
    // Modal
    E.on('click', '.js-trigger', e => modal.classList.add('active'));
    E.on('click', '.modal', e => modal.classList.remove('active'));
  
  };
  
const cards = document.querySelectorAll('.skill_item');

function transition() {
  if (this.classList.contains('active')) {
    this.classList.remove('active')
  } else {
    this.classList.add('active');
  }
}

cards.forEach(card => card.addEventListener('click', transition));
var toggle = document.querySelector('.toggle')
toggle.addEventListener('click', function(){
  alert('1')
})