document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".right");
    const prevBtn = document.querySelector(".left");

    let current = 0;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            current = (current + 1) % slides.length;
            showSlide(current);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            current = (current - 1 + slides.length) % slides.length;
            showSlide(current);
        });
    }

    setInterval(function () {
        current = (current + 1) % slides.length;
        showSlide(current);
    }, 4000);

});