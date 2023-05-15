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
  let promotionData = {
    good_1: { name: "제품1", img: "promotion1.jpg", link: "" },
    good_2: { name: "제품2", img: "promotion2.png", link: "" },
    good_3: { name: "제품3", img: "promotion3.jpg", link: "" },
    good_4: { name: "제품4", img: "promotion4.jpg", link: "" },
    good_5: { name: "제품5", img: "promotion5.jpg", link: "" },
    good_6: { name: "제품6", img: "promotion6.jpg", link: "" },
  };

  let swPromotionHtml = ``;

  for (let i = 0; i < 6; i++) {
    let obj = promotionData[`good_${i + 1}`];
    let html = `
    <div class="swiper-slide">
      <a href="${obj.link}">
        <img src="images/${obj.img}" alt="${obj.name}">
      </a>
    </div>`;
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

  //  Shopping Swiper

  let shoppingData = {
    good_count: 5,
    good_1: {
      link: "#",
      img: "good1.png",
      product: "맥 MAC 립스틱",
      ratio: 5,
      price: "11,950",
    },
    good_2: {
      link: "#",
      img: "good2.jpg",
      product: "[장터할매]2023년 햇양파 중품/짱아치용 특품 3kg~10kg",
      ratio: "5",
      price: "11,950",
    },
    good_3: {
      link: "#",
      img: "good3.jpg",
      product:
        "QCY GTS 스마트워치 2세대 블랙/ 블루투스 통화가능/실리콘 스트랩 메탈 스트랩 TPU 보호필름 추가구매",
      ratio: "14",
      price: "24,900",
    },
    good_4: {
      link: "#",
      img: "good4.jpg",
      product: "[베베당] 유기농 롱스틱 골고루 10봉 세트",
      ratio: "23",
      price: "15,900",
    },
    good_5: {
      link: "#",
      img: "good1.png",
      product: "맥 MAC 립스틱",
      ratio: 5,
      price: "11,950",
    },
  };

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

  // 투어 스와이퍼

  let swTourData = {
    tour_total: 3,
    tour_1: {
      link: "#",
      alt: "tour",
      img: "tour1.jpg",
      cate: "5성숙박",
      product: "[초특가] 워터파크VS바나힐 다낭/호이안 패키지",
      place: "워터파크VS바나힐 ★5성숙박★ 다낭/호이안 티웨이항공 3박5일",
      price: "299,000",
    },
    tour_2: {
      link: "#",
      alt: "tour",
      img: "tour2.jpg",
      cate: "단독특가",
      product: "나이아가라 혼블라워호 / 자유의 여신상 유람선 포함",
      place:
        "[미동부/캐나다 10일] 밤 출발 에어프레미아 10일 [퀘벡숙박/3대야경/보스턴]",
      price: "3.490,000",
    },
    tour_3: {
      link: "#",
      alt: "tour",
      img: "tour3.jpg",
      cate: "최저가보장",
      product: "리조트 선택가능+반나절 자유일정",
      place: "[최저가보장제] 초특가 세부/오전出 5일 세미패키지",
      price: "249,000",
    },
  };

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

  // 티켓 스와이퍼

  let swTicketData = {
    ticket_count: 5,
    ticket_1: {
      link: "#",
      img: "musical1.gif",
      alt: "티켓",
      rank: "1",
      title: "뮤지컬 <영웅> - 블루스퀘어",
      hall: "블루스퀘어 신한카드홀",
      data: "2023.03.17 ~ 2023.05.21",
      sale: "단독판매",
    },
    ticket_2: {
      link: "#",
      img: "musical2.gif",
      alt: "티켓",
      rank: "2",
      title: "뮤지컬 〈베토벤; Beethoven Secret〉 SEASON 2",
      hall: "세종문화회관 대극장",
      data: "2023.04.14 ~2023.05.15",
      sale: "",
    },
    ticket_3: {
      link: "#",
      img: "musical3.gif",
      alt: "티켓",
      rank: "3",
      title: "뮤지컬 <해적>",
      hall: "블루스퀘어 신한카드홀",
      data: "2023.03.17 ~ 2023.05.21",
      sale: "",
    },
    ticket_4: {
      link: "#",
      img: "musical4.gif",
      alt: "티켓",
      rank: "4",
      title: "뮤지컬 <맘마미아>",
      hall: "블루스퀘어 신한카드홀",
      data: "2023.03.17 ~ 2023.05.21",
      sale: "",
    },
    ticket_5: {
      link: "#",
      img: "musical1.gif",
      alt: "티켓",
      rank: "5",
      title: "뮤지컬 <영웅> - 블루스퀘어",
      hall: "블루스퀘어 신한카드홀",
      data: "2023.03.17 ~ 2023.05.21",
      sale: "단독판매",
    },
  };

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

  // 라이브 스와이퍼

  let swLiveData = {
    live_count: 4,
    live1: {
      link: "#",
      img: "live1.jpg",
      alt: "라이브",
      cate: "방송예정",
      title: "소담상회 x 이로운에프앤비",
      date: "04월 27일 (목)",
      time: "16:00",
      descTitle: "[미미의밥상] 감자탕 4.7kg(국내산등뼈 100% 10인분)+라면사리",
      price: "19,840",
    },
    live2: {
      link: "#",
      img: "live2.jpg",
      alt: "라이브",
      cate: "방송예정",
      title: "[부산 오션뷰 호텔 특집] 룸온리&패키지 최대 86% 할인",
      date: "04월 27일 (목)",
      time: "19:00",
      descTitle: "",
      price: "",
    },
    live3: {
      link: "#",
      img: "live3.jpg",
      alt: "라이브",
      cate: "방송예정",
      title: "소담상회 x 명가",
      date: "04월 28일 (금)",
      time: "16:00",
      descTitle:
        "[쿠폰할인][2022년햅쌀][명가미곡]신동진쌀 백미10Kg,단일품종,잡곡",
      price: "24,900",
    },
    live4: {
      link: "#",
      img: "live4.jpg",
      alt: "라이브",
      cate: "방송예정",
      title:
        " 2박 3일로 떠나는 후쿠오카 여행 ✈ 패키지VS자유여행 다 준비했어요😆",
      date: "04월 28일 (금)",
      time: "20:30",
      descTitle: "",
      price: "",
    },
  };

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

  // 도서 스와이프

  let swBooksHtml = `
  <div class="swiper-slide">
  <a href="#" class="books-link">
    <div class="books-img">
      <img src="images/book1.jpg" alt="도서" />
    </div>
    <div class="books-info">
      <p class="books-info-title">New 대한민국 청약지도</p>
      <p class="books-info-price"><em>18,000</em>원</p>
    </div>
  </a>
</div>
<div class="swiper-slide">
  <a href="#" class="books-link">
    <div class="books-img">
      <img src="images/book2.jpg" alt="도서" />
    </div>
    <div class="books-info">
      <p class="books-info-title">고래</p>
      <p class="books-info-price"><em>13,500</em>원</p>
    </div>
  </a>
</div>
<div class="swiper-slide">
  <a href="#" class="books-link">
    <div class="books-img">
      <img src="images/book3.jpg" alt="도서" />
    </div>
    <div class="books-info">
      <p class="books-info-title">굿바이 코드네임</p>
      <p class="books-info-price"><em>13,500</em>원</p>
    </div>
  </a>
</div>
<div class="swiper-slide">
  <a href="#" class="books-link">
    <div class="books-img">
      <img src="images/book4.jpg" alt="도서" />
    </div>
    <div class="books-info">
      <p class="books-info-title">나의 봄날인 너에게</p>
      <p class="books-info-price"><em>15,120</em>원</p>
    </div>
  </a>
</div>
<div class="swiper-slide">
  <a href="#" class="books-link">
    <div class="books-img">
      <img src="images/book5.jpg" alt="도서" />
    </div>
    <div class="books-info">
      <p class="books-info-title">
        그냥 밥 먹자는 말이 아니었을지도 몰라
      </p>
      <p class="books-info-price"><em>15,300</em>원</p>
    </div>
  </a>
</div>
<div class="swiper-slide">
  <a href="#" class="books-link">
    <div class="books-img">
      <img src="images/book1.jpg" alt="도서" />
    </div>
    <div class="books-info">
      <p class="books-info-title">New 대한민국 청약지도</p>
      <p class="books-info-price"><em>18,000</em>원</p>
    </div>
  </a>
</div>
<div class="swiper-slide">
  <a href="#" class="books-link">
    <div class="books-img">
      <img src="images/book2.jpg" alt="도서" />
    </div>
    <div class="books-info">
      <p class="books-info-title">고래</p>
      <p class="books-info-price"><em>13,500</em>원</p>
    </div>
  </a>
</div>
<div class="swiper-slide">
  <a href="#" class="books-link">
    <div class="books-img">
      <img src="images/book3.jpg" alt="도서" />
    </div>
    <div class="books-info">
      <p class="books-info-title">굿바이 코드네임</p>
      <p class="books-info-price"><em>13,500</em>원</p>
    </div>
  </a>
</div>
<div class="swiper-slide">
  <a href="#" class="books-link">
    <div class="books-img">
      <img src="images/book4.jpg" alt="도서" />
    </div>
    <div class="books-info">
      <p class="books-info-title">나의 봄날인 너에게</p>
      <p class="books-info-price"><em>15,120</em>원</p>
    </div>
  </a>
</div>
<div class="swiper-slide">
  <a href="#" class="books-link">
    <div class="books-img">
      <img src="images/book5.jpg" alt="도서" />
    </div>
    <div class="books-info">
      <p class="books-info-title">
        그냥 밥 먹자는 말이 아니었을지도 몰라
      </p>
      <p class="books-info-price"><em>15,300</em>원</p>
    </div>
  </a>
</div>
`;
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

  // 이벤트 스와이퍼

  let swEventHtml = `
  <div class="swiper-slide">
  <a href="#" class="event-link">
    <img src="images/banner1.jpg" alt="이벤트"
  /></a>
</div>
<div class="swiper-slide">
  <a href="#" class="event-link">
    <img src="images/banner2.png" alt="이벤트"
  /></a>
</div>
<div class="swiper-slide">
  <a href="#" class="event-link">
    <img src="images/banner3.jpg" alt="이벤트"
  /></a>
</div>
<div class="swiper-slide">
  <a href="#" class="event-link">
    <img src="images/banner4.jpg" alt="이벤트"
  /></a>
</div>
  `;
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
};
