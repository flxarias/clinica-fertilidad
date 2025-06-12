const fs = require('fs');
const axios = require('axios');

// URLs de las imágenes generadas usando DALL-E 3
const images = {
    'hero-bg.jpg': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    'doctor1.jpg': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    'doctor2.jpg': 'https://images.unsplash.com/photo-1573497014578-e58df917305d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
};

async function downloadImage(url, filename) {
    try {
        const response = await axios.get(url, { responseType: 'stream' });
        await new Promise((resolve, reject) => {
            response.data.pipe(fs.createWriteStream(`img/${filename}`))
                .on('finish', resolve)
                .on('error', reject);
        });
        console.log(`Descargada ${filename} correctamente`);
    } catch (error) {
        console.error(`Error al descargar ${filename}:`, error);
    }
}

async function downloadAllImages() {
    for (const [filename, url] of Object.entries(images)) {
        await downloadImage(url, filename);
    }
}

downloadAllImages().catch(console.error);
