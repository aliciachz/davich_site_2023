const input = document.querySelector('label input');
const subMo = document.querySelector('.sub_mo');
const slide = document.querySelectorAll(".slide_wrap>.slide");
const btnPrev = document.querySelector(".btn_prev");
const btnNext = document.querySelector(".btn_next");
const slideBtns = document.querySelectorAll(".slide_select_btn>li");
const btnPlay = document.querySelector(".btn_play");
const btnPause = document.querySelector(".btn_pause");
const videoDurationBars = document.querySelectorAll(".video-duration-bar");
const slideSelectBtns = document.querySelectorAll(".slide_select_btn li a");
const sections = document.querySelectorAll('.scroll-section');
const bannerWrap = document.querySelector('.store_banner_wrap');
const slideList = document.querySelectorAll(".store_banner_wrap > li");
const familyBtn = document.querySelector(".family_site");

//함수
let activation = (list, i)=>{
  for(let el of list){
    el.classList.remove("on","active");
  }
  list[i].classList.add("on","active");
}
function updateVideoDurationBars(currentIndex) {
  videoDurationBars.forEach((bar, index) => {
    if (index === currentIndex) {
      bar.classList.add("on");
    } else {
      bar.classList.remove("on");
    }
  });
}
function checkIfInView(element, contentClass) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  var isInView = rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth);

  var content = document.querySelector(contentClass);
  
  if (isInView) {
    content.classList.add('show');
  } else {
    content.classList.remove('show');
  }
}

// 헤더 스크롤
window.addEventListener('load', ()=>{
const header = document.querySelector("#header");
const headerWrap = document.querySelector(".header_wrap");
const gnbMenu = document.querySelectorAll(".gnb>ul>li");
const subMenus = document.querySelectorAll('.sub_menu');
window.addEventListener('scroll', e=> {
  var header = document.getElementById('header');
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 0) {
    header.classList.add('on');
  } else {
    header.classList.remove('on');
  }
});

// header 동작
gnbMenu.forEach((gnb, i)=>{
  gnb.addEventListener("mouseenter",e=>{
    e.preventDefault();
    activation(gnbMenu, i)
    header.style.height = `160px`;
  })
  gnb.addEventListener("mouseleave",e=>{
    e.preventDefault();
    gnb.classList.remove("on");
    header.style.height = `80px`;
  })
});

// 모바일 sub_menu
input.addEventListener('change', function() {
  if (this.checked) {
    subMo.style.display = 'block';
  } else {
    subMo.style.display = 'none';
  }
});

subMo.addEventListener('click', function(e) {
  const target = e.target;
  if (target.tagName === 'A') {
    const menuMo = target.nextElementSibling;
    if (menuMo.style.display === 'block') {
      menuMo.style.display = 'none';
    } else {
      const allMenuMos = document.querySelectorAll('.menu_mo');
      allMenuMos.forEach(function(mo) {
        mo.style.display = 'none';
      });
      menuMo.style.display = 'block';
    }
  }
});
});

// 이전, 다음 슬라이드로 이동
let bnnNum = 0;
const lastNum = slide.length - 1;
console.log(lastNum);
btnNext.addEventListener("click", e => {
  e.preventDefault();
  bnnNum = (bnnNum + 1) % slide.length;
  activation(slide, bnnNum);
  updateVideoDurationBars(bnnNum);
});

btnPrev.addEventListener("click", e => {
  e.preventDefault();
  bnnNum = (bnnNum - 1 + slide.length) % slide.length;
  activation(slide, bnnNum);
  updateVideoDurationBars(bnnNum);
});

// 슬라이드 번호로 이동
slideBtns.forEach((slideBtn, i) => {
  slideBtn.addEventListener("click", e => {
    e.preventDefault();
    activation(slide, i);
    updateVideoDurationBars(i);
  });
});

// 비디오 재생/멈춤 및 밝기
btnPlay.addEventListener("click", () => {
  slide.forEach(el => {
    const video = el.querySelector("video");
    video.play();
    btnPlay.style.opacity = 1; 
    btnPause.style.opacity = 0.5; 
  });
});

