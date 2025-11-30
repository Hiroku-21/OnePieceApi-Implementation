export const getCharacters = async (req, res) => {

    try {
        const limit = parseInt(req.query.limit) || 15;
        const offset = parseInt(req.query.offset) || 0;
        const {name, id, bounty, description} = req.query;


        // Lógica para obtener los personajes de la base de datos con paginación y filtros

        const fetchCharacters = async(identifier) => {
            const response = await fetch(`https://api.api-onepiece.com/v2/characters/en/${identifier}`);

            if (!response.ok) throw new Error(`Personaje no encontrado`);

            const data = await response.json();

            return {
                id: data.id,
                name: data.name,
                bounty: data.bounty,
                description: data.description,
                image: data.image
            };


        };

        if(id || name ) {
            const query = id || name;
            const character = await fetchCharacters(query);
            return res.json({ok: true, data: [character]});
        }



        //Sin filtrar -> lista paginada

        const listRes = await fetch(`https://api.api-onepiece.com/v2/characters/en/?limit=${limit}&offset=${offset}`);
        const listData = await listRes.json();

        const results = await Promise.all(
            listData.results.map(p => fetchCharacters(p.name))
        );


        return res.json({
            ok: true,
            offset,
            limit,
            total: listData.count,
            next: listData.next,
            previous: listData.previous,
            results,
        });

    } catch (error) {
        res.status(500).json({ok: false, msg: error.message});
    }
}