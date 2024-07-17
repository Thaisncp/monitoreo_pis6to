export const getBotResponse = (input) => {
    const lowercaseInput = input.toLowerCase();

    if (lowercaseInput.includes('temperatura') && lowercaseInput.includes('aula magna')) {
        return 'La temperatura actual en el Aula Magna es de 23°C, lo cual está dentro del rango óptimo.';
    } else if (lowercaseInput.includes('humedad') && lowercaseInput.includes('aula magna')) {
        return 'La humedad actual en el Aula Magna es del 45%, lo cual es considerado un nivel confortable.';
    } else if (lowercaseInput.includes('co2') && lowercaseInput.includes('aula magna')) {
        return 'El nivel de CO2 actual en el Aula Magna es de 600 ppm, lo cual está dentro de los límites seguros.';
    } else if (lowercaseInput.includes('seguro') && lowercaseInput.includes('respirar') && lowercaseInput.includes('aula magna')) {
        return 'Sí, es seguro respirar el aire en el Aula Magna. Todos los indicadores (temperatura, humedad y CO2) están dentro de los rangos óptimos.';
    } else if (lowercaseInput.includes('calidad del aire') && lowercaseInput.includes('aula magna')) {
        return 'La calidad del aire en el Aula Magna es excelente. Todos los parámetros están en niveles óptimos para un ambiente saludable y confortable.';
    } else if (lowercaseInput.includes('ventilación') && lowercaseInput.includes('aula magna')) {
        return 'El sistema de ventilación del Aula Magna funciona correctamente, manteniendo un flujo de aire fresco y niveles de CO2 bajos.';
    } else if (lowercaseInput.includes('mejora') && lowercaseInput.includes('aire') && lowercaseInput.includes('aula magna')) {
        return 'Aunque la calidad del aire en el Aula Magna es buena, siempre se puede mejorar. Algunas sugerencias incluyen: aumentar la ventilación natural, usar purificadores de aire, y realizar mantenimiento regular del sistema de climatización.';
    } else if (lowercaseInput.includes('efecto') && lowercaseInput.includes('estudiantes') && lowercaseInput.includes('aula magna')) {
        return 'La buena calidad del aire en el Aula Magna tiene un efecto positivo en los estudiantes. Mejora la concentración, reduce la fatiga y contribuye a un ambiente de aprendizaje más saludable.';
    } else if (lowercaseInput.includes('comparación') && lowercaseInput.includes('otras aulas')) {
        return 'En comparación con otras aulas, el Aula Magna mantiene una calidad de aire superior debido a su sistema de ventilación avanzado y monitoreo constante de los parámetros ambientales.';
    } else if (lowercaseInput.includes('recomendaciones') && lowercaseInput.includes('mejorar') && lowercaseInput.includes('aire')) {
        return 'Para mejorar aún más la calidad del aire, se recomienda: abrir las ventanas regularmente, evitar el uso de productos químicos fuertes, y mantener las plantas de interior que ayudan a purificar el aire.';
    } else {
        return 'Lo siento, no tengo información específica sobre eso. ¿Puedo ayudarte con algo relacionado con la temperatura, humedad o niveles de CO2 en el Aula Magna?';
    }
}