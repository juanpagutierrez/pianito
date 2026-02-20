# Piano Tiles 🎹

Un juego interactivo de piano basado en canvas donde debes eliminar bloques presionando las teclas correctas a tiempo.

**Materia:** Arquitecturas de Software | **Tipo:** Proyecto en Equipo

---

## 👥 Equipo

| Rol | Integrante |
|-----|-----------|
| **Líder del Proyecto** | Vittorio Catino |
| Responsable de Lógica | José Ignacio |
| Responsable de Presentación | David Valdéz |
| Responsable de Estados y Eventos | Pablo Portillo |
| Responsable de Control de Versiones | JP Gutierrez |

---

## 🏗️ Arquitectura en Capas

El proyecto se organizó en **tres capas principales** siguiendo una arquitectura en capas clara:

### Capa de Presentación 🎨
Responsable de toda la experiencia visual del usuario:
- Dibujar el tablero y las columnas
- Mostrar las tiles en movimiento
- Visualizar la puntuación en tiempo real
- Manejar botones y estados del juego (inicio, pausa, game over)
- Reproducir música y efectos de audio

**Archivo:** `presentacion.js`

### Capa de Lógica 🧠
Implementa todas las reglas y mecánicas del juego:
- Generar bloques aleatorios
- Mover tiles y actualizar posiciones
- Detectar teclas presionadas del jugador
- Validar colisiones e interacciones
- Controlar la puntuación
- Administrar el ciclo principal del juego (game loop)

**Archivo:** `logica.js`

### Capa de Datos 💾
Almacena toda la información y estado del juego:
- Estado actual del juego (activo, pausado, game over)
- Puntaje acumulado
- Tiles activas y sus posiciones
- Estado del teclado
- Variables de control (intervalos, timestamps)

**Archivo:** `datos.js`

---

## 🌐 Topología Elegida: Cliente

El proyecto se desarrolló como una **aplicación web cliente** que se ejecuta completamente en el navegador:

✓ No requiere servidor  
✓ Interacción en tiempo real  
✓ Renderizado en tiempo real con Canvas  
✓ Control local del teclado  
✓ Música sincronizada en el navegador

---

## 📋 Instrucciones de Ejecución

1. Abre el archivo `index.html` en tu navegador web
2. Haz clic en el botón **START** para comenzar el juego
3. La música comenzará a reproducirse automáticamente
4. Presiona **START** nuevamente para pausar, o espera a que el juego termine

---

## 🛠️ Tecnologías Usadas

- **HTML5** - Estructura y elementos canvas
- **CSS3** - Estilos, gradientes y animaciones
- **JavaScript Vanilla** - Lógica interactiva del juego
- **Canvas API** - Renderizado de gráficos
- **Web Audio API** - Reproducción de música
- **RequestAnimationFrame** - Animaciones fluidas y optimizadas

---

## 📁 Estructura de Archivos

```
pianito/
├── index.html          # Página principal (canvas y estructura HTML)
├── datos.js            # Variables de estado (puntuación, bloques, estado)
├── presentacion.js     # Elementos visuales y eventos (DOM, canvas, dibujo)
├── logica.js           # Reglas del juego (generación, colisiones)
├── main.js             # Archivo original (puedes eliminarlo)
├── MUSIC.mp3           # Archivo de música del juego
└── README.md           # Este archivo
```

### Arquitectura por Capas

- **Capa de Datos** (`datos.js`) - Estado del juego
- **Capa de Presentación** (`presentacion.js`) - Interfaz visual y eventos
- **Capa de Lógica** (`logica.js`) - Reglas y mecánicas del juego

---

## 🎮 Cómo Jugar

### Objetivo
Presiona las teclas correctas para eliminar los bloques negros antes de que lleguen al fondo de la pantalla.

### Controles

| Tecla | Acción |
|-------|--------|
| **A** | Elimina bloques en la columna izquierda |
| **S** | Elimina bloques en la segunda columna |
| **D** | Elimina bloques en la tercera columna |
| **F** | Elimina bloques en la columna derecha |

### Mecánica de Juego

- **Zona de Acción**: Debes presionar la tecla cuando el bloque esté entre las líneas blancas (aproximadamente en la mitad inferior de la pantalla)
- **Puntuación**: Ganas un punto por cada bloque eliminado correctamente
- **Game Over**: Si un bloque llega completamente al fondo sin ser eliminado, el juego termina (muestra "GG")

---

## 🎨 Características

- ✨ Gráficos con gradientes y canvas
- 🔊 Música de fondo sincronizada
- 📊 Sistema de puntuación en tiempo real
- ⚡ Movimiento fluido con delta time
- 🎯 Detección de colisiones precisa

---

## � Integración entre Capas

Las capas se comunican de manera clara y desacoplada:

```
presentacion.js (Interfaz)
      ↓
Eventos del usuario (teclas, clicks)
      ↓
logica.js (Reglas del Juego)
      ↓
Lee/Modifica el estado
      ↓
datos.js (Estado Global)
      ↓
presentacion.js renderiza cambios
```

This separation ensures:
- **Bajo acoplamiento:** Cada capa es independiente
- **Alta cohesión:** Responsabilidades claras en cada capa
- **Fácil mantenimiento:** Cambios aislados por capa
- **Trabajo en equipo:** Cada miembro trabaja en su capa

---

## 📚 Documentación de Clases y Funciones

### Clase Block (logica.js)
Constructor que crea un nuevo bloque con posición aleatoria:
```javascript
new Block(index)
// Genera un bloque en una de las 4 columnas
// con posición inicial fuera de pantalla (-120px)
```

### geneBlock() (logica.js)
Genera nuevos bloques a intervalos regulares (600ms)

### gameLoop() (logica.js)
Función principal que:
- Actualiza posiciones de tiles
- Dibuja en canvas
- Detecta colisiones con teclas
- Verifica condición de game over

### paintWindow() (presentacion.js)
Dibuja el tablero con gradientes y líneas divisoras

### paintScoreBar() (presentacion.js)
Renderiza el área de puntuación con gradiente

---

## ✨ Características Técnicas

- ⚡ **RequestAnimationFrame** para animaciones fluidas
- 🎯 **Delta Time** para movimiento independiente de framerates
- 🎨 **Canvas API** para gráficos de alto rendimiento
- 🔊 **Web Audio API** para sincronización de música
- 📊 **Sistema de estados** para control del juego

---

## 🎓 Cumplimiento de Requisitos de Arquitectura

✅ **Arquitectura en capas** - Tres capas bien definidas y separadas  
✅ **Topología Cliente** - Aplicación web ejecutada en navegador  
✅ **Liderazgo claro** - Vittorio Catino como líder del proyecto  
✅ **División de responsabilidades** - Cada miembro asignado a una capa  
✅ **Integración entre capas** - Comunicación clara y desacoplada  
✅ **Documentación** - README completo con instrucciones  
✅ **Control de versiones** - Uso de Git con estructura de capas  

---

## 👨‍💻 Equipo de Desarrollo

Proyecto de arquitectura de software - Juego Piano Tiles  
**Líder:** Vittorio Catino

