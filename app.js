//Carrossel

const container = document.getElementById("terapeutas");
  document.getElementById("scrollLeft").onclick = () => {
  container.scrollBy({ left: -250, behavior: "smooth" });
  };
  document.getElementById("scrollRight").onclick = () => {
  container.scrollBy({ left: 250, behavior: "smooth" });
  };