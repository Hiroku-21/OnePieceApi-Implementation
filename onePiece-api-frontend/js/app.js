const fruitsContainer = document.getElementById("fruits");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentPage = 0;
const limit = 15;

async function loadFruits(page) {
  try {
    const offset = page * limit;
    // Llamada a tu backend (que a su vez consume la API externa de frutas)
    const response = await fetch(`http://localhost:3000/api/fruits?limit=${limit}&offset=${offset}`);
    const data = await response.json();

    fruitsContainer.innerHTML = "";

    if (data.results && Array.isArray(data.results)) {
      data.results.forEach(fruit => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center";

        card.innerHTML = `
          <h3 class="text-lg font-semibold text-gray-800 mb-2">${fruit.name}</h3>
          ${fruit.image ? `<img src="${fruit.image}" alt="${fruit.name}" class="w-32 h-32 object-cover rounded-md mb-3">` : ""}
          <p class="text-sm text-gray-600 mb-2"><strong>Tipo:</strong> ${fruit.type || "Desconocido"}</p>
          <p class="text-sm text-gray-500 italic">${fruit.description || "Sin descripción disponible."}</p>
        `;

        fruitsContainer.appendChild(card);
      });

      prevBtn.disabled = page === 0;
      nextBtn.disabled = offset + limit >= data.total;
    } else {
      fruitsContainer.innerHTML = `<p class="text-red-600">No se pudieron cargar frutas.</p>`;
    }
  } catch (error) {
    fruitsContainer.innerHTML = `<p class="text-red-600">Error al cargar frutas: ${error.message}</p>`;
  }
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    loadFruits(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  loadFruits(currentPage);
});

loadFruits(currentPage);