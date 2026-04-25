// src/components/sections/Pricing/chatMessages.js
import { 
  FaTractor, FaBuilding, FaIndustry, FaGraduationCap, FaUsers, FaStore,
  FaWhatsapp, FaEnvelope, FaCalendarAlt, FaPhone
} from 'react-icons/fa';

export const chatMessages = {
  // Initial greeting
  welcome: {
    id: 'welcome',
    botMessage: "¡Hola! 👋 Soy CotizAI, tu asistente de cotización de CodeTree. ¿Listo para obtener una cotización personalizada?",
    options: [
      { id: 'start', text: "✅ Sí, quiero una cotización", action: "startQuote" },
      { id: 'explore', text: "🔍 Solo estoy explorando", action: "showPlans" },
      { id: 'advisor', text: "📞 Hablar con un asesor", action: "contactAdvisor" }
    ]
  },

  // Ask for name
  askName: {
    id: 'askName',
    botMessage: "¡Excelente! 🎉 ¿Cómo te llamas?",
    inputType: "text",
    placeholder: "Escribe tu nombre",
    saveAs: "name",
    nextAction: "askBusinessType"
  },

  // Ask for business type
  askBusinessType: {
    id: 'askBusinessType',
    botMessage: (name) => `Mucho gusto, ${name}! 👋 ¿Qué tipo de negocio tienes?`,
    options: [
      { id: 'farm', text: "🌾 Ganadería / Agricultura", value: "farm", icon: FaTractor, nextAction: "askCowCount" },
      { id: 'tech', text: "🏢 Tecnología / Software", value: "tech", icon: FaBuilding, nextAction: "askEmployees" },
      { id: 'manufacturing', text: "🏭 Manufactura / Industrial", value: "manufacturing", icon: FaIndustry, nextAction: "askEmployees" },
      { id: 'education', text: "📚 Educación / Capacitación", value: "education", icon: FaGraduationCap, nextAction: "askEmployees" },
      { id: 'consulting', text: "💼 Consultoría / Servicios", value: "consulting", icon: FaUsers, nextAction: "askEmployees" },
      { id: 'retail', text: "🛒 Comercio / Retail", value: "retail", icon: FaStore, nextAction: "askEmployees" }
    ],
    saveAs: "businessType"
  },

  // Ask for cow count (for farm)
  askCowCount: {
    id: 'askCowCount',
    botMessage: "🐄 ¿Cuántos animales tiene actualmente en su operación?",
    options: [
      { id: 'cows1', text: "🐄 0-100 animales", value: "0-100", cowCount: 50, nextAction: "askBudget" },
      { id: 'cows2', text: "🐄🐄 100-400 animales", value: "100-400", cowCount: 250, nextAction: "askBudget" },
      { id: 'cows3', text: "🐄🐄🐄 400-1000 animales", value: "400-1000", cowCount: 700, nextAction: "askBudget" },
      { id: 'cows4', text: "🏭 Más de 1000 animales", value: "1000+", cowCount: 1500, nextAction: "askBudget" }
    ],
    saveAs: "cowCount"
  },

  // Ask for employee count (for non-farm)
  askEmployees: {
    id: 'askEmployees',
    botMessage: "👥 ¿Cuántos empleados tiene en su empresa?",
    options: [
      { id: 'emp1', text: "👤 1-10 empleados", value: "1-10", employeeCount: 5, nextAction: "askBudget" },
      { id: 'emp2', text: "👥 10-50 empleados", value: "10-50", employeeCount: 30, nextAction: "askBudget" },
      { id: 'emp3', text: "👥👥 50-200 empleados", value: "50-200", employeeCount: 125, nextAction: "askBudget" },
      { id: 'emp4', text: "🌍 Más de 200 empleados", value: "200+", employeeCount: 500, nextAction: "askBudget" }
    ],
    saveAs: "employeeCount"
  },

  // Ask for budget
  askBudget: {
    id: 'askBudget',
    botMessage: "💰 ¿Cuál es tu presupuesto estimado para este proyecto?",
    options: [
      { id: 'budget1', text: "💵 $0 - $500", value: "0-500", budget: 250, nextAction: "askUrgency" },
      { id: 'budget2', text: "💰 $500 - $2,000", value: "500-2000", budget: 1250, nextAction: "askUrgency" },
      { id: 'budget3', text: "💎 $2,000 - $5,000", value: "2000-5000", budget: 3500, nextAction: "askUrgency" },
      { id: 'budget4', text: "🏆 $5,000 - $10,000", value: "5000-10000", budget: 7500, nextAction: "askUrgency" },
      { id: 'budget5', text: "👑 Más de $10,000", value: "10000+", budget: 15000, nextAction: "askUrgency" }
    ],
    saveAs: "budget"
  },

  // Ask for urgency
  askUrgency: {
    id: 'askUrgency',
    botMessage: "⏰ ¿Cuál es tu plazo ideal para implementar la solución?",
    options: [
      { id: 'urgent1', text: "🚀 Inmediato (menos de 1 semana)", value: "immediate", urgency: "inmediata", multiplier: 1.3, nextAction: "askContactMethod" },
      { id: 'urgent2', text: "⏰ Pronto (1-4 semanas)", value: "soon", urgency: "pronto", multiplier: 1.1, nextAction: "askContactMethod" },
      { id: 'urgent3', text: "📅 Planificado (1-3 meses)", value: "planned", urgency: "planificada", multiplier: 1.0, nextAction: "askContactMethod" },
      { id: 'urgent4', text: "🔍 Explorando opciones", value: "exploring", urgency: "exploración", multiplier: 0.9, nextAction: "askContactMethod" }
    ],
    saveAs: "urgency"
  },

  // Ask for contact method
  askContactMethod: {
    id: 'askContactMethod',
    botMessage: "📱 ¿Cómo prefieres recibir tu cotización personalizada?",
    options: [
      { id: 'email', text: "📧 Correo electrónico", value: "email", icon: FaEnvelope, nextAction: "askEmail" },
      { id: 'whatsapp', text: "💬 WhatsApp", value: "whatsapp", icon: FaWhatsapp, nextAction: "askWhatsApp" },
      { id: 'phone', text: "📞 Llamada telefónica", value: "phone", icon: FaPhone, nextAction: "askPhone" },
      { id: 'meeting', text: "📅 Agenda de reunión", value: "meeting", icon: FaCalendarAlt, nextAction: "askEmail" }
    ]
  },

  // Ask for email
  askEmail: {
    id: 'askEmail',
    botMessage: "📧 Por favor, ingresa tu correo electrónico:",
    inputType: "email",
    placeholder: "tu@email.com",
    saveAs: "email",
    nextAction: "generateQuote"
  },

  // Ask for WhatsApp
  askWhatsApp: {
    id: 'askWhatsApp',
    botMessage: "💬 Por favor, ingresa tu número de WhatsApp (con código de país):",
    inputType: "tel",
    placeholder: "+505 1234 5678",
    saveAs: "phone",
    nextAction: "generateQuote"
  },

  // Ask for phone
  askPhone: {
    id: 'askPhone',
    botMessage: "📞 Por favor, ingresa tu número de teléfono:",
    inputType: "tel",
    placeholder: "+505 1234 5678",
    saveAs: "phone",
    nextAction: "generateQuote"
  },

  // Show plans message
  showPlans: {
    id: 'showPlans',
    botMessage: `📋 **Nuestros Planes Disponibles**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**🌾 Para Ganadería:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• **Básico:** $8/mes
  └ Hasta 100 animales, 2 granjas, 2 empleados

• **Estándar:** $18/mes
  └ 100-400 animales, 5 granjas, 12 empleados

• **Premium:** $35/mes
  └ 400-1000 animales, límites ilimitados

• **Enterprise:** $0.01/animal/mes
  └ Más de 1000 animales, totalmente personalizable

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**🏢 Para otros negocios:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• **Negocio+:** $150 (licencia única)
  └ Instalación única, soporte 3 días

• **Enterprise:** Cotización personalizada
  └ Solución a tu medida

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

¿Te gustaría cotizar alguno de estos planes?`,
    options: [
      { id: 'quoteFarm', text: "🌾 Cotizar plan Ganadería", action: "startQuote" },
      { id: 'quoteBusiness', text: "🏢 Cotizar plan Negocio+", action: "startQuote" },
      { id: 'advisor', text: "📞 Hablar con un asesor", action: "contactAdvisor" },
      { id: 'restart', text: "🏠 Volver al inicio", action: "restart" }
    ]
  },

  // Contact advisor
  contactAdvisor: {
    id: 'contactAdvisor',
    botMessage: "📞 ¡Por supuesto! Un asesor se comunicará contigo en las próximas 24 horas. ¿Cómo prefieres que te contactemos?",
    options: [
      { id: 'advisorEmail', text: "📧 Por correo electrónico", value: "email", nextAction: "askEmailAdvisor" },
      { id: 'advisorWhatsapp', text: "💬 Por WhatsApp", value: "whatsapp", nextAction: "askWhatsAppAdvisor" },
      { id: 'advisorPhone', text: "📞 Por teléfono", value: "phone", nextAction: "askPhoneAdvisor" },
      { id: 'restart', text: "🏠 Volver al inicio", action: "restart" }
    ]
  },

  // Ask email for advisor
  askEmailAdvisor: {
    id: 'askEmailAdvisor',
    botMessage: "📧 Por favor, ingresa tu correo electrónico para contactarte:",
    inputType: "email",
    placeholder: "tu@email.com",
    saveAs: "email",
    nextAction: "advisorConfirmed"
  },

  // Ask WhatsApp for advisor
  askWhatsAppAdvisor: {
    id: 'askWhatsAppAdvisor',
    botMessage: "💬 Por favor, ingresa tu número de WhatsApp:",
    inputType: "tel",
    placeholder: "+505 1234 5678",
    saveAs: "phone",
    nextAction: "advisorConfirmed"
  },

  // Ask phone for advisor
  askPhoneAdvisor: {
    id: 'askPhoneAdvisor',
    botMessage: "📞 Por favor, ingresa tu número de teléfono:",
    inputType: "tel",
    placeholder: "+505 1234 5678",
    saveAs: "phone",
    nextAction: "advisorConfirmed"
  },

  // Advisor confirmed
  advisorConfirmed: {
    id: 'advisorConfirmed',
    botMessage: "✅ ¡Gracias! Un asesor se comunicará contigo en las próximas 24 horas. ¿Necesitas algo más?",
    options: [
      { id: 'showPlansAgain', text: "📋 Ver planes disponibles", action: "showPlans" },
      { id: 'restart', text: "🔄 Nueva cotización", action: "restart" }
    ]
  },

  // Quote generated
  quoteGenerated: {
    id: 'quoteGenerated',
    botMessage: (quote, answers) => `
✅ **¡Cotización Generada con Éxito!**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 **Cliente:** ${answers.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏷️ **Plan Recomendado:** ${quote.planName}
📦 **Tipo:** ${quote.planType}
💰 **Precio:** $${quote.totalPrice} ${quote.period ? `/${quote.period}` : ''}

📊 **Características incluidas:**
${quote.features.map(f => `✓ ${f}`).join('\n')}

✨ **Todos los módulos incluidos:**
✓ Gestión de inventario
✓ Control de producción
✓ Reportes y analytics
✓ API de integración
✓ Soporte técnico 24/7
✓ Actualizaciones automáticas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

¿Qué te gustaría hacer con esta cotización?`,
    options: [
      { id: 'download', text: "📥 Descargar Cotización", action: "download" },
      { id: 'whatsapp', text: "💬 Contactar por WhatsApp", action: "whatsapp" },
      { id: 'email', text: "📧 Recibir por Email", action: "email" },
      { id: 'restart', text: "🔄 Nueva Cotización", action: "restart" }
    ]
  },

  // After download
  afterDownload: {
    id: 'afterDownload',
    botMessage: "✅ Cotización descargada. ¿Necesitas ayuda con algo más?",
    options: [
      { id: 'restart', text: "🔄 Nueva Cotización", action: "restart" },
      { id: 'advisor', text: "💬 Contactar con asesor", action: "contactAdvisor" }
    ]
  },

  // After WhatsApp
  afterWhatsApp: {
    id: 'afterWhatsApp',
    botMessage: "💬 ¿Listo para continuar por WhatsApp?",
    options: [
      { id: 'restart', text: "🔄 Nueva Cotización", action: "restart" }
    ]
  }
};