btnPause.addEventListener("click", () => {
  slide.forEach(el => {
    const video = el.querySelector("video");
    video.pause();
    btnPause.style.opacity = 1; 
    btnPlay.style.opacity = 0.5; 
  });
});

// 해당하는 index 에 videoDurationBars 
slideSelectBtns.forEach((btn, index) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    updateVideoDurationBars(index);
  });
});

// 현제 비디오 길이
document.addEventListener("DOMContentLoaded", function () {
  const videoElements = document.querySelectorAll(".slide_wrap video");
  const durationBarInnerElements = document.querySelectorAll(".slide_select_btn .video-duration-bar-inner");

  let isPaused = false;

  btnPlay.addEventListener("click", function (e) {
    e.preventDefault();
    isPaused = false;
    durationBarInnerElements.forEach((barInner) => {
      barInner.style.animationPlayState = "running";
    })
  })

  btnPause.addEventListener("click", function (e) {
    e.preventDefault();
    isPaused = true;
    durationBarInnerElements.forEach((barInner) => {
      barInner.style.animationPlayState = "paused";
    })
  })

  videoElements.forEach((video, index) => {
    video.addEventListener("loadedmetadata", () => {
      const duration = Math.round(video.duration);
      durationBarInnerElements[index].style.animationDuration = `${duration}s`;
      if (isPaused) {
        durationBarInnerElements[index].style.animationPlayState = "paused";
      }
    })
  })
});

// 숫자 동작 
const numbers = document.querySelectorAll('.content1 span');
numbers.forEach((number, index) => {
  const target = Number(number.innerText.replace(',', '')); // 글자를 문자로 바꿔주기
  let count = 0; 
  //각각 숫자에 인댁스에 따라 지연 넣어주기
  setTimeout(() => {
    // setInterval 을 통해 숫자들 동작 
    const interval = setInterval(() => {
      count += Math.ceil(target / 50); //  count 올려주기
      if (count >= target) { // target number 됬을시 정지
        clearInterval(interval);
        count = target;
      }
      number.innerText = count.toLocaleString(); // count text 를 새로운 count 로 바꿔주기
    }, 50); // 에니메이션 속도

    number.style.transition = '0.5s ease-out';
  }, index * 250);
});

// 신규오픈매장
const slideWidth = 680;
bannerWrap.style.width = `${slideWidth * slideList.length}px`;

let index = 0;
let direction = 1; // 1 앞, -1 뒤
const lastIndex = slideList.length - 1;
let isMoved = true;
const autoBnn = setInterval(() => {
  index += direction;
  if (index > lastIndex) {
    index = lastIndex - 1;
    direction = -1;
  } else if (index < 0) {
    index = 1;
    direction = 1;
  }

  bannerWrap.style.transform = `translateX(${-slideWidth * index}px)`;
}, 2000);

// footer 패밀리 사이트
familyBtn.addEventListener("click",e=>{
  e.preventDefault();
  familyBtn.classList.toggle("on");
})

// 탑버튼 스크롤 
const btnTop = document.querySelector('a.btn_top');
btnTop.addEventListener('click', e =>{
  e.preventDefault();
  window.scroll({
    top:0,
    left:0,
    behavior: 'smooth'
  })
})

// 탑버튼 op
window.addEventListener('scroll', () =>{
  let scroll = document.querySelector('html').scrollTop;
  console.log(scroll);
  if(scroll <= 0){
    btnTop.classList.remove("on", "ab");
  }else if(scroll > 5700){
    btnTop.classList.add("ab");
    btnTop.classList.add("on");
    
  }else{
    btnTop.classList.remove("ab");
    btnTop.classList.add("on");
  }
})

// 원스크롤
sections.forEach((section, i) => {
  section.addEventListener('wheel', e => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    let index = i + direction;
    if (index >= 0 && index < sections.length) {
      let top = sections[index].offsetTop;
      window.scroll({
        top: top,
        left: 0,
        behavior: 'smooth'
      });
    }
  });
});

// content 3,4 
window.addEventListener('scroll', e=> {
  var content3 = document.querySelector('.content3');
  var content4 = document.querySelector('.content4');

  checkIfInView(content3, '.content3');
  checkIfInView(content4, '.content4');
});

