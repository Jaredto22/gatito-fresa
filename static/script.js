const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

const img = new Image();

// IMPORTANTE
img.src = '/static/imagen.png';

img.onload = () => {

    // Canvas temporal para leer la imagen original
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = 500;
    tempCanvas.height = 500;

    tempCtx.drawImage(img, 0, 0, 500, 500);

    let fila = 0;
    const paso = 3;

    function dibujarPorTrazos() {

        for (let x = 0; x < 500; x += paso) {

            const pixel = tempCtx.getImageData(x, fila, 1, 1).data;

            const r = pixel[0];
            const g = pixel[1];
            const b = pixel[2];
            const a = pixel[3] / 255;

            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(x, fila);
            ctx.lineTo(x + 3, fila + Math.random() * 2);
            ctx.stroke();
        }

        fila += paso;
         if (fila < 500) {
            requestAnimationFrame(dibujarPorTrazos);
        }
    }

    dibujarPorTrazos();
};

// Por si ocurre un error cargando la imagen
img.onerror = () => {
    console.log('No se pudo cargar la imagen');
};