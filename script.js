// Esperamos a que todo el HTML esté cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Buscamos el elemento donde está tu descripción (el que cambiamos antes)
    // Asegúrate de que en tu HTML, el <p> tenga la clase "subtitle"
    const mensajeBienvenida = document.querySelector(".subtitle");
    
    // 2. Obtenemos la hora actual (solo el número del 0 al 23)
    const hora = new Date().getHours();
    let saludo = "";

    // 3. Lógica para decidir qué saludo poner
    if (hora >= 6 && hora < 13) {
        saludo = "¡Buen día! Soy";
    } else if (hora >= 13 && hora < 20) {
        saludo = "¡Buenas tardes! Soy";
    } else {
        saludo = "¡Buenas noches! Soy";
    }

    // 4. Cambiamos el texto dinámicamente
    // Aquí puedes mantener tu texto de "Desarrollador Full Stack"
    mensajeBienvenida.textContent = `${saludo} un Desarrollador Full Stack en formación`;
});