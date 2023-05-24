//html css js image font... 사용되는 리소스의 로드가 완료되고나서
//js가 실행되어야 정상적인 처리가 가능하다
window.onload = function () {
    //모달창 처리
       //스크롤 없애기 
    let body = document.querySelector("body");
        body.classList.add("modal-active");
        //클릭하면 사라지게 만들기
    let modal = document.querySelector(".modal");
    modal.onclick = function (){
        body.classList.remove("modal-active");
        this.style.display = "none";
    };

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
};
