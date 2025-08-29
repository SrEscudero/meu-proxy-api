// Contenido temporal para server.js para depuración
module.exports = (req, res) => {
  // Verificamos si el método de la petición es POST
  if (req.method === 'POST') {
    // Si es POST, respondemos con éxito (código 200)
    res.status(200).json({
      message: '¡Éxito! La petición POST fue recibida correctamente por la función de Vercel.',
      path: req.url,
      body: req.body,
    });
  } else {
    // Si es cualquier otro método, respondemos con el error 405
    res.status(405).json({ error: `Método ${req.method} no permitido.` });
  }
};