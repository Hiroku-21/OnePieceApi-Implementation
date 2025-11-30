// controllers/characterController.js

export const getCharacters = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 15;
    const offset = parseInt(req.query.offset) || 0;

    // URL correcta
    const response = await fetch("https://api.api-onepiece.com/v2/characters/en", {
      headers: { "Accept": "application/json" }
    });

    if (!response.ok) {
  return res.status(response.status).json({
    ok: false,
    msg: `Error al consumir la API externa: ${response.statusText}`
  });
}

    const data = await response.json();

    // Paginación
    const paginatedData = data.slice(offset, offset + limit);

    res.json({
      limit,
      offset,
      total: data.length,
      results: paginatedData
    });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};

export const getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;

    // URL correcta
    const response = await fetch(`https://api.api-onepiece.com/v2/characters/en/{id}`, {
      headers: { "Accept": "application/json" }
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ ok: false, msg: text });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener personaje" });
  }
};