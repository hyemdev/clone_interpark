window.addEventListener("load", function () {
    // 티켓 스와이퍼

    //ticket 데이터 파싱 및 슬라이드 제작
    function parseTicket(_cate) {
        const ticketXhttp = new XMLHttpRequest();
        ticketXhttp.onreadystatechange = function (event) {
            let req = event.target;
            if (req.readyState === XMLHttpRequest.DONE) {
                data = JSON.parse(req.response);
                makeTicketSlide(data);
            }
        };
        if (_cate === "뮤지컬") {
            ticketXhttp.open("GET", "data/ticketdata.json");
        } else if (_cate === "콘서트") {
            ticketXhttp.open("GET", "data/ticketdata1.json");
        } else if (_cate === "연극") {
            ticketXhttp.open("GET", "data/ticketdata2.json");
        } else if (_cate === "클래식/무용") {
            ticketXhttp.open("GET", "data/ticketdata3.json");
        } else if (_cate === "스포츠") {
            ticketXhttp.open("GET", "data/ticketdata4.json");
        } else if (_cate === "레저/캠핑") {
            ticketXhttp.open("GET", "data/ticketdata5.json");
        } else if (_cate === "전시/행사") {
            ticketXhttp.open("GET", "data/ticketdata6.json");
        } else if (_cate === "아동/가족") {
            ticketXhttp.open("GET", "data/ticketdata7.json");
        }
        ticketXhttp.send();
    }

    parseTicket("뮤지컬");

    let ticketSwiper;

    function makeTicketSlide(_data) {
        let swTicketHtml = ``;
        for (let i = 0; i < _data.ticket_total; i++) {
            let obj = _data[`ticket_${i + 1}`];
            let cate = obj.cate;
            let temp = `
    <div class="swiper-slide">
      <a href="${obj.link}" class="ticket-link">
        <div class="ticket-img">
          <img src="images/${obj.pic}" alt="${obj.alt}" />
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
                >${obj.date}</span
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

        let swTicketWrapper = document.querySelector(
            ".sw-ticket .swiper-wrapper"
        );
        swTicketWrapper.innerHTML = swTicketHtml;

        // 새로 생성 전에 swiper API를 이용해서 삭제한다.
        if (ticketSwiper) {
            ticketSwiper.destroy();
        }
        ticketSwiper = new Swiper(".sw-ticket", {
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
    let btns = this.document.querySelectorAll(".ticket .btns a");
    let cateName = [
        "뮤지컬",
        "콘서트",
        "연극",
        "클래식/무용",
        "스포츠",
        "레저/캠핑",
        "전시/행사",
        "아동/가족",
    ];
    for (let i = 0; i < cateName.length; i++) {
        btns[i].onclick = function (event) {
            event.preventDefault();
            parseTicket(cateName[i]);

            for (let j = 0; j < btns.length; j++) {
                btns[j].classList.remove("btns-active");
            }
            
            this.classList.add("btns-active");
        };
        
            //포커스 적용
            btns[0].classList.add("btns-active");
    }
    
});
