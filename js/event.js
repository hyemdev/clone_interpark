window.addEventListener("load", function () {
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

    eventXhttp.open("GET", "data/eventdata.json");
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

        let swEventWrapper = document.querySelector(
            ".sw-event .swiper-wrapper"
        );

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
});
