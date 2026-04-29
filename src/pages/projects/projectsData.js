// src/pages/Projects/projectsData.js
export const projectsData = [
  {
    id: 1,
    name: "Temperature IoT",
    category: "IoT",
    shortDescription: "Sistema IoT para monitoreo de temperatura y humedad ambiente con visualización en LCD.",
    longDescription: "Este proyecto IoT utiliza sensores de temperatura y humedad para monitorear condiciones ambientales en tiempo real. Los datos se muestran en una pantalla LCD y también se pueden visualizar a través de una interfaz web. Ideal para invernaderos, bodegas y espacios que requieren control climático.",
    technologies: ["Arduino", "Sensor DHT22", "LCD 16x2", "C++", "Node.js", "Socket.io"],
    status: "Completado",
    completionDate: "Noviembre 2025",
    client: "CodeTree",
    challenge: "Lograr lecturas precisas y visualización en tiempo real con bajo consumo energético.",
    solution: "Implementación de sensor DHT22 de alta precisión y optimización del código para reducir el consumo.",
    impact: "Reducción del 30% en pérdidas por condiciones climáticas adversas.",
    images: [
     
    ],
    videos: [
      "/assets/projects/IoT/videos/temperature.mp4"
    ],
   
  },
  {
    id: 2,
    name: "Sound Sensor LED",
    category: "IoT",
    shortDescription: "Sistema que controla intensidad de LED según nivel de sonido ambiente.",
    longDescription: "Este proyecto utiliza un sensor de sonido para detectar niveles de ruido ambiente y controlar la intensidad de un LED de forma proporcional. Cuanto mayor es el sonido, más brillante se ilumina el LED. Perfecto para visualización de niveles de ruido en tiempo real.",
    technologies: ["Arduino", "Sensor de Sonido LM393", "LED RGB", "C++", "MQTT"],
    status: "Completado",
    completionDate: "Octubre 2025",
    client: "CodeTree",
    challenge: "Calibrar el sensor para respuestas precisas en diferentes rangos de sonido.",
    solution: "Implementación de filtros digitales y calibración automática del sensor.",
    impact: "Visualización efectiva de niveles de ruido en espacios de coworking.",
    images: [
      
    ],
    videos: [
      "/assets/projects/IoT/videos/sound-sensor.mp4"
    ],

  },
  {
    id: 3,
    name: "Proximity Sensor LED",
    category: "IoT",
    shortDescription: "Sistema que enciende un LED según la proximidad de un objeto usando sensor ultrasónico.",
    longDescription: "Este proyecto utiliza un sensor ultrasónico para detectar la distancia de objetos y enciende un LED cuando un objeto se acerca a menos de una distancia configurable. Ideal para sistemas de detección de presencia, alarmas de proximidad y automatización de puertas.",
    technologies: ["Arduino", "Sensor Ultrasónico HC-SR04", "LED", "C++", "Buzzer"],
    status: "Completado",
    completionDate: "Noviembre 2025",
    client: "ProxSense Technologies",
    challenge: "Medición precisa de distancia en diferentes condiciones de iluminación y superficies.",
    solution: "Uso de filtros de promedio móvil para estabilizar las lecturas del sensor ultrasónico.",
    impact: "Solución de bajo costo para detección de presencia en espacios reducidos.",
    images: [
      "/assets/projects/IoT/images/proximity-project.jpg"
    ],
    videos: [
      
    ],

  },
  {
    id: 4,
    name: "HatoMaster",
    category: "SaaS",
    shortDescription: "Sistema inteligente de gestión ganadera con soporte offline.",
    longDescription: "HatoMaster es una plataforma SaaS completa para gestión ganadera que funciona incluso sin conexión a internet. Permite llevar control de inventario de animales, producción de leche, salud animal, reproducción y finanzas. Con sincronización automática cuando hay conectividad.",
    technologies: ["Django", "PostgreSQL", "React", "TypeScript", "Vite", "TailwindCSS", "PWA"],
    status: "En Desarrollo",
    completionDate: "Estimate: Diciembre 2026",
    client: "HatoMaster Inc.",
    challenge: "Mantener funcionalidad offline completa con sincronización robusta.",
    solution: "Implementación de PWA con IndexedDB y sistema de colas para sincronización.",
    impact: "Optimización esperada del 40% en gestión ganadera para productores rurales.",
    images: [
      "/assets/projects/hatomaster/inventory.png",
      "/assets/projects/hatomaster/inventory-light.png",
      "/assets/projects/hatomaster/milk.png",
      "/assets/projects/hatomaster/daily-milk.png",
      "/assets/projects/hatomaster/farm.png",
      "/assets/projects/hatomaster/form-treatment.png"
    ],
    videos: [
      
    ],
    demoUrl: "https://www.hatomaster.online/",
  
  },
  {
    id: 5,
    name: "Sign Bridge",
    category: "AI/ML",
    shortDescription: "Traductor bidireccional de lenguaje de señas usando IA y visión por computadora.",
    longDescription: "Sign Bridge es un sistema de inteligencia artificial que permite comunicación bidireccional entre personas oyentes y personas con discapacidad auditiva. Utiliza algoritmos de machine learning y OpenCV para detectar e interpretar lenguaje de señas en tiempo real.",
    technologies: ["Python", "TensorFlow", "OpenCV", "MediaPipe", "Flask", "React"],
    status: "En Desarrollo",
    completionDate: "Estimate: Octubre 2027",
    client: "Inclusify Foundation",
    challenge: "Alta precisión en detección de señas complejas y variaciones individuales.",
    solution: "Entrenamiento con dataset diverso y uso de MediaPipe para landmarks de manos.",
    impact: "Potencial de inclusión para más de 466 millones de personas con pérdida auditiva.",
    images: [
      "/assets/projects/sign_bridge/presentation.jpg",
      "/assets/projects/sign_bridge/img2.jpg",
      "/assets/projects/sign_bridge/img3.jpg"
    ],
    videos: [],
    demoUrl: "https://signbridge.codetree.com",
    repoUrl: "https://github.com/codetree/sign-bridge"
  },
  {
    id: 6,
    name: "Negocio+",
    category: "Desktop",
    shortDescription: "Sistema integral de gestión empresarial para PYMES.",
    longDescription: "Negocio+ es una aplicación de escritorio desarrollada en C# que gestiona inventarios, ventas, proveedores, contabilidad y genera dashboards interactivos. Incluye notificaciones de stock bajo, automatización de reducción de inventario y generación de facturas digitales.",
    technologies: ["C#", ".NET 6", "SQL Server", "Entity Framework", "WinForms", "DevExpress"],
    status: "Completado",
    completionDate: "Marzo 2024",
    client: "PYME Solutions",
    challenge: "Rendimiento óptimo con grandes volúmenes de datos.",
    solution: "Optimización de consultas SQL y uso de caché en memoria.",
    impact: "Reducción del 50% en tiempo de gestión administrativa.",
    images: [
      "/assets/projects/negocio+/stock_validation.jpg",
      "/assets/projects/negocio+/graph.jpg",
      "/assets/projects/negocio+/sells.jpg"
    ],
    videos: [
      
    ],
    
  },
  {
    id: 7,
    name: "Number Counter IoT",
    category: "IoT",
    shortDescription: "Contador numérico del 1 al 9 con reinicio automático y visualización en display.",
    longDescription: "Este dispositivo IoT cuenta automáticamente del 1 al 9 y se reinicia, ideal para conteo de productos, personas o cualquier aplicación que requiera conteo cíclico. Incluye display digital y control por botón para reinicio manual.",
    technologies: ["Arduino", "Display 7 Segmentos", "Botones", "C++", "MQTT"],
    status: "Completado",
    completionDate: "Octubre 2025",
    client: "CountMaster Systems",
    challenge: "Precisión en el conteo y sincronización del reinicio.",
    solution: "Implementación de temporizadores precisos y debounce en botones.",
    impact: "Automatización del proceso de conteo en líneas de producción.",
    images: [
      "/assets/projects/IoT/images/counter.jpg"
    ],
    videos: [],
   
  }
];

export const categories = [
  { id: "all", name: "Todos", icon: "📱" },
  { id: "IoT", name: "IoT", icon: "🌡️" },
  { id: "SaaS", name: "SaaS", icon: "☁️" },
  { id: "AI/ML", name: "AI/ML", icon: "🧠" },
  { id: "Desktop", name: "Desktop", icon: "💻" }
];