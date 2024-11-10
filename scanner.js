const fs = require('fs');
const readline = require('readline');
const csv = require('csv-parser');

// Diccionario para almacenar los productos
const productos = {};

// Función para cargar el archivo CSV
function cargarProductos() {
  return new Promise((resolve, reject) => {
    fs.createReadStream('productos.csv')
      .pipe(csv())
      .on('data', (row) => {
        // Convertir el número de serie a string y almacenar en el diccionario
        productos[row.numero_serie.toString()] = row.producto;
      })
      .on('end', () => {
        console.log('Archivo CSV cargado correctamente.');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error al leer el archivo CSV:', err);
        reject(err);
      });
  });
}

// Configuración para capturar la entrada desde la terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para iniciar el escaneo
async function iniciarEscaneo() {
  console.log("Escanea un código de barras:");

  rl.on('line', (codigo) => {
    const producto = productos[codigo.trim()];
    if (producto) {
      console.log(`Nombre detectado: ${producto}`);
    } else {
      console.log("Código no encontrado.");
    }
    console.log("Escanea otro código de barras o presiona Ctrl+C para salir:");
  });

  rl.on('SIGINT', () => {
    console.log("\nPrograma terminado.");
    process.exit();
  });
}

// Cargar productos y luego iniciar el escaneo
(async () => {
  await cargarProductos();
  iniciarEscaneo();
})();
