$(function () {
  const typedTexts = document.querySelectorAll('.typed-text');
  if (typedTexts.length && window.Typed) {
    typedTexts.forEach((typedText) => {
      let strings = JSON.parse(typedText.getAttribute('data-typed-text'));
      if (strings) {
        return new window.Typed(typedText, {
          strings: strings,
          typeSpeed: 30,
          loop: true,
          backDelay: 1500,
        });
      }
    });
  }
})