//html css js image font... 사용되는 리소스의 로드가 완료되고나서
//js가 실행되어야 정상적인 처리가 가능하다
window.onload = function () {
  //위로 이동하기(플라잉배너)
  //.gotop을 js에 저장하자
  const goTop = document.querySelector(".gotop");

  // goTop클릭을 처리한다.
  goTop.addEventListener("click", function () {
    //위로 슬라이드 이동
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

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
  xhttp.open("GET", "prodata.json"); //get방식으로 http에 데이터(prodata.json)를 가져오겠다.
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

  //  Shopping Swiper
  // 외부데이터(json) 연동하기
  let shoppingData;
  const shopXhttp = new XMLHttpRequest();
  shopXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      shoppingData = JSON.parse(req.response);
      makeShoppingSlide();
    }
  };
  shopXhttp.open("GET", "shoppingdata.json");
  shopXhttp.send();

  function makeShoppingSlide() {
    let swShoppingHtml = ``;
    for (let i = 0; i < shoppingData.good_count; i++) {
      let obj = shoppingData[`good_${i + 1}`];
      let temp = `
      <div class="swiper-slide">
      <a href="${obj.link}" class="good">
        <img src="images/${obj.img}" alt="${obj.product}" />
        <div class="good-info">
          <ul class="good-info-list">
            <li>
              <b><span>${obj.ratio}%</span> ${obj.price}원</b>
            </li>
            <li><p>${obj.product}</p></li>
          </ul>
        </div>
      </a>
    </div>
      `;
      swShoppingHtml += temp;
    }

    // HTML넣어줄 위치 지정하기
    let swShoppingWrapper = document.querySelector(
      ".sw-shopping .swiper-wrapper"
    );

    //innerHTML을 이용하여 넣어주기
    swShoppingWrapper.innerHTML = swShoppingHtml;

    //swiper JS
    let shoppingSwiper = new Swiper(".sw-shopping", {
      slidesPerView: 5,
      grid: {
        rows: 2,
        fill: "row",
      },
      spaceBetween: 10,
      breakpoints: {
        1024: {
          spaceBetween: 32,
          slidesPerView: 3,
          // 화면당 3개씩 슬라이드 이동
          slidesPerGroup: 3,
          grid: {
            rows: 1,
          },
        },
        1280: {
          spaceBetween: 26,
          slidesPerView: 4,
          // 화면당 4개씩 슬라이드 이동
          slidesPerGroup: 4,
          grid: {
            rows: 1,
          },
        },
      },
      navigation: {
        nextEl: ".shopping .sw-next",
        prevEl: ".shopping .sw-prev",
      },
    });
  }

  // 투어 스와이퍼
  // 외부데이터(json) 연동하기
  let swTourData;
  const tourXhttp = new XMLHttpRequest();
  tourXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      swTourData = JSON.parse(req.response);
      makeTourSlide();
    }
  };

  tourXhttp.open("GET", "tourdata.json");
  tourXhttp.send();

  function makeTourSlide() {
    let swTourHtml = ``;
    for (let i = 0; i < swTourData.tour_total; i++) {
      let obj = swTourData[`tour_${i + 1}`];
      let temp = `
      <div class="swiper-slide">
      <a href="${obj.link}" class="tour-link">
        <div class="tour-img">
          <img src="images/${obj.img}" alt="${obj.alt}" />
        </div>
        <div class="tour-info">
          <ul class="tour-info-list">
            <li><span class="tour-cate">${obj.cate}</span></li>
            <li>
              <span class="tour-title"
                >${obj.product}</span
              >
            </li>
            <li>
              <span class="tour-place"
                >${obj.place}</span
              >
            </li>
            <li>
              <span class="tour-price"><b>${obj.price}</b>원~ </span>
            </li>
          </ul>
        </div>
      </a>
    </div>
    `;
      swTourHtml += temp;
    }

    let swTourWrapper = document.querySelector(".sw-tour .swiper-wrapper");

    swTourWrapper.innerHTML = swTourHtml;

    let tourSwiper = new Swiper(".sw-tour", {
      slidesPerView: 3,
      grid: {
        rows: 2,
        fill: "row",
      },
      spaceBetween: 10,
      breakpoints: {
        1024: {
          spaceBetween: 24,
          slidesPerView: 2,
          // 화면당 2개씩 슬라이드 이동
          slidesPerGroup: 2,
          grid: {
            rows: 1,
          },
        },
        1280: {
          spaceBetween: 26,
          slidesPerView: 3,
          // 화면당 3개씩 슬라이드 이동
          slidesPerGroup: 3,
          grid: {
            rows: 1,
          },
        },
      },
      navigation: {
        nextEl: ".tour .sw-next",
        prevEl: ".tour .sw-prev",
      },
    });
  }

  // 티켓 스와이퍼
  // 외부데이터(json) 연동하기
  let swTicketData;
  const ticketXhttp = new XMLHttpRequest();
  ticketXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      swTicketData = JSON.parse(req.response);
      makeTicketSlide();
    }
  };
  ticketXhttp.open("GET", "ticketdata.json");
  ticketXhttp.send();

  function makeTicketSlide() {
    let swTicketHtml = ``;
    for (let i = 0; i < swTicketData.ticket_count; i++) {
      let obj = swTicketData[`ticket_${i + 1}`];
      let cate = obj.cate;
      let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="ticket-link">
          <div class="ticket-img">
            <img src="images/${obj.img}" alt="${obj.alt}" />
            <span class="ticket-rank">${obj.rank}</span>
          </div>
          <div class="ticket-info">
            <ul class="ticket-info-list">
              <li>
                <span class="ticket-title"
                  ><b>${obj.title}</b></span
                >
              </li>
              <li>
                <span class="ticket-hall">${obj.hall}</span>
              </li>
              <li>
                <span class="ticket-data"
                  >${obj.data}</span
                >
              </li>
              <li ${
                obj.sale ? "style='display:block'" : "style='display:none'"
              }}><span class="ticket-sale">${obj.sale}</span></li>
            </ul>
          </div>
        </a>
      </div>
      `;
      swTicketHtml += temp;
    }

    let swTicketWrapper = document.querySelector(".sw-ticket .swiper-wrapper");
    swTicketWrapper.innerHTML = swTicketHtml;

    let ticketSwiper = new Swiper(".sw-ticket", {
      slidesPerView: "auto",
      spaceBetween: 10,
      breakpoints: {
        1024: {
          spaceBetween: 32,
          slidesPerView: 3,
        },
        1280: {
          spaceBetween: 27,
          slidesPerView: 4,
        },
      },
      navigation: {
        nextEl: ".ticket .sw-next",
        prevEl: ".ticket .sw-prev",
      },
    });
  }

  // 라이브 스와이퍼
  // 외부데이터(json) 연동하기
  let swLiveData;
  const liveXhttp = new XMLHttpRequest();
  liveXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      swLiveData = JSON.parse(req.response);
      makeLiveSlide();
    }
  };
  liveXhttp.open("GET", "livedata.json");
  liveXhttp.send();

  function makeLiveSlide() {
    let swLiveHtml = ``;
    for (let i = 0; i < swLiveData.live_count; i++) {
      let obj = swLiveData[`live${i + 1}`];
      let temp = `
    <div class="swiper-slide">
  <a href="${obj.link}" class="live-link">
    <div class="live-img">
      <img src="images/${obj.img}" alt="${obj.alt}" />
    </div>
    <div class="live-info">
      <div class="live-info-top">
        <span class="live-info-cate">${obj.cate}</span>
        <p class="live-info-title">${obj.title}</p>
      </div>
      <div class="live-info-main">
        <p class="live-info-date">${obj.date}</p>
        <p class="live-info-time">${obj.time}</p>
      </div>
      <div class="live-info-bottom clearfix" ${
        obj.descTitle ? "style='display:block'" : "style='display:none'"
      }>
        <div class="live-info-thumb">
          <img src="images/${obj.img}" alt="${obj.alt}" />
        </div>
        <div class="live-info-desc">
          <p class="live-info-desc-title">
          ${obj.descTitle}
          </p>
          <p class="live-info-desc-price">
            <em>22%</em> <b>${obj.price}</b>원
          </p>
        </div>
      </div>
    </div>
  </a>
</div>
    `;
      swLiveHtml += temp;
    }

    let swLiveWrapper = document.querySelector(".sw-live .swiper-wrapper");
    swLiveWrapper.innerHTML = swLiveHtml;

    let liveSwiper = new Swiper(".sw-live", {
      slidesPerView: 4,
      spaceBetween: 10,
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 27,
        },
      },
      navigation: {
        nextEl: ".live .sw-next",
        prevEl: ".live .sw-prev",
      },
    });
  }

  // 도서 스와이프
  // 외부데이터(json) 연동하기
  let swBooksData;
  const booksXhttp = new XMLHttpRequest();
  booksXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      swBooksData = JSON.parse(req.response);
      makeBooksSlide();
    }
  };
  booksXhttp.open("GET", "booksdata.json");
  booksXhttp.send();

  function makeBooksSlide() {
    let swBooksHtml = ``;
    for (let i = 0; i < swBooksData.books_count; i++) {
      let obj = swBooksData[`books${i + 1}`];
      let temp = `
  <div class="swiper-slide">
  <a href="${obj.link}" class="books-link">
    <div class="books-img">
      <img src="images/${obj.img}" alt="${obj.alt}" />
    </div>
    <div class="books-info">
      <p class="books-info-title">${obj.title}</p>
      <p class="books-info-price"><em>${obj.price}</em>원</p>
    </div>
  </a>
</div>
    `;
      swBooksHtml += temp;
    }

    let swBooksWrapper = document.querySelector(".sw-books .swiper-wrapper");

    swBooksWrapper.innerHTML = swBooksHtml;

    let bookSwiper = new Swiper(".sw-books", {
      slidesPerView: 3,
      grid: {
        rows: 4,
        fill: "row",
      },
      spaceBetween: 19,
      breakpoints: {
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
          grid: {
            rows: 1,
          },
        },
        1280: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 27,
          grid: {
            rows: 1,
          },
        },
      },
      navigation: {
        nextEl: ".books .sw-next",
        prevEl: ".books .sw-prev",
      },
    });
  }

  // 이벤트 스와이퍼
  // 외부데이터(json) 연동하기
  let swEventData;
  const eventXhttp = new XMLHttpRequest();
  eventXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      swEventData = JSON.parse(req.response);
      makeEventSlide();
    }
  };

  eventXhttp.open("GET", "eventdata.json");
  eventXhttp.send();

  function makeEventSlide() {
    let swEventHtml = ``;
    for (let i = 0; i < swEventData.event_count; i++) {
      let obj = swEventData[`event${i + 1}`];
      let temp = `
    <div class="swiper-slide">
      <a href="${obj.link}" class="event-link">
      <img src="images/${obj.img}" alt="${obj.alt}"
      /></a>
    </div>
    `;
      swEventHtml += temp;
    }

    let swEventWrapper = document.querySelector(".sw-event .swiper-wrapper");

    swEventWrapper.innerHTML = swEventHtml;

    let eventSwiper = new Swiper(".sw-event", {
      slidesPerView: 3,
      spaceBetween: 27,
      breakpoints: {
        1280: {
          slidesPerView: 4,
        },
      },
      navigation: {
        nextEl: ".event .sw-next",
        prevEl: ".event .sw-prev",
      },
    });
  }
};
