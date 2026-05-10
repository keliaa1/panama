import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LegalPage from './components/LegalPage';
import panamaLogo from './assets/panamalogo.png';

const translations = {
  EN: {
    nav: {
      home: "Home",
      about: "About",
      why: "Why Choose Us",
      pricing: "Pricing",
      testimonials: "Testimonials",
      contact: "Contact"
    },
    hero: {
      badge: "Trusted by 2,700+ founders",
      title: "Global business, borderless freedom",
      subtitle: "Incorporate your offshore corporation in Panama with ease. Benefit from world-class asset protection and financial privacy.",
      cta: "Start Your Incorporation",
      noFees: "No hidden fees"
    },
    about: {
      badge: "Our Foundation",
      title: "Building your legacy on solid foundations",
      features: [
        { title: "Maximum Privacy", desc: "Panama's strict privacy laws ensure your corporate structure remains confidential." },
        { title: "Tax Optimization", desc: "Legally minimize your global tax footprint using Panama's territorial tax system." },
        { title: "Swift Formation", desc: "Our expert legal team handles the entire process, getting you ready in record time." }
      ]
    },
    why: {
      title: "See how easy it is to start in Panama",
      steps: [
        { title: "Click and Consult", desc: "Choose your package. Our system gathers details to start instantly." },
        { title: "Expert Review", desc: "Our legal experts review your application for optimization." },
        { title: "Full Oversight", desc: "Track progress in real-time through our digital dashboard." },
        { title: "Ready for Business", desc: "Registry clears, digital kit delivered. You are ready to go." }
      ]
    },
    pricing: {
      titleLine1: "Plans &",
      titleLine2: "Pricing",
      standard: {
        badge: "STANDARD",
        tag: "Fast Track",
        sub: "Reliable Setup. First time founders.",
        price: "$2.299",
        period: "/STARTING",
        renewal: "$999 from the second year onwards",
        features: ['Company incorporation', 'Certificate of existence', 'Shares certificate', 'Registered agent', 'Local address'],
        cta: "Reserve Setup",
        testimonial: "Fastest setup ever."
      },
      executive: {
        badge: "EXECUTIVE",
        tag: "Most Popular",
        sub: "Full Asset Protection. Global Enterprises.",
        price: "$2.899",
        period: "/STARTING",
        renewal: "$1.399 from the second year onwards",
        features: ['Everything in Standard', '+ Annual accounting obligations', '+ Annual franchise tax'],
        cta: "View Plan",
        testimonial: "Unmatched privacy."
      },
      elite: {
        badge: "CORPORATE",
        tag: "Full Concierge",
        sub: "Ultimate Asset Shield. Private Wealth.",
        price: "$3.599",
        period: "/STARTING",
        renewal: "$1.399 from the second year onwards",
        features: ['Everything in Executive', '+ Local corporate bank account', '+ Official english translation and apostille of all documents.'],
        cta: "View Plan",
        testimonial: "The ultimate solution."
      }
    },
    testimonials: {
      badge: "Testimonials",
      title: "Hear what our customers say",
      subtitle: "Join thousands of satisfied international clients who have successfully secured their assets with Panama Company.",
      rated: "Rated 4.9/5 Excellent",
      items: [
        { name: "Carlos M.", role: "Tech Founder", text: "Seamless and truly private incorporation. Best decision for my assets.", img: "/latin1.jpg" },
        { name: "Lucía R.", role: "Asset Manager", text: "The privacy level is unmatched. Professional and responsive legal team.", img: "/latin2.jpg" },
        { name: "Andrés G.", role: "Global Investor", text: "Speed and compliance are their top priorities. Highly recommended.", img: "/latin4.jpg" },
        { name: "Sofía V.", role: "Digital Nomad", text: "Setting up my offshore base was incredibly efficient. The support team is world-class.", img: "/latin3.jpg" },
        { name: "Diego S.", role: "Venture Capitalist", text: "The ultimate solution for asset protection. Their expertise in Panama law is evident.", img: "/latin5.jpg" },
      ]
    },
    contact: {
      title: "Contact Us",
      subtitle: "Have any question? Fill out the form and we'll love to hear, we'll in touch shortly",
      where: "Where to find us",
      city: "Panama City",
      hq: "Headquarters",
      address: "Tower Financial Center | Panama City",
      form: {
        firstName: "First Name",
        lastName: "Last Name",
        phone: "Phone Number",
        email: "Email Address",
        message: "How can we help you?",
        cta: "Send Message"
      }
    },
    footer: {
      desc: "We are strategic partners providing the most secure path to offshore incorporation and asset protection.",
      cols: {
        pages: { title: "Pages", items: ['Home', 'About', 'Why Choose Us', 'Pricing', 'Testimonials', 'Contact'] },
        legal: { title: "Legal", items: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer', 'Payment Methods'] }
      },
      copy: "© 2024 PANAMA COMPANY S.A. ALL RIGHTS RESERVED."
    }
  },
  ES: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      why: "¿Por qué elegirnos?",
      pricing: "Precios",
      testimonials: "Testimonios",
      contact: "Contacto"
    },
    hero: {
      badge: "Confiado por más de 2,700 fundadores",
      title: "Negocios globales, libertad sin fronteras",
      subtitle: "Incorpore su corporación offshore en Panamá con facilidad. Benefíciese de la protección de activos y privacidad financiera de clase mundial.",
      cta: "Inicie su Incorporación",
      noFees: "Sin cargos ocultos"
    },
    about: {
      badge: "Nuestra Fundación",
      title: "Construyendo su legado sobre bases sólidas",
      features: [
        { title: "Privacidad Máxima", desc: "Las estrictas leyes de privacidad de Panamá garantizan que su estructura corporativa permanezca confidencial." },
        { title: "Optimización Fiscal", desc: "Minimice legalmente su huella fiscal global utilizando el sistema tributario territorial de Panamá." },
        { title: "Formación Rápida", desc: "Nuestro equipo legal experto maneja todo el proceso, preparándolo en tiempo récord sin burocracia." }
      ]
    },
    why: {
      title: "Vea lo fácil que es empezar en Panamá",
      steps: [
        { title: "Clic y Consulta", desc: "Elija su paquete. Nuestro sistema recopila detalles para comenzar al instante." },
        { title: "Revisión Experta", desc: "Nuestros expertos legales revisan su solicitud para optimizarla." },
        { title: "Supervisión Total", desc: "Siga el progreso en tiempo real a través de nuestro panel digital." },
        { title: "Listos para Negocios", desc: "El registro se completa, se entrega el kit digital. Está listo para comenzar." }
      ]
    },
    pricing: {
      titleLine1: "Planes y",
      titleLine2: "Precios",
      standard: {
        badge: "ESTÁNDAR",
        tag: "Vía Rápida",
        sub: "Configuración confiable. Para nuevos fundadores.",
        price: "$2.299",
        period: "/INICIAL",
        renewal: "$999 a partir del segundo año en adelante",
        features: ['Incorporación de empresa', 'Certificado de vigencia', 'Certificado de acciones', 'Agente residente', 'Dirección local'],
        cta: "Reservar Configuración",
        testimonial: "La configuración más rápida."
      },
      executive: {
        badge: "EJECUTIVO",
        tag: "Más Popular",
        sub: "Protección total de activos. Empresas Globales.",
        price: "$2.899",
        period: "/INICIAL",
        renewal: "$1.399 a partir del segundo año en adelante",
        features: ['Todo en el Estándar', '+ Obligaciones contables anuales', '+ Tasa única anual'],
        cta: "Ver Plan",
        testimonial: "Privacidad inigualable."
      },
      elite: {
        badge: "CORPORATIVO",
        tag: "Conserje Total",
        sub: "Escudo Máximo. Riqueza Privada.",
        price: "$3.599",
        period: "/INICIAL",
        renewal: "$1.399 a partir del segundo año en adelante",
        features: ['Todo en Ejecutivo', '+ Cuenta bancaria corporativa local', '+ Traducción oficial al inglés y apostilla de todos los documentos.'],
        cta: "Ver Plan",
        testimonial: "La solución definitiva."
      }
    },
    testimonials: {
      badge: "Testimonios",
      title: "Lo que dicen nuestros clientes",
      subtitle: "Únase a miles de clientes internacionales satisfechos que han asegurado con éxito sus activos con Panama Company.",
      rated: "Calificado 4.9/5 Excelente",
      items: [
        { name: "Carlos M.", role: "Fundador Tecnológico", text: "Incorporación fluida y verdaderamente privada. La mejor decisión para mis activos.", img: "/latin1.jpg" },
        { name: "Lucía R.", role: "Gestora de Activos", text: "El nivel de privacidad es inigualable. Equipo legal profesional y receptivo.", img: "/latin2.jpg" },
        { name: "Andrés G.", role: "Inversor Global", text: "La velocidad y el cumplimiento son sus prioridades. Muy recomendado.", img: "/latin4.jpg" },
        { name: "Sofía V.", role: "Nómada Digital", text: "Establecer mi base offshore fue increíblemente eficiente. El equipo de soporte es de clase mundial.", img: "/latin3.jpg" },
        { name: "Diego S.", role: "Capitalista de Riesgo", text: "La solución definitiva para la protección de activos. Su experiencia en leyes panameñas es evidente.", img: "/latin5.jpg" },
      ]
    },
    contact: {
      title: "Contáctenos",
      subtitle: "¿Tiene alguna pregunta? Complete el formulario y nos encantará escucharlo, nos pondremos en contacto pronto",
      where: "Dónde encontrarnos",
      city: "Ciudad de Panamá",
      hq: "Sede Principal",
      address: "Tower Financial Center | Panama City",
      form: {
        firstName: "Nombre",
        lastName: "Apellido",
        phone: "Número de Teléfono",
        email: "Correo Electrónico",
        message: "¿Cómo podemos ayudarle?",
        cta: "Enviar Mensaje"
      }
    },
    footer: {
      desc: "Somos socios estratégicos que brindan el camino más seguro hacia la incorporación offshore y la protección de activos.",
      cols: {
        pages: { title: "Páginas", items: ['Inicio', 'Nosotros', '¿Por qué elegirnos?', 'Precios', 'Testimonios', 'Contacto'] },
        legal: { title: "Legal", items: ['Política de Privacidad', 'Términos de Servicio', 'Política de Cookies', 'Descargo de Responsabilidad', 'Métodos de Pago'] }
      },
      copy: "© 2024 PANAMA COMPANY S.A. TODOS LOS DERECHOS RESERVADOS."
    }
  }
};

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [currentRoute, setCurrentRoute] = useState('/');
  const t = translations[selectedLang];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-2 border-blue-50 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={panamaLogo} alt="Loading..." className="w-10 h-10 object-contain animate-pulse" />
          </div>
        </div>
        <p className="mt-8 font-['Fustat'] font-bold text-gray-900 animate-pulse tracking-[0.3em] text-[10px] uppercase">Panama Company</p>
      </div>
    );
  }

  if (currentRoute.startsWith('/legal/')) {
    const slug = currentRoute.replace('/legal/', '');
    return <LegalPage selectedLang={selectedLang} slug={slug} onNavigate={setCurrentRoute} />;
  }

  return (
    <LandingPage 
      selectedLang={selectedLang} 
      setSelectedLang={setSelectedLang} 
      t={t} 
      onNavigate={setCurrentRoute} 
    />
  );
}

export default App;
