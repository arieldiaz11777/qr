const html5QrCode = new Html5Qrcode("reader");

document.getElementById("start-button").addEventListener("click", function () {
    // Iniciar el escaneo
    html5QrCode.start(
        { facingMode: "environment" }, // Usa la cámara trasera en dispositivos móviles
        {
            fps: 10,
            qrbox: 250 // Tamaño del área de escaneo
        },
        (decodedText, decodedResult) => {
            // Este callback se ejecuta cuando se detecta un código QR
            console.log(`Código QR escaneado: ${decodedText}`);
            // Redirigir a la URL del código QR
            window.location.href = decodedText;

            // Después de redirigir, reiniciar el escáner después de un tiempo
            setTimeout(() => {
                // Detener el escáner
                html5QrCode.stop().then(ignore => {
                    console.log("Escaneo detenido");
                }).catch(err => {
                    console.error("Error al detener el escáner", err);
                });

                // Reiniciar la página
                window.location.reload();
            }, 5000); // Esperar 5 segundos antes de reiniciar
        },
        (errorMessage) => {
            // Este callback se ejecuta cuando hay un error en el escaneo
            console.error("Error de escaneo", errorMessage);
        }
    ).catch(err => {
        console.error("Error al iniciar el escáner", err);
    });
});
