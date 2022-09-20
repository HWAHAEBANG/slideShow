

// 변수 지정
// let sliderWrapper = document.querySelector('.container'); 이것도 됨.
const sliderWrapper = document.getElementsByClassName('container');
const sliderContainer = document.getElementsByClassName('slider-container');;
let slides = document.getElementsByClassName('slide'); // 여러개 이기 때문에 콘솔찍어보면 배열로 나옴
let slideCount = slides.length; // 그래서 배열의 길이로 구해주면 되는 것임
let currentIndex = 0; 
let topHeight = 0; // 슬라이드 중에서 제일 높은 걸 가져오기 위함.
const navPrev = document.getElementById('prev');
const navNext = document.getElementById('next');

// console.log(slides);
	
//슬라이드의 높이 확인하여 부모의 높이로 지정하기 (슬라이드의 높이가 다르게 들어올 수도 있으니까 css 가 아닌 JS에서 작성하는 것)
function calculateTallestSlide(){
  for(let i = 0; i < slideCount; i++){
    if(slides[i].offsetHeight > topHeight) { //.offsetHeight가 높이 구하는 것.
      topHeight = slides[i].offsetHeight;
    }  
  }
  sliderWrapper[0].style.height = topHeight + 'px'
  sliderContainer[0].style.height = topHeight + 'px'
}

calculateTallestSlide();

// 슬라이드가 있으면 가로로 배열하기
for(let i = 0; i < slideCount; i++){
  slides[i].style.left =  i*100 + '%'
}

// 슬라이드 이동 함수 
function goToSlide(idx){
  sliderContainer[0].style.left = idx* - 100 + '%';
  sliderContainer[0].classList.add('animated'); // 이건 왜 [0]을 붙여줘야할까?
  currentIndex = idx;

  //updateNav(); 마지막 버튼 누르면 처음으로 되돌아오기하기 위해 주석처리
}

// goToSlide(1);

// 버튼기능 업데이트 함수(마지막은 버튼 사라지게 하기)
function updateNav(){
  if(currentIndex == 0){
    navPrev.classList.add('disabled');
  } else {
    navPrev.classList.remove('disabled');
  }

  if(currentIndex == slideCount-1){
    navNext.classList.add('disabled');
  } else {
    navNext.classList.remove('disabled');
  }
}


// 버튼을 클릭하면 슬라이드 이동시키기
navPrev.addEventListener('click', (event) => {
  event.preventDefault(); // 고유의 기능을 막아버리기
  //goToSlide(currentIndex - 1);
  if(currentIndex == 0) {
    goToSlide(slideCount - 1);
  } else {
    goToSlide(currentIndex - 1);
  }
})

navNext.addEventListener('click', (event) => {
  event.preventDefault(); // 고유의 기능을 막아버리기
  //goToSlide(currentIndex + 1);
  if(currentIndex == slideCount - 1) {
    goToSlide(0);
  } else {
    goToSlide(currentIndex + 1);
  }
})


// 첫번째 슬라이드 먼저 보이도록 하기
goToSlide(0);

