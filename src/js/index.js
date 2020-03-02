import $ from "jquery";

const data = require("../data");

const animateSlideText = (selector, data, iteration) => {
  const totalArr = data.length;
  const targetAnimateText = data[iteration].text;
  const targetAnimateColor = data[iteration].color;
  const currentId = data[iteration].id;
  const textArr = targetAnimateText.split("");
  const result = textArr
    .map(item => {
      return `<span class="${
        item === " " ? "empty" : ""
      }" style="color: ${targetAnimateColor}">${item}</span>`;
    })
    .join("");

  setTimeout(() => {
    $(selector)
      .html(result)
      // .addClass("animate-in")
      .removeClass("animate-out");

    if (currentId !== "home") {
      $(selector)
        .parents("section")
        .find(".title span")
        .removeClass("hide");
    } else {
      $(selector)
        .parents("section")
        .find(".title span")
        .addClass("hide");
    }
  }, 1000);

  setTimeout(() => {
    $(selector).addClass("animate-out");
    // .removeClass("animate-in");

    iteration++;
    if (iteration === totalArr) iteration = 0;
    animateSlideText(selector, data, iteration);
  }, 5000);
};

const scrollingEffect = position => {
  $(window).scroll(function(e) {
    const innerHeight = window.innerHeight;
    const scrollTop = $(this).scrollTop();

    if (scrollTop > innerHeight / 2) {
      $("header").addClass("active");
    } else {
      $("header").removeClass("active");
    }

    let currentActive = null;
    $("article").each(function() {
      const elementScrollTop = $(this).offset().top;
      // console.log(scrollTop, elementScrollTop);
      if (scrollTop + elementScrollTop / 6 >= elementScrollTop) {
        currentActive = $(this);
      }
    });

    // console.log(currentActive);
    currentActive
      .addClass("active")
      .siblings()
      .removeClass("active");

    const activeRoute = currentActive.data("target");
    const currentPosition = position.find(item => item.id === activeRoute);
    $("header .logo .position").html(
      `<span style="color: ${currentPosition.color}">${currentPosition.text}</span>`
    );

    currentActive
      .find(".overlay")
      .css("background-color", currentPosition.color);

    location.hash = activeRoute;
  });
};

let marqueeRequest = {};
let timeoutRequest = {};
const renderImage = images => {
  $("[data-image]").each((index, value) => {
    const target = $(value)
      .parents("article")
      .data("target");
    const imageSet = images[target];
    const imageSetDom = imageSet
      .map((item, index) => {
        return `<div class="photo-item"><img src="${item}" /></div>`;
      })
      .join("");

    let count = 0;
    let newStructure = {};
    $(imageSetDom).each((index, value) => {
      const mean = Math.floor(imageSet.length / 3);
      if (index % mean === 0) {
        count++;
      }
      if (count > 3) count = 1;
      if (!newStructure[count]) newStructure[count] = [];
      newStructure[count].push(value);
    });

    const finalStructure = Object.entries(newStructure)
      .map(item => {
        return `<div class="photo-row">${item[1]
          .map(item => {
            return $(item).get(0).outerHTML;
          })
          .join("")}</div>`;
      })
      .join("");

    $(value).html(finalStructure);

    $(".photo-row").each(function(index, value) {
      $(value).append($(value).html());
      let width = calculatePhotoWidth(0);
      const speed = 1;
      let position = 0;

      function calculatePhotoWidth(total) {
        $(value)
            .find(".photo-item")
            .each((index, value) => {
              total += $(value).width() + 10;
            });
        return total
      }

      function marqueeRun() {
        position -= 1 * speed * (index + 1) * 0.5;
        if (Math.abs(position) >= width / 2) position = 0;
        $(value).css("transform", `translateX(${position}px)`);
        window.requestAnimationFrame(marqueeRun);
      }

      marqueeRequest[index] = window.requestAnimationFrame(marqueeRun);
      $(window).on("resize", function() {
        width = calculatePhotoWidth(0);
        window.cancelAnimationFrame(marqueeRequest[index]);
        clearTimeout(timeoutRequest[index]);
        timeoutRequest[index] = setTimeout(function() {
          marqueeRequest[index] = window.requestAnimationFrame(marqueeRun);
        }, 200);
      });

      // $(value).hover(
      //   function() {
      //     // console.log($(value).index())
      //     // console.log($(value).index() + 1, marqueeRequest[$(value).index()])
      //     if (marqueeRequest[$(value).index() + 1]) {
      //       window.cancelAnimationFrame(marqueeRequest[$(value).index() + 1]);
      //       marqueeRequest[$(value).index() + 1] = undefined;
      //     }
      //   },
      //   function() {
      //     if (!marqueeRequest[$(value).index() + 1]) {
      //       marqueeRequest[$(value).index() + 1] = window.requestAnimationFrame(marqueeRun);
      //     }
      //   }
      // );
    });
  });
};

$(document).ready(function() {
  const { position, images } = data;
  const positionDOM = $('article[data-target="home"] .position');
  const homeDOM = $('article[data-target="home"]');

  animateSlideText(positionDOM, position, 0);
  scrollingEffect(position);

  renderImage(images);
});
