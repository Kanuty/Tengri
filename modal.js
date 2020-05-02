const modal = document.getElementById("awaitModal");

function hideModal() {
  modal.style.display = "none";
  window.removeEventListener("scroll", noScroll);
}

function openModal() {
  modal.style.display = "block";
  window.addEventListener("scroll", noScroll);
}

function noScroll() {
  window.scrollTo(0, 0);
}
// do something on load
(function () {
  {
    openModal();
  }
})();
