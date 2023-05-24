/**
 * 작성자 : 홍길동
 * 연락처 : aaa@aaa.com;
 * 작성일 : 23-05-22
 * 기능 : 쇼핑몰 리스트 슬라이드 콛,
 * 업데이트 : 각 쇼핑몰 리스트 목록 출력 함수화 작업 

*/

window.addEventListener("load", function () {
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
    liveXhttp.open("GET", "data/livedata.json");
    liveXhttp.send();

    function makeLiveSlide() {
        let swLiveHtml = ``;
        for (i = 0; i <  swLiveData.live_count; i++) {
            let obj =  swLiveData[`live_${i + 1}`];
            let temp = `
          <div class="swiper-slide">
            <a href="${obj.link}" class="live-link">
              <div class="live-img">
                <img src="images/${obj.pic}" alt="${obj.alt}" />
              </div>
              <div class="live-info">
                <div class="live-info-top">
                  <span class="live-info-cate">${obj.category}</span>
                  <p class="live-info-title">${obj.title}</p></p>
                </div>
                <div class="live-info-main">
                  <p class="live-info-date">${obj.date}</p>
                  <p class="live-info-time">${obj.time}</p>
                </div>
                <div class="live-info-bottom clearfix">
                  <div class="live-info-thumb" ${
                      obj.thumbImg
                          ? "style='display:block'"
                          : "style='display:none'"
                  }>
                    <img src="images/${obj.thumbImg}" alt="${obj.thumbAlt}" />
                  </div>
                  <div class="live-info-desc" ${
                      obj.descTitle
                          ? "style='display:block'"
                          : "style='display:none'"
                  }>
                    <p class="live-info-desc-title">
                      ${obj.descTitle}
                    </p>
                    <p class="live-info-desc-price" ${
                        obj.ratio
                            ? "style='display:block'"
                            : "style='display:none'"
                    }>
                      <em>${obj.ratio}%</em><b>${obj.price}</b>원
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>`;
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
});
