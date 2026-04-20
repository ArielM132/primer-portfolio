document.addEventListener("DOMContentLoaded", () => {
    

    const mensajeBienvenida = document.querySelector(".subtitle");
    
    const hora = new Date().getHours();
    let saludo = "";

    if (hora >= 6 && hora < 13) {
        saludo = "¡Buen día! Soy";
    } else if (hora >= 13 && hora < 20) {
        saludo = "¡Buenas tardes! Soy";
    } else {
        saludo = "¡Buenas noches! Soy";
    }

    mensajeBienvenida.textContent = `${saludo} un Desarrollador Full Stack en formación`;
});