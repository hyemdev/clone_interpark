/**
 * 작성자 : 홍길동
 * 연락처 : aaa@aaa.com;
 * 작성일 : 23-05-22
 * 기능 : 쇼핑몰 리스트 슬라이드 콛,
 * 업데이트 : 각 쇼핑몰 리스트 목록 출력 함수화 작업 

*/

window.addEventListener("load", function () {
    // 프로모션 Swiper

    // 1번 백틱을 이용한 html생성 (.sw-promotion에 출력할 html 생성)
    //  for문을 이용한 데이터 html 생성

    // json형태(javascript object notiation)의 데이터가 전송됨
    // prodata.json을 볼러와서 배치한다.(외부연동)

    let data;
    const xhttp = new XMLHttpRequest(); //json을 불러들일 때 쓴다.
    xhttp.onreadystatechange = function (event) {
        const req = event.target;
        if (req.readyState === XMLHttpRequest.DONE) {
            //readystate에 XMLHttpRequest의 자료를 다 불러왔다면.
            // console.log(req.response);
            //현재 전달된 문자들은 json이 아니다.
            //req.response는 데이터 타입이 문자열임.

            //문자열은 json 객체로 변경하는 작업을 해야한다.
            data = JSON.parse(req.response); // json을 해석(parse)해서 data에 담아라
            makePromotionSlide(); //자료가 다 들어오고 실행이 되게 하고싶으므로 하단에 function기능을 넣어준다
        }
    };
    xhttp.open("GET", "data/prodata.json"); //get방식으로 http에 데이터(prodata.json)를 가져오겠다.
    xhttp.send(); //송출한다.

    function makePromotionSlide() {
        //function을 만들어서 실행 될 내용을 넣는다.

        let swPromotionHtml = ``;
        for (let i = 0; i < data.good_count; i++) {
            let obj = data[`good_${i + 1}`];
            let html = `
      <div class="swiper-slide">
        <a href="${obj.link}">
          <img src="images/${obj.img}" alt="${obj.name}">
        </a>
      </div>
      `;
            swPromotionHtml += html; // swPromotionHtml = swPromotionHtml + html ;
        }
        //위의 백틱 내용을 넣어줄 장소를 저장
        let swPromotionWrapper = document.querySelector(
            ".sw-promotion .swiper-wrapper"
        );
        // 내용넣어줄 장소에 innerHTML을 이용하여 위에 저장한 내용을 넣어주기
        swPromotionWrapper.innerHTML = swPromotionHtml;

        // 2번 json 데이터로 뽑아보기

        let promotionSwiper = new Swiper(".sw-promotion", {
            slidesPerView: 1,
            spaceBetween: 24,
            speed: 1000,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },

            navigation: {
                nextEl: ".promotion .sw-next",
                prevEl: ".promotion .sw-prev",
            },
            pagination: {
                el: ".sw-promotion-pg",
                clickable: true,
            },

            breakpoints: {
                760: {
                    slidesPerView: 2,
                },
            },
        });
    }
});
