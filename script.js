const html5QrCode = new Html5Qrcode("reader");

document.getElementById("start-button").addEventListener("click", function() {
    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 250
        },
        (decodedText, decodedResult) => {
            console.log(`Código QR escaneado: ${decodedText}`);
            window.location.href = decodedText;
            setTimeout(() => {
                html5QrCode.stop().then(ignore => {
                    console.log("Escaneo detenido");
                }).catch(err => {
                    console.error("Error al detener el escáner", err);
                });
                window.location.reload();
            }, 5000);
        },
        (errorMessage) => {
            console.error("Error de escaneo", errorMessage);
        }
    ).catch(err => {
        console.error("Error al iniciar el escáner", err);
    });
});
