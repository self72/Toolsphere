function filterTools() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.getElementsByClassName("tool-card");

  for (let card of cards) {
    let title = card.querySelector("h3").innerText.toLowerCase();
    let desc = card.querySelector("p").innerText.toLowerCase();
    if (title.includes(input) || desc.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  }
}
