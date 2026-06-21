// ─────────────────────────────────────────────────────────────────────────────
// src/lib/es-dict.ts
// English → Spanish dictionary for the site-wide Spanish layer (es-translate).
// Keys are the EXACT trimmed English text as it appears on the page. Anything
// not listed falls back to English. Most component copy is already translated
// inline via t(lang, en, es); this dictionary fills the English that wasn't
// wrapped (data-driven content, sub-components, footer, alts, etc.).
// Proper nouns (brands, insurers, place names, "Invisalign", "CareCredit") are
// intentionally left untranslated.
// ─────────────────────────────────────────────────────────────────────────────
export const ES: Record<string, string> = {
  // — generic UI / CTAs —
  'Learn more': 'Más información',
  'Read more': 'Leer más',
  'Read bio': 'Ver biografía',
  'Start here': 'Empieza aquí',
  'Scroll': 'Desplázate',
  'Open in Maps': 'Abrir en Mapas',
  'Open menu': 'Abrir menú',
  'Close menu': 'Cerrar menú',
  'Dismiss announcement': 'Cerrar anuncio',
  'Book Appointment': 'Reservar Cita',
  'Whole Family': 'Toda la Familia',
  'and': 'y',
  'out to': 'hasta',
  ', and': ', y',

  // — audience routing / steps —
  'Or book online at any location page': 'O reserva en línea en cualquier página de clínica',
  'expect when you choose Boca Dental & Braces.': 'esperar al elegir Boca Dental and Braces.',

  // — Why Boca stat labels —
  'Why Boca': 'Por Qué Boca',
  'Reno clinics': 'Clínicas en Reno',
  'Days per week': 'Días por semana',
  'PPO plans accepted': 'Planes PPO aceptados',
  'CareCredit financing': 'Financiamiento CareCredit',
  'Licensed dentists': 'Dentistas con licencia',
  'Languages spoken': 'Idiomas hablados',

  // — Services —
  'Dental Care': 'Atención Dental',

  // — Boca Kids badges —
  'Age 1+': 'Edad 1+',
  'First Visit': 'Primera visita',
  'Accepted': 'Aceptado',
  'Fear-free zone': 'Zona sin miedo',
  'Sparks · Google review': 'Sparks · Reseña de Google',

  // — Coverage / map narrative (rich-text fragments) —
  'operates 3 dental clinics across the Reno–Sparks area — from':
    'opera 3 clínicas dentales en el área de Reno–Sparks — desde',
  'Every location offers general and preventive dental care, with specialist services including':
    'Cada clínica ofrece atención dental general y preventiva, con servicios de especialidad que incluyen',
  '. Every location offers general and preventive dental care, with specialist services including':
    '. Cada clínica ofrece atención dental general y preventiva, con servicios de especialidad que incluyen',
  'Call (775) 555-0100': 'Llama al (775) 555-0100',
  'Call (775) 237-2491': 'Llama al (775) 237-2491',
  'available at select clinics.': 'disponibles en clínicas seleccionadas.',
  'orthodontics': 'ortodoncia',
  'oral surgery': 'cirugía oral',
  'pediatric dentistry': 'odontología pediátrica',
  'sedation dentistry': 'odontología de sedación',
  '3 Boca offices · Reno area': '3 clínicas Boca · área de Reno',

  // — Team —
  'Restorative & Surgical Dentist': 'Dentista Restaurador y Cirujano',
  'Restorative & Implant Dentist': 'Dentista Restaurador y de Implantes',
  'Implants · crowns · full-mouth rehabilitation': 'Implantes · coronas · rehabilitación bucal completa',
  'All-on-X · implants · Invisalign': 'All-on-X · implantes · Invisalign',
  'Meet our full team of dental providers': 'Conoce a todo nuestro equipo de proveedores dentales',

  // — Financing —
  'Cost should never be the reason you delay dental care. We accept most insurance plans and offer flexible financing so quality care is always within reach.':
    'El costo nunca debe ser la razón para retrasar tu atención dental. Aceptamos la mayoría de los seguros y ofrecemos financiamiento flexible para que la atención de calidad siempre esté a tu alcance.',
  'In-House Plans': 'Planes Internos',
  'Boca Membership': 'Membresía Boca',
  'Affordable monthly payment plans direct through our office — no third-party application required. $0 down on most treatments.':
    'Planes de pago mensuales accesibles directamente con nuestra oficina — sin solicitud de terceros. $0 de enganche en la mayoría de los tratamientos.',
  'Healthcare Financing': 'Financiamiento de Salud',
  'Special financing options on purchases of $200+, with 6, 12, 18, or 24-month no-interest plans for qualified applicants.':
    'Opciones de financiamiento especial en compras de $200+, con planes sin intereses a 6, 12, 18 o 24 meses para solicitantes calificados.',
  'Pay Over Time': 'Paga con el Tiempo',
  'Quick approval for nearly everyone — no impact to your credit score to apply. Flexible monthly payments with no late fees.':
    'Aprobación rápida para casi todos — sin afectar tu puntaje de crédito al solicitar. Pagos mensuales flexibles sin cargos por mora.',
  'Smile Financing': 'Financiamiento para tu Sonrisa',
  'Dedicated dental financing with promotional terms and longer repayment options for larger treatment plans like implants and Invisalign.':
    'Financiamiento dental dedicado con términos promocionales y opciones de pago más largas para tratamientos mayores como implantes e Invisalign.',
  'Plus 20+ additional plans. Do not see yours? Call us — we likely accept it.':
    'Más de 20 planes adicionales. ¿No ves el tuyo? Llámanos — probablemente lo aceptamos.',
  'Verify My Insurance': 'Verifica Mi Seguro',
  'We will check your benefits and walk you through your coverage before your first visit — no surprises at checkout.':
    'Verificaremos tus beneficios y te explicaremos tu cobertura antes de tu primera visita — sin sorpresas al pagar.',
  'Check My Coverage': 'Verifica Mi Cobertura',

  // — FAQ header —
  'About Boca Dental & Braces': 'Sobre Boca Dental and Braces',
  'Insurance, financing, hours, kids, emergencies — here are the questions our front desk hears every day. Do not see yours? Give us a call.':
    'Seguros, financiamiento, horarios, niños, urgencias — estas son las preguntas que nuestra recepción escucha cada día. ¿No ves la tuya? Llámanos.',

  // — Conversion bar / badges —
  'Booking now': 'Reservando ahora',
  'Live': 'En vivo',
  '3 Reno offices': '3 clínicas en Reno',
  'Insurance · Medicaid': 'Seguros · Medicaid',
  'Reno · 3 Locations': 'Reno · 3 Clínicas',
  '3 Locations': '3 Clínicas',

  // — Footer —
  'World-class dental care for Reno & Sparks families you can afford — across Reno, Sparks, and Washoe County.':
    'Atención dental de clase mundial y accesible para las familias de Reno y Sparks — en Reno, Sparks y el condado de Washoe.',
  'Quick Links': 'Enlaces Rápidos',
  'About Boca': 'Sobre Boca',
  'Locations': 'Ubicaciones',
  'Services': 'Servicios',
  'New Patients': 'Nuevos Pacientes',
  'Financing': 'Financiamiento',
  'Contact': 'Contacto',
  'General Dentistry': 'Odontología General',
  'Braces & Orthodontics': 'Frenos y Ortodoncia',
  'Dental Implants': 'Implantes Dentales',
  'Teeth Whitening': 'Blanqueamiento Dental',
  'Emergency Dental': 'Dental de Urgencia',
  'Pediatric Care': 'Atención Pediátrica',
  'Crowns & Veneers': 'Coronas y Carillas',
  'All 3 Locations': 'Las 3 Clínicas',
  'Kids': 'Niños',
  'Privacy Policy': 'Política de Privacidad',
  'HIPAA Notice': 'Aviso de HIPAA',
  'Terms of Use': 'Términos de Uso',

  // — image alts / aria —
  'The bright, modern reception and front desk at Boca Dental and Braces in Reno, with the Boca logo on a navy accent wall':
    'La recepción moderna y luminosa de Boca Dental and Braces en Reno, con el logo de Boca en una pared azul marino',
  'Pediatric treatment bay with kid-sized dental chairs at the Boca Kids clinic in Sparks, in the Reno area':
    'Sala de tratamiento pediátrico con sillas dentales para niños en la clínica Boca Kids en Sparks, en el área de Reno',
  'Boca Dental and Braces site header': 'Encabezado del sitio de Boca Dental and Braces',
  'Boca Dental and Braces — home': 'Boca Dental and Braces — inicio',
  'Boca Dental and Braces trust signals': 'Señales de confianza de Boca Dental and Braces',
  'Boca Dental and Braces Reno locations': 'Clínicas de Boca Dental and Braces en Reno',
  'Primary': 'Principal',

  // — Locations hub —
  'Our Locations': 'Nuestras Clínicas',
  'Find your': 'Encuentra tu',
  'Find Your Location': 'Encuentra Tu Clínica',
  'Book an Appointment →': 'Reservar una Cita →',
  'Book Here': 'Reservar Aquí',
  'View Clinic': 'Ver Clínica',
  'Insurance accepted:': 'Seguros aceptados:',

  // — Location detail page —
  'Your': 'Tu',
  'dentist near': 'dentista cerca de',
  'Modern dental care': 'Atención dental moderna',
  'for the whole family': 'para toda la familia',
  '. Same-day appointments, most insurance accepted.': '. Citas el mismo día, la mayoría de seguros aceptados.',
  'Open today · 8a–8p': 'Abierto hoy · 8a–8p',
  'Book at this office': 'Reservar en esta clínica',
  'Book at this location': 'Reservar en esta clínica',
  '24/7 emergency': 'Urgencias 24/7',
  'Hours': 'Horario',
  'Sun by emergency': 'Dom por urgencia',
  'Get directions': 'Cómo llegar',
  'All': 'Todas',
  'Major insurance accepted': 'Se aceptan los principales seguros',
  '[ 02 ] · Clinic information': '[ 02 ] · Información de la clínica',
  'Address, phone, hours, languages, and parking — verified against our Google Business Profile.':
    'Dirección, teléfono, horario, idiomas y estacionamiento — verificados con nuestro Perfil de Negocio de Google.',
  'Tap to call →': 'Toca para llamar →',
  'Emergency appointments': 'Citas de urgencia',
  'Same-day emergencies welcome': 'Urgencias el mismo día bienvenidas',
  "Toothache, broken tooth, lost crown — call ahead and we'll work you in":
    'Dolor de muela, diente roto, corona perdida — llama con anticipación y te atenderemos',
  'Hours · Office No.': 'Horario · Clínica No.',
  'Monday': 'Lunes',
  'Tuesday': 'Martes',
  'Wednesday': 'Miércoles',
  'Thursday': 'Jueves',
  'Friday': 'Viernes',
  'Saturday': 'Sábado',
  'Sunday': 'Domingo',
  'Closed': 'Cerrado',
  'By emergency only': 'Solo por urgencia',
  'Languages': 'Idiomas',
  'Parking': 'Estacionamiento',
  'Free on-site parking': 'Estacionamiento gratuito en el lugar',
  'Free parking': 'Estacionamiento gratuito',
  'About this location': 'Sobre esta clínica',
  'Your neighborhood dentist in': 'Tu dentista de confianza en',
  "What's nearby · what makes this clinic": 'Qué hay cerca · qué hace especial a esta clínica',
  'Call': 'Llamar',
  'Your team': 'Tu equipo',
  'View profile': 'Ver perfil',
  'Full-spectrum dental care here.': 'Atención dental completa aquí.',
  'Exams, cleanings, X-rays, fillings, emergency care': 'Exámenes, limpiezas, radiografías, empastes, atención de urgencia',
  'Single tooth, full arch, All-on-4, implant dentures': 'Diente individual, arco completo, All-on-4, dentaduras sobre implantes',
  'Periodontal Care': 'Atención Periodontal',
  'All services available.': 'Todos los servicios disponibles.',
  'What patients at our': 'Lo que dicen los pacientes de nuestra',
  'location are saying.': 'clínica.',
  'Reviews from real patients who specifically mention this clinic, a provider here, or a nearby neighborhood. Aggregated from 208+ verified Google reviews.':
    'Reseñas de pacientes reales que mencionan específicamente esta clínica, un proveedor de aquí o un vecindario cercano. Recopiladas de más de 208 reseñas verificadas de Google.',
  'Placeholder review — real Google reviews for this office will be added before launch.':
    'Reseña de ejemplo — las reseñas reales de Google para esta clínica se agregarán antes del lanzamiento.',
  'Patient review': 'Reseña de paciente',
  'Read all reviews on Google': 'Leer todas las reseñas en Google',
  '[ 08 ] · Insurance & financing': '[ 08 ] · Seguros y financiamiento',
  'Making dental care affordable in': 'Hacer accesible la atención dental en',
  "Insurance verified before your appointment at no cost. Flexible payment plans for what insurance doesn't cover.":
    'Seguro verificado antes de tu cita sin costo. Planes de pago flexibles para lo que el seguro no cubre.',
  'Insurance': 'Seguro',
  'accepts most major PPO dental insurance plans. We verify your benefits before your appointment at no cost, so your out-of-pocket is clear upfront.':
    'acepta la mayoría de los principales planes de seguro dental PPO. Verificamos tus beneficios antes de tu cita sin costo, para que tu gasto de bolsillo quede claro desde el principio.',
  'Apply in minutes at the front desk or online': 'Solicita en minutos en recepción o en línea',
  'Same-day approval common for qualified applicants': 'Aprobación el mismo día común para solicitantes calificados',
  'Use for any service — implants, ortho, restorative': 'Úsalo para cualquier servicio — implantes, ortodoncia, restaurativos',
  'Use Flexible Spending Account or Health Savings Account funds for dental treatment — reduces your taxable out-of-pocket cost.':
    'Usa fondos de tu Cuenta de Gastos Flexibles (FSA) o Cuenta de Ahorros para la Salud (HSA) para tratamiento dental — reduce tu gasto de bolsillo gravable.',
  'Bring your FSA/HSA card to your visit or submit receipts to your plan administrator after the appointment.':
    'Trae tu tarjeta FSA/HSA a tu visita o envía los recibos al administrador de tu plan después de la cita.',
  'Questions about coverage or payment options?': '¿Preguntas sobre cobertura u opciones de pago?',
  'Call our': 'Llama a nuestra',
  "or book online — we'll walk you through everything at your first visit.":
    'o reserva en línea — te explicaremos todo en tu primera visita.',
  'See all 3 offices': 'Ver las 3 clínicas',

  // — Services hub —
  'Comprehensive Care.': 'Atención Integral.',
  'Browse All Services ↓': 'Ver Todos los Servicios ↓',
  'Available now': 'Disponible ahora',
  'All in-house': 'Todo en casa',
  'Our Signature Services.': 'Nuestros Servicios Destacados.',
  'Single implants, full arch, All-on-X — performed in-house by Dr. Isaiah Abdelmeseeh, our restorative & surgical dentist. No outside referrals needed.':
    'Implantes individuales, arco completo, All-on-X — realizados en casa por el Dr. Isaiah Abdelmeseeh, nuestro dentista restaurador y cirujano. Sin referencias externas.',
  'Learn More': 'Más Información',
  'Clear aligners and traditional braces overseen by Dr. David Montalvo. Teen and adult programs. Results in as little as 6 months.':
    'Alineadores transparentes y frenos tradicionales supervisados por el Dr. David Montalvo. Programas para adolescentes y adultos. Resultados en tan solo 6 meses.',
  'Smile Makeovers': 'Transformaciones de Sonrisa',
  'Complete cosmetic transformations using porcelain veneers, professional whitening, and bonding — tailored to your goals.':
    'Transformaciones cosméticas completas con carillas de porcelana, blanqueamiento profesional y bonding — adaptadas a tus metas.',
  'All Services': 'Todos los Servicios',
  'Complete Care Under One Roof.': 'Atención Completa Bajo un Mismo Techo.',
  'Comprehensive care in one practice. Select a category to explore all available treatments.':
    'Atención integral en una sola práctica. Selecciona una categoría para explorar todos los tratamientos disponibles.',
  'Explore →': 'Explorar →',
  'Teeth whitening, veneers, bonding, smile makeovers': 'Blanqueamiento, carillas, bonding y transformaciones de sonrisa',
  'Crowns, bridges, dentures, fillings, cracked tooth repair': 'Coronas, puentes, dentaduras, empastes y reparación de dientes fracturados',
  'Kids exams, infant care, sealants, emergency pedo': 'Exámenes infantiles, cuidado de bebés, selladores y urgencias pediátricas',
  'Extractions, wisdom teeth, bone grafting': 'Extracciones, muelas del juicio, injerto óseo',
  'Gum disease treatment, deep cleaning, maintenance': 'Tratamiento de enfermedad de las encías, limpieza profunda y mantenimiento',
  'Full mouth reconstruction, occlusal adjustment, implant prosth': 'Reconstrucción bucal completa, ajuste oclusal, prótesis sobre implantes',
  'Athletic mouthguards, bruxism treatment, halitosis': 'Protectores bucales deportivos, tratamiento de bruxismo, halitosis',
  'Surgery, implants, ortho — all in-house. No weeks of lag, no extra copays.':
    'Cirugía, implantes, ortodoncia — todo en casa. Sin semanas de espera, sin copagos extra.',
  'Your full history shared across every location. No repeating yourself.':
    'Tu historial completo compartido entre todas las clínicas. Sin tener que repetirte.',

  // — Service category page —
  'Book a Consultation →': 'Reservar una Consulta →',
  'Most treatment handled in-house — no outside referrals': 'La mayoría de los tratamientos en casa — sin referencias externas',
  'Same-day and next-day appointments available': 'Citas el mismo día y al día siguiente disponibles',
  'Se habla español · Bilingual staff at all locations': 'Se habla español · Personal bilingüe en todas las clínicas',
  'Night guards for bruxism, sports guards for athletes.': 'Protectores nocturnos para bruxismo, protectores deportivos para atletas.',
  'Same-day appointments for toothache, trauma, broken or knocked-out teeth.':
    'Citas el mismo día para dolor de muela, traumatismos, dientes rotos o caídos.',
  'Independent assessment of treatment plans from another dentist.':
    'Evaluación independiente de planes de tratamiento por parte de otro dentista.',
  'Book here': 'Reservar aquí',
  'Book here →': 'Reservar aquí →',

  // — Service names (used as titles, cards, links) —
  'Dental Exams & Cleanings': 'Exámenes y Limpiezas Dentales',
  'Emergency Dental Care': 'Atención Dental de Urgencia',
  'Cosmetic Dentistry': 'Odontología Cosmética',
  'Restorative Dentistry': 'Odontología Restauradora',
  'Pediatric Dentistry': 'Odontología Pediátrica',
  'Sedation Dentistry': 'Odontología de Sedación',
  'Oral Surgery': 'Cirugía Oral',
  'Custom Mouthguards': 'Protectores Bucales a Medida',
  'Second Opinion': 'Segunda Opinión',

  // — Service detail static frame —
  'Book a free consultation': 'Reservar una consulta gratis',
  'Free initial consultation': 'Consulta inicial gratis',
  'Free consultation': 'Consulta gratis',
  'Step-by-step process': 'Proceso paso a paso',
  'What Our Patients Say About': 'Lo que Dicen Nuestros Pacientes Sobre',
  'Frequently Asked Questions About': 'Preguntas Frecuentes Sobre',
  'Other Services You May Be Interested In': 'Otros Servicios que Te Pueden Interesar',
  'View service': 'Ver servicio',
  'View all': 'Ver todos',
  'Find': 'Encuentra',
  'Book Your': 'Reserva Tu',
  'Ready to get started with': '¿Listo para comenzar con',
  'Book online': 'Reservar en línea',
  'Call us now': 'Llámanos ahora',
  'in Reno': 'en Reno',
  'at Boca Dental & Braces': 'en Boca Dental and Braces',
  'Appointment': 'Cita',
  'Near You — 3 Boca Dental & Braces Locations Across Reno': 'Cerca de Ti — 3 Clínicas Boca en Reno',
  'Book your appointment online or call your nearest Boca Dental & Braces location today.':
    'Reserva tu cita en línea o llama hoy a tu clínica Boca más cercana.',
  'Insurance, Financing & Payment Options': 'Seguros, Financiamiento y Opciones de Pago',
  'Second Opinion Consultations': 'Consultas de Segunda Opinión',
  'We also offer in-house payment plans to help make treatment affordable regardless of your insurance situation. Ask our team about monthly payment options at your free consultation.':
    'También ofrecemos planes de pago internos para hacer el tratamiento accesible sin importar tu situación de seguro. Pregunta a nuestro equipo sobre las opciones de pago mensual en tu consulta gratis.',
  'Flexible Spending Accounts (FSA) and Health Savings Accounts (HSA) can be used to pay for treatment, reducing your taxable out-of-pocket cost.':
    'Las Cuentas de Gastos Flexibles (FSA) y las Cuentas de Ahorros para la Salud (HSA) se pueden usar para pagar el tratamiento, reduciendo tu gasto de bolsillo gravable.',

  // — About page: headings —
  'the Competition.': 'la Competencia.',
  'Our Story': 'Nuestra Historia',
  'The Beginning': 'El Comienzo',
  'The First Office': 'La Primera Clínica',
  'Bilingual Care': 'Atención Bilingüe',
  'Serving the Community': 'Sirviendo a la Comunidad',
  'In-House': 'En Casa',
  'Advanced Care, In-House': 'Atención Avanzada, En Casa',
  'A Clinic Just for Kids': 'Una Clínica Solo para Niños',
  'What We Stand For': 'Lo que Defendemos',
  'Access for Every Family': 'Acceso para Cada Familia',
  'Comprehensive Care, One Practice': 'Atención Integral, Una Sola Práctica',
  'Our Providers': 'Nuestros Proveedores',
  'Meet All Providers →': 'Conoce a Todos los Proveedores →',
  'Years in Practice': 'Años de Experiencia',
  'Full Profile →': 'Perfil Completo →',
  'The Team Behind': 'El Equipo Detrás de',
  'Every Visit.': 'Cada Visita.',
  'Always Close to Home.': 'Siempre Cerca de Casa.',

  // — About page: body —
  'Reno deserved a better dental practice. One that accepts Medicaid. One that speaks Spanish. One that has specialists on staff — not on referral. We built that practice to serve Reno and Sparks. Three clinics later, that is still the mission.':
    'Reno merecía una mejor práctica dental. Una que acepte Medicaid. Una que hable español. Una que tenga especialistas en el equipo — no por referencia. Construimos esa práctica para servir a Reno y Sparks. Tres clínicas después, esa sigue siendo la misión.',
  '"Every Reno family deserves consistent, high-quality dental care close to home — regardless of ZIP code, schedule, or budget."':
    '"Cada familia de Reno merece atención dental constante y de alta calidad cerca de casa — sin importar el código postal, el horario o el presupuesto."',
  'Boca Dental and Braces was built around a simple mission: bring high-quality, full-specialty dental care to the Reno–Sparks community — and turn no one away over budget or insurance.':
    'Boca Dental and Braces se construyó en torno a una misión simple: llevar atención dental de alta calidad y de especialidad completa a la comunidad de Reno–Sparks — y no rechazar a nadie por presupuesto o seguro.',
  "That meant accepting Nevada Medicaid from day one, when many practices wouldn't. It meant hiring Spanish-speaking staff at the front desk and in the operatories, because Reno and Sparks are bilingual communities. It meant same-day emergency appointments, Saturday hours, and advanced restorative care in-house — so a crown, implant, or full-mouth case didn't mean a referral across town.":
    'Eso significó aceptar Nevada Medicaid desde el primer día, cuando muchas prácticas no lo hacían. Significó contratar personal de habla hispana en la recepción y en los consultorios, porque Reno y Sparks son comunidades bilingües. Significó citas de urgencia el mismo día, horarios de sábado y atención restauradora avanzada en casa — para que una corona, un implante o un caso de boca completa no significara una referencia al otro lado de la ciudad.',
  'Today, Boca Dental and Braces operates 3 clinics across Reno and Sparks — a general and implant office on Moana Lane in Reno, an adult and implant clinic on N McCarran Blvd in Sparks, and a dedicated pediatric and orthodontic clinic next door — spanning general and restorative dentistry, implants and All-on-X, Invisalign, and pediatric and orthodontic care for kids. The mission has not changed.':
    'Hoy, Boca Dental and Braces opera 3 clínicas en Reno y Sparks — una clínica general y de implantes en Moana Lane en Reno, una clínica para adultos e implantes en N McCarran Blvd en Sparks, y una clínica pediátrica y de ortodoncia dedicada al lado — abarcando odontología general y restauradora, implantes y All-on-X, Invisalign, y atención pediátrica y de ortodoncia para niños. La misión no ha cambiado.',
  "Boca Specialty opens its first office in the Reno–Sparks area — Nevada Medicaid accepted from day one, when many practices wouldn't.":
    'Boca Specialty abre su primera clínica en el área de Reno–Sparks — Nevada Medicaid aceptado desde el primer día, cuando muchas prácticas no lo hacían.',
  'Spanish-speaking staff added at the front desk and in the operatories to serve Reno and Sparks families.':
    'Se agregó personal de habla hispana en la recepción y en los consultorios para servir a las familias de Reno y Sparks.',
  'Implants, All-on-X, Invisalign, and full-mouth restorative care handled in-house — advanced treatment without bouncing between offices.':
    'Implantes, All-on-X, Invisalign y atención restauradora de boca completa realizados en casa — tratamiento avanzado sin ir de una clínica a otra.',
  'A dedicated pediatric and orthodontic clinic opens in Sparks — a full kids-only experience right beside the adult office.':
    'Una clínica pediátrica y de ortodoncia dedicada abre en Sparks — una experiencia completa solo para niños justo al lado de la clínica para adultos.',
  'Boca Specialty now serves Reno and Sparks from three clinics, with the same mission it started with.':
    'Boca Specialty ahora sirve a Reno y Sparks desde tres clínicas, con la misma misión con la que comenzó.',
  'Nevada Medicaid accepted. Most major PPO plans welcomed. Flexible in-house payment options available. We built Boca so that cost is never the reason a Reno family skips dental care.':
    'Nevada Medicaid aceptado. La mayoría de los principales planes PPO bienvenidos. Opciones de pago internas flexibles disponibles. Construimos Boca para que el costo nunca sea la razón por la que una familia de Reno deje de recibir atención dental.',
  'General and restorative dentistry, implants and All-on-X, Invisalign, and cosmetic work — plus pediatric and orthodontic care for kids at our Boca Kids clinic. A broad range of treatment handled in-house, so most patients avoid an outside referral.':
    'Odontología general y restauradora, implantes y All-on-X, Invisalign y trabajo cosmético — además de atención pediátrica y de ortodoncia para niños en nuestra clínica Boca Kids. Una amplia gama de tratamientos realizados en casa, para que la mayoría de los pacientes eviten una referencia externa.',
  "Dental emergencies don't wait. Same-day emergency appointments are available at all 3 Reno locations. Saturday hours at select clinics. We are here when life happens.":
    'Las urgencias dentales no esperan. Hay citas de urgencia el mismo día en las 3 clínicas de Reno. Horarios de sábado en clínicas seleccionadas. Estamos aquí cuando la vida sucede.',
  "Dr. Isaiah Abdelmeseeh chose dentistry because it blends precision, problem-solving, and artistry while making a direct impact on someone's quality of life. A 2023 graduate of USC's Herman Ostrow School of Dentistry, he is especially passionate about restorative and surgical dentistry — including implants, crowns, and full-mouth rehabilitation — gravitating toward the cases where he can truly transform a patient's oral health with long-term solutions rather than quick fixes. Originally from Los Angeles and now living in Reno, he stays active with bodybuilding and a structured fitness routine, and enjoys time with family, traveling, and learning about business, investing, and real estate.":
    'El Dr. Isaiah Abdelmeseeh eligió la odontología porque combina precisión, resolución de problemas y arte, mientras genera un impacto directo en la calidad de vida de las personas. Graduado en 2023 de la Herman Ostrow School of Dentistry de USC, le apasiona especialmente la odontología restauradora y quirúrgica — incluyendo implantes, coronas y rehabilitación de boca completa — inclinándose hacia los casos donde realmente puede transformar la salud bucal de un paciente con soluciones a largo plazo en lugar de arreglos rápidos. Originario de Los Ángeles y ahora viviendo en Reno, se mantiene activo con el fisicoculturismo y una rutina de ejercicio estructurada, y disfruta el tiempo con su familia, viajar y aprender sobre negocios, inversiones y bienes raíces.',
  "Dr. David Montalvo sees dentistry as the place where engineering, art, and problem-solving intersect, and his passion is turning a smile a patient feels embarrassed by into one they're proud of. A graduate of UT Health San Antonio with nine years in practice, he focuses on full-mouth rehabilitation, All-on-X, snap-in dentures, implants, Invisalign, third-molar extractions, root canals, and bone grafting. A member of the Academy of General Dentistry, his promise to every patient is simple: he'll do everything he can to help them reach their dental goals. Originally from Houston and now living in Reno, Dr. Montalvo loves the outdoors with his girlfriend Tiffany and their dog Moose, and spends his free time swimming, gardening, reading, and working out.":
    'El Dr. David Montalvo ve la odontología como el lugar donde se cruzan la ingeniería, el arte y la resolución de problemas, y su pasión es convertir una sonrisa que avergüenza a un paciente en una de la que se sienta orgulloso. Graduado de UT Health San Antonio con nueve años de experiencia, se enfoca en la rehabilitación de boca completa, All-on-X, dentaduras fijas sobre implantes, implantes, Invisalign, extracciones de terceros molares, endodoncias e injertos óseos. Miembro de la Academy of General Dentistry, su promesa a cada paciente es simple: hará todo lo posible para ayudarlos a alcanzar sus metas dentales. Originario de Houston y ahora viviendo en Reno, al Dr. Montalvo le encanta el aire libre con su novia Tiffany y su perro Moose, y pasa su tiempo libre nadando, cultivando el jardín, leyendo y ejercitándose.',
  'Our office and practice managers keep every Boca Dental & Braces location running smoothly — coordinating care, scheduling, and the front-desk experience patients feel from the moment they walk in.':
    'Nuestros gerentes de oficina y de práctica mantienen cada clínica de Boca Dental and Braces funcionando sin problemas — coordinando la atención, la programación y la experiencia de recepción que los pacientes sienten desde el momento en que entran.',

  // — Dentists hub + detail —
  'About': 'Nosotros',
  'Our Dentists': 'Nuestros Dentistas',
  'General Dentist': 'Dentista General',
  'General & Orthodontic Dentist': 'Dentista General y de Ortodoncia',
  'Book with': 'Reservar con',
  'Book your first appointment with': 'Reserva tu primera cita con',
  'New patients always welcome at Boca Dental & Braces. Free consultations, most insurance accepted, evening and weekend hours.':
    'Nuevos pacientes siempre bienvenidos en Boca Dental and Braces. Consultas gratuitas, la mayoría de seguros aceptados, horarios de noche y fin de semana.',

  // — Contact —
  '[ 01 ] · Contact': '[ 01 ] · Contacto',
  "Reach our central line at (775) 555-0100, find a specific clinic's direct number below, or send us a message and we'll get back within one business day.":
    'Comunícate con nuestra línea central al (775) 555-0100, encuentra el número directo de una clínica específica abajo, o envíanos un mensaje y te responderemos en un día hábil.',
  'Quick Contact': 'Contacto Rápido',
  'Email': 'Correo electrónico',
  "Coming soon — text via your clinic's GBP": 'Próximamente — mensajes de texto vía el Perfil de Google de tu clínica',
  'Mon–Sat hours vary by clinic. See location page.': 'El horario Lun–Sáb varía por clínica. Ver página de la clínica.',
  'Call us': 'Llámanos',

  // — Consultation form —
  'Book an Appointment': 'Reservar una Cita',
  'Choose office': 'Elige clínica',
  'Your details': 'Tus datos',
  'Which office works best for you?': '¿Qué clínica te conviene más?',
  'No preference — find me the nearest available location': 'Sin preferencia — encuéntrame la clínica disponible más cercana',
  'Full name': 'Nombre completo',
  'Phone': 'Teléfono',
  "Service you're interested in": 'Servicio que te interesa',
  '— Select a service (optional)': '— Selecciona un servicio (opcional)',
  'Message (optional)': 'Mensaje (opcional)',
  'Request My Appointment': 'Solicitar Mi Cita',
  'Your selected office': 'Tu clínica seleccionada',
  'We respond within 1 business hour · No spam · HIPAA compliant': 'Respondemos en 1 hora hábil · Sin spam · Cumple con HIPAA',
  'I consent to being contacted by Boca Dental and Braces by phone, text, or email.':
    'Doy mi consentimiento para ser contactado por Boca Dental and Braces por teléfono, mensaje de texto o correo electrónico.',
  'Anything else we should know — preferred days, insurance, concerns...':
    'Algo más que debamos saber — días preferidos, seguro, inquietudes...',

  // — Patient resources / insurance —
  'Patient Resources': 'Recursos para Pacientes',
  '[ 02 ] · Insurance': '[ 02 ] · Seguros',
  'Insurance We Accept': 'Seguros que Aceptamos',

  // — Financing page —
  'Financing & Payment Plans': 'Financiamiento y Planes de Pago',
  'Spread the cost over 6, 12, 18, or 24 months. Low or no interest. Apply in minutes at the front desk or online. Subject to credit approval.':
    'Distribuye el costo en 6, 12, 18 o 24 meses. Interés bajo o sin interés. Solicita en minutos en recepción o en línea. Sujeto a aprobación de crédito.',
  'In-House Payment Plans': 'Planes de Pago Internos',
  'We also offer in-house monthly payment plans without a hard credit check for routine care. Ask your treatment coordinator at your visit.':
    'También ofrecemos planes de pago mensuales internos sin verificación de crédito rigurosa para atención de rutina. Pregunta a tu coordinador de tratamiento en tu visita.',
  'Use pre-tax Flexible Spending Account or Health Savings Account funds toward your dental treatment to reduce your out-of-pocket cost.':
    'Usa fondos antes de impuestos de tu Cuenta de Gastos Flexibles o Cuenta de Ahorros para la Salud para tu tratamiento dental y reduce tu gasto de bolsillo.',

  // — Reviews page —
  '+ verified reviews': '+ reseñas verificadas',
  'Average rating': 'Calificación promedio',
  'All Locations': 'Todas las Clínicas',
  'Book your next visit': 'Reserva tu próxima visita',
  'Verified Google Reviews': 'Reseñas Verificadas de Google',
  'What Reno patients': 'Lo que dicen los pacientes de Reno',
  'say about Boca.': 'sobre Boca.',
  'Real reviews from real patients. We never pay for reviews — every star is earned at one of our Reno and Sparks clinics.':
    'Reseñas reales de pacientes reales. Nunca pagamos por reseñas — cada estrella se gana en una de nuestras clínicas de Reno y Sparks.',
  'is a growing office — verified Google reviews will appear here as patients share them.':
    'es una clínica en crecimiento — las reseñas verificadas de Google aparecerán aquí a medida que los pacientes las compartan.',
  'Book at': 'Reservar en',
  'Had a great experience?': '¿Tuviste una buena experiencia?',
  'Your review helps other Reno families find quality dental care. It takes 60 seconds on Google and means the world to our team.':
    'Tu reseña ayuda a otras familias de Reno a encontrar atención dental de calidad. Toma 60 segundos en Google y significa mucho para nuestro equipo.',
  'Leave a Google review': 'Deja una reseña en Google',
  'FAQs': 'Preguntas Frecuentes',

  // — About page: headings missed in first pass —
  'Knocking Out': 'Venciendo a',
  'One Clinic.': 'Una Sola Clínica.',
  'One Idea.': 'Una Sola Idea.',
  'Built Different.': 'Hechos Diferente.',
  'By Design.': 'Por Diseño.',
  'Bilingual by Design': 'Bilingüe por Diseño',
  'Same-Day When You Need It': 'El Mismo Día Cuando lo Necesitas',
  '6 Dentists.': '6 Dentistas.',
  'Dentists.': 'Dentistas.',
  'One Standard.': 'Un Solo Estándar.',
  '"Three Clinics, One Standard"': '"Tres Clínicas, Un Solo Estándar"',
  'Practice Management': 'Gestión de la Práctica',
  'Office Manager': 'Gerente de Oficina',

  // — Careers —
  'Looking for a patient appointment instead?': '¿Buscas una cita como paciente?',

  // — Service category page headings —
  'Treatments We Offer': 'Tratamientos que Ofrecemos',
  'Available Near You': 'Disponible Cerca de Ti',

  // — Full service catalog: names —
  'Bad Breath (Halitosis)': 'Mal Aliento (Halitosis)',
  'Bone Grafting': 'Injerto Óseo',
  'Bruxism / Teeth Grinding': 'Bruxismo / Rechinar de Dientes',
  'Cracked Tooth Repair': 'Reparación de Diente Fracturado',
  'Custom Athletic Mouthguards': 'Protectores Bucales Deportivos a Medida',
  'Dental Bonding': 'Bonding Dental',
  'Dental Bridges': 'Puentes Dentales',
  'Dental Crowns': 'Coronas Dentales',
  'Dentures': 'Dentaduras',
  'Emergency Root Canal': 'Endodoncia de Urgencia',
  'Endodontics': 'Endodoncia',
  'Fluoride Treatments for Kids': 'Tratamientos de Flúor para Niños',
  'Frenectomy': 'Frenectomía',
  'Full Arch Implants (All-on-4)': 'Implantes de Arco Completo (All-on-4)',
  'Full Mouth Reconstruction': 'Reconstrucción de Boca Completa',
  'Gum Contouring': 'Contorneado de Encías',
  'Gum Disease Treatment': 'Tratamiento de Enfermedad de las Encías',
  'Implant Prosthodontics': 'Prostodoncia sobre Implantes',
  'Implant-Supported Bridges': 'Puentes sobre Implantes',
  'Implant-Supported Dentures': 'Dentaduras sobre Implantes',
  'Infant & Toddler Dentistry': 'Odontología para Bebés y Niños Pequeños',
  'Invisalign Clear Aligners': 'Alineadores Transparentes Invisalign',
  'Laser Gum Treatment': 'Tratamiento de Encías con Láser',
  'Occlusal (Bite) Adjustment': 'Ajuste Oclusal (de Mordida)',
  'Orthodontics': 'Ortodoncia',
  'Pediatric Emergency Care': 'Atención Pediátrica de Urgencia',
  'Periodontal Maintenance': 'Mantenimiento Periodontal',
  'Porcelain Veneers': 'Carillas de Porcelana',
  'Preventive & Wellness Dentistry': 'Odontología Preventiva y de Bienestar',
  'Prosthodontics': 'Prostodoncia',
  'Retainers': 'Retenedores',
  'Root Canal Treatment': 'Tratamiento de Endodoncia',
  'Scaling & Root Planing': 'Raspado y Alisado Radicular',
  'Sedation & Comfort Dentistry': 'Odontología de Sedación y Confort',
  'Teen Dentistry': 'Odontología para Adolescentes',
  'Tooth Extractions': 'Extracciones Dentales',
  'Tooth-Colored Fillings': 'Empastes del Color del Diente',
  'Traditional Braces': 'Frenos Tradicionales',
  'Wisdom Tooth Removal': 'Extracción de Muelas del Juicio',

  // — Full service catalog: descriptions —
  'Advanced restorations on dental implants — crowns, bridges, full arches.': 'Restauraciones avanzadas sobre implantes dentales — coronas, puentes, arcos completos.',
  'All-on-4 / All-on-6 full-arch tooth replacement.': 'Reemplazo dental de arco completo All-on-4 / All-on-6.',
  'Bridges anchored on dental implants for multiple missing teeth.': 'Puentes anclados sobre implantes dentales para varios dientes faltantes.',
  'Composite fillings that blend seamlessly with natural teeth.': 'Empastes de composite que se integran perfectamente con los dientes naturales.',
  'Composite resin to repair chips, close gaps, reshape teeth.': 'Resina compuesta para reparar astillas, cerrar espacios y remodelar dientes.',
  'Comprehensive exams, X-rays, professional cleanings, preventive guidance.': 'Exámenes completos, radiografías, limpiezas profesionales y orientación preventiva.',
  'Comprehensive restoration of all teeth in one coordinated plan.': 'Restauración integral de todos los dientes en un plan coordinado.',
  'Comprehensive smile transformation combining multiple cosmetic procedures.': 'Transformación integral de la sonrisa combinando múltiples procedimientos cosméticos.',
  'Correct bite imbalances to relieve TMJ pain and protect teeth.': 'Corrige desequilibrios de mordida para aliviar el dolor de la ATM y proteger los dientes.',
  'Custom porcelain shells that transform smile shape and color.': 'Láminas de porcelana a medida que transforman la forma y el color de la sonrisa.',
  'Custom-fit mouthguards for contact sports and recreation.': 'Protectores bucales a medida para deportes de contacto y recreación.',
  'Deep cleaning below the gumline to remove tartar and bacteria.': 'Limpieza profunda debajo de la línea de las encías para eliminar el sarro y las bacterias.',
  'Dental care, ortho consults, and wisdom-teeth monitoring for teens.': 'Atención dental, consultas de ortodoncia y monitoreo de muelas del juicio para adolescentes.',
  'First dental visit by age 1, gentle care for the youngest patients.': 'Primera visita dental al año de edad, atención suave para los pacientes más pequeños.',
  'Fixed and removable retainers to maintain orthodontic results.': 'Retenedores fijos y removibles para mantener los resultados de la ortodoncia.',
  'Fixed bridges to replace one or more missing teeth.': 'Puentes fijos para reemplazar uno o más dientes faltantes.',
  'Full, partial, and implant-supported dentures.': 'Dentaduras completas, parciales y sobre implantes.',
  'Identify and treat the underlying causes of chronic bad breath.': 'Identifica y trata las causas subyacentes del mal aliento crónico.',
  'In-office whitening + take-home professional kits.': 'Blanqueamiento en consultorio + kits profesionales para el hogar.',
  'Invisalign, traditional braces, teen & adult ortho': 'Invisalign, frenos tradicionales, ortodoncia para adolescentes y adultos',
  'Lip and tongue tie release for infants, kids, and adults.': 'Liberación de frenillo labial y lingual para bebés, niños y adultos.',
  'Metal and ceramic braces for complex alignment.': 'Frenos de metal y cerámica para alineaciones complejas.',
  'Minimally invasive laser therapy for periodontal disease.': 'Terapia láser mínimamente invasiva para la enfermedad periodontal.',
  'Nearly invisible, removable clear aligners for teens and adults.': 'Alineadores transparentes removibles y casi invisibles para adolescentes y adultos.',
  'Night guards and TMJ treatment for chronic teeth grinding.': 'Protectores nocturnos y tratamiento de ATM para el rechinar crónico de dientes.',
  'Nitrous oxide, oral sedation, IV sedation': 'Óxido nitroso, sedación oral, sedación intravenosa',
  'Porcelain, zirconia, and PFM crowns for damaged teeth.': 'Coronas de porcelana, zirconio y metal-porcelana para dientes dañados.',
  'Professional fluoride applications to strengthen developing enamel.': 'Aplicaciones profesionales de flúor para fortalecer el esmalte en desarrollo.',
  'Removal of impacted or problematic wisdom teeth.': 'Extracción de muelas del juicio impactadas o problemáticas.',
  'Repair and protect cracked or fractured teeth.': 'Repara y protege dientes agrietados o fracturados.',
  'Reshape gum line for a more balanced, proportional smile.': 'Remodela la línea de las encías para una sonrisa más equilibrada y proporcional.',
  'Restore jaw bone for future implants or restorations.': 'Restaura el hueso maxilar para futuros implantes o restauraciones.',
  'Root canal therapy + emergency root canals': 'Terapia de endodoncia + endodoncias de urgencia',
  'Same-day emergency care for kids — knocked-out teeth, trauma, severe pain.': 'Atención de urgencia el mismo día para niños — dientes caídos, traumatismos, dolor severo.',
  'Same-day root canal for severe tooth pain or abscess.': 'Endodoncia el mismo día para dolor dental severo o absceso.',
  'Save infected teeth with modern, comfortable root canal therapy.': 'Salva dientes infectados con terapia de endodoncia moderna y cómoda.',
  'Simple and surgical extractions when teeth cannot be saved.': 'Extracciones simples y quirúrgicas cuando los dientes no se pueden salvar.',
  'Snap-in or fixed dentures secured by implants.': 'Dentaduras fijas o de presión aseguradas por implantes.',
  'Specialized cleanings every 3–4 months for patients with gum disease.': 'Limpiezas especializadas cada 3–4 meses para pacientes con enfermedad de las encías.',
  'Treatment for gingivitis and periodontitis at all stages.': 'Tratamiento para gingivitis y periodontitis en todas las etapas.',

  // ── VEGAS-SPECIFIC ──────────────────────────────────────────────
  // Homepage + global
  'Licensed providers': 'Proveedores con licencia',
  'Verified on platforms our patients trust': 'Verificado en las plataformas que nuestros pacientes confían',
  '· Patient verified': '· Verificado por el paciente',
  'Read All Reviews': 'Leer Todas las Reseñas',
  ', and the': ', y el',
  'Family + restorative · multilingual patient care': 'Atención familiar + restaurativa · multilingüe',
  'All 9 Locations': 'Las 9 Clínicas',
  '9 Locations': '9 Clínicas',
  'All Locations': 'Todas las Clínicas',
  'Avg patient rating': 'Calificación promedio',
  'Patient rating': 'Calificación de pacientes',
  'Note on service availability:': 'Nota sobre disponibilidad de servicios:',
  'available at this location. For': 'disponible en esta clínica. Para',
  'care, visit one of our other clinics': 'atención, visita una de nuestras otras clínicas',
  '[ 06 ] · Patient reviews': '[ 06 ] · Reseñas de pacientes',
  'Training & Experience': 'Formación y Experiencia',
  'Outside the office': 'Fuera de la oficina',
  'Visit clinic →': 'Visitar clínica →',
  '[ 03 ] · Practice locations': '[ 03 ] · Clínicas',
  'Knocking out the competition with world-class dental care you can afford — across Las Vegas, Henderson, and Clark County.':
    'Dejando atrás a la competencia con atención dental de clase mundial y accesible — en Las Vegas, Henderson y el condado de Clark.',

  // Location narratives (9)
  "This South Eastern Avenue practice sits in the heart of Paradise, the bustling community that wraps around the southern end of the Las Vegas Strip. The 89119 ZIP is one of the valley's busiest crossroads, just minutes from Harry Reid International Airport and the sprawling green expanse of Sunset Park, where ponds, walking paths, and shaded picnic areas draw residents from across the southeast valley. Eastern Avenue here is a major north-south artery lined with established neighborhoods, apartment communities, and the kind of everyday retail that keeps daily errands close to home. Many patients work in the nearby resort and hospitality corridor or live in the surrounding Paradise and Winchester neighborhoods, and the office's location makes it an easy stop on the commute. With fast access to the 215 Beltway, area business parks, and the Strip itself, the practice serves a broad cross-section of working families and professionals who appreciate convenient, centrally located care in one of Las Vegas's most connected districts.":
    "Esta clínica en South Eastern Avenue se encuentra en el corazón de Paradise, la animada comunidad que rodea el extremo sur del Strip de Las Vegas. El código postal 89119 es uno de los cruces más concurridos del valle, a solo minutos del Aeropuerto Internacional Harry Reid y de la amplia extensión verde de Sunset Park, donde estanques, senderos y áreas de picnic con sombra atraen a residentes de todo el sureste del valle. Eastern Avenue es aquí una importante arteria norte-sur bordeada de vecindarios establecidos, comunidades de apartamentos y el comercio cotidiano que mantiene los mandados cerca de casa. Muchos pacientes trabajan en el cercano corredor de resorts y hospitalidad o viven en los vecindarios de Paradise y Winchester, y la ubicación de la clínica la convierte en una parada fácil en el camino. Con acceso rápido al 215 Beltway, los parques empresariales de la zona y el propio Strip, la clínica atiende a una amplia variedad de familias trabajadoras y profesionales que valoran una atención conveniente y céntrica en uno de los distritos mejor conectados de Las Vegas.",
  "Right in the Paradise community along South Eastern Avenue, this kids' practice is built for the young families that fill the surrounding 89119 neighborhoods. One of the area's biggest draws sits just down the road: Sunset Park, where playgrounds, duck ponds, open fields, and shaded picnic areas make it a weekend favorite for parents and children across the southeast valley. The blocks around the office mix established family neighborhoods with local schools, everyday shopping, and the kind of close-to-home conveniences busy parents count on. With Harry Reid International Airport and the 215 Beltway nearby, the location is easy to reach whether families are coming from Paradise, Winchester, or the communities along the southern Strip corridor. The neighborhood's diverse, family-centered character makes it a natural home for a practice focused on kids, from first checkups to braces. For local parents looking for a welcoming, convenient place to care for their children's smiles, this South Eastern Boca Kids location keeps pediatric and orthodontic care close to the parks, schools, and homes families already know.":
    "En plena comunidad de Paradise, sobre South Eastern Avenue, esta clínica para niños está pensada para las familias jóvenes que llenan los vecindarios del código postal 89119. Uno de los mayores atractivos de la zona está a poca distancia: Sunset Park, donde áreas de juego, estanques con patos, campos abiertos y zonas de picnic con sombra lo convierten en el favorito del fin de semana para padres e hijos de todo el sureste del valle. Las cuadras alrededor de la clínica combinan vecindarios familiares establecidos con escuelas locales, comercios cotidianos y las comodidades cercanas con las que cuentan los padres ocupados. Con el Aeropuerto Internacional Harry Reid y el 215 Beltway cerca, la ubicación es fácil de alcanzar ya sea que las familias vengan de Paradise, Winchester o las comunidades del corredor sur del Strip. El carácter diverso y centrado en la familia del vecindario la convierte en un hogar natural para una clínica enfocada en los niños, desde los primeros chequeos hasta los frenos. Para los padres que buscan un lugar acogedor y conveniente para cuidar la sonrisa de sus hijos, esta clínica Boca Kids de South Eastern mantiene la atención pediátrica y de ortodoncia cerca de los parques, las escuelas y los hogares que las familias ya conocen.",
  "Tucked just east of downtown Las Vegas, this office anchors one of the city's oldest and most storied corridors. Eastern Avenue in the 89101 ZIP threads through a dense, walkable patchwork of longtime residential blocks, family-run businesses, and the cultural energy radiating from the nearby Fremont Street Experience and East Fremont entertainment district. Patients here are minutes from the Las Vegas Medical District and the galleries and restaurants of the Arts District, making the practice a natural fit for the families who live, work, and study downtown. The surrounding neighborhood is proudly diverse and multigenerational, with bilingual households and independent shops lining the Charleston and Eastern corridors. Quick connections to US-95 and Interstate 515 bring in patients from Winchester, the historic John S. Park district, and the broader downtown core without a long drive. For residents who value being close to the heart of the city, this Eastern Avenue location offers approachable, neighborhood-rooted dental care right where everyday life already happens.":
    "Ubicada justo al este del centro de Las Vegas, esta clínica ancla uno de los corredores más antiguos y emblemáticos de la ciudad. Eastern Avenue, en el código postal 89101, atraviesa un denso y caminable mosaico de cuadras residenciales de toda la vida, negocios familiares y la energía cultural que irradia desde el cercano Fremont Street Experience y el distrito de entretenimiento East Fremont. Los pacientes están a minutos del Distrito Médico de Las Vegas y de las galerías y restaurantes del Arts District, lo que hace de la clínica una opción natural para las familias que viven, trabajan y estudian en el centro. El vecindario es orgullosamente diverso y multigeneracional, con hogares bilingües y tiendas independientes a lo largo de los corredores de Charleston y Eastern. Las conexiones rápidas con la US-95 y la Interestatal 515 atraen pacientes desde Winchester, el histórico distrito John S. Park y el núcleo del centro sin viajes largos. Para los residentes que valoran estar cerca del corazón de la ciudad, esta clínica de Eastern Avenue ofrece atención dental cercana y arraigada al vecindario, justo donde ya transcurre la vida diaria.",
  "Set along the busy West Sahara corridor just west of Interstate 15, this location places patients within easy reach of some of central Las Vegas's most distinctive neighborhoods. The 89102 ZIP borders the historic Scotch 80s, a leafy enclave of mid-century estates, and sits a short drive from the vibrant restaurants and markets of the Las Vegas Chinatown district along Spring Mountain Road. Families here are close to the Meadows Mall, the Springs Preserve's trails and gardens, and the resort corridor that anchors the regional economy. Sahara Avenue itself is a dependable east-west route that links the office to surrounding residential pockets, making appointments simple whether patients are coming from Strip-area workplaces or the established homes north and south of the corridor. The neighborhood blends longtime residents with newcomers drawn to its central position and walkable amenities. For a community that values being minutes from everything, this West Sahara practice offers accessible, full-service dental care without the sprawl of the outer suburbs.":
    "Situada sobre el concurrido corredor de West Sahara, justo al oeste de la Interestatal 15, esta clínica pone a los pacientes cerca de algunos de los vecindarios más distintivos del centro de Las Vegas. El código postal 89102 colinda con el histórico Scotch 80s, un frondoso enclave de propiedades de mediados de siglo, y está a poca distancia de los vibrantes restaurantes y mercados del distrito Chinatown de Las Vegas a lo largo de Spring Mountain Road. Las familias están cerca del Meadows Mall, de los senderos y jardines del Springs Preserve y del corredor de resorts que sostiene la economía regional. Sahara Avenue es una ruta este-oeste confiable que conecta la clínica con los vecindarios cercanos, facilitando las citas ya sea que los pacientes vengan de los lugares de trabajo cerca del Strip o de los hogares establecidos al norte y al sur del corredor. El vecindario combina residentes de toda la vida con recién llegados atraídos por su posición central y sus comodidades caminables. Para una comunidad que valora estar a minutos de todo, esta clínica de West Sahara ofrece atención dental completa y accesible sin la dispersión de los suburbios externos.",
  "This Jones Boulevard practice sits in the heart of west-central Las Vegas, serving the established neighborhoods of the 89107 ZIP near the Charleston corridor. This is one of the city's classic mid-century residential areas, where longtime homes, mature trees, and neighborhood schools give the community a settled, lived-in character. Patients are close to the Meadows Mall, the Springs Preserve, and the shopping and dining that line Charleston and Decatur, with quick access to US-95 connecting the area to downtown and the wider valley. Jones Boulevard itself is a steady north-south route that keeps the office within easy reach of the surrounding homes and the Summerlin communities a short drive west. The neighborhood blends multigenerational families with newcomers drawn to its central location and affordability. For west-side residents who would rather find quality dental care in their own part of town than fight traffic across the valley, this Jones Boulevard location offers comprehensive, approachable treatment right where the community already lives and shops.":
    "Esta clínica en Jones Boulevard se encuentra en el corazón del centro-oeste de Las Vegas, atendiendo los vecindarios establecidos del código postal 89107 cerca del corredor de Charleston. Esta es una de las clásicas zonas residenciales de mediados de siglo de la ciudad, donde los hogares de toda la vida, los árboles maduros y las escuelas del vecindario le dan a la comunidad un carácter asentado y acogedor. Los pacientes están cerca del Meadows Mall, el Springs Preserve y las tiendas y restaurantes que bordean Charleston y Decatur, con acceso rápido a la US-95 que conecta la zona con el centro y el resto del valle. Jones Boulevard es una ruta norte-sur constante que mantiene la clínica al alcance de los hogares cercanos y de las comunidades de Summerlin a poca distancia al oeste. El vecindario combina familias multigeneracionales con recién llegados atraídos por su ubicación central y su accesibilidad. Para los residentes del lado oeste que prefieren encontrar atención dental de calidad en su propia zona en lugar de luchar contra el tráfico por todo el valle, esta clínica de Jones Boulevard ofrece tratamiento integral y cercano justo donde la comunidad ya vive y compra.",
  "This East Charleston practice serves the Winchester neighborhood and the established east-side communities that define the 89104 ZIP. Charleston Boulevard is one of the valley's original arteries, and the blocks around the office carry the character of older, tree-lined Las Vegas, from the nearby Huntridge Historic Neighborhood to the working family homes that have anchored this part of the city for generations. Patients are close to Sunrise Hospital, the Boulevard Mall, and the local parks and schools that keep daily life within a short radius. The surrounding community is diverse and tight-knit, with bilingual households and longtime small businesses lining Charleston and the cross streets feeding into it. Convenient access to US-95 and Eastern Avenue connects the practice to downtown, the Medical District, and the wider east valley, so reaching an appointment rarely means a long trip. For residents who want familiar, dependable dental care rooted in their own neighborhood rather than across town, this Charleston location keeps quality care close to home.":
    "Esta clínica en East Charleston atiende el vecindario de Winchester y las comunidades establecidas del lado este que definen el código postal 89104. Charleston Boulevard es una de las arterias originales del valle, y las cuadras alrededor de la clínica conservan el carácter del Las Vegas más antiguo y arbolado, desde el cercano Huntridge Historic Neighborhood hasta los hogares de familias trabajadoras que han anclado esta parte de la ciudad por generaciones. Los pacientes están cerca del Sunrise Hospital, el Boulevard Mall y los parques y escuelas locales que mantienen la vida diaria a poca distancia. La comunidad es diversa y unida, con hogares bilingües y pequeños negocios de toda la vida a lo largo de Charleston y las calles que la cruzan. El acceso conveniente a la US-95 y a Eastern Avenue conecta la clínica con el centro, el Distrito Médico y el resto del este del valle, por lo que llegar a una cita rara vez implica un viaje largo. Para los residentes que quieren una atención dental familiar y confiable arraigada en su propio vecindario en lugar de al otro lado de la ciudad, esta clínica de Charleston mantiene la atención de calidad cerca de casa.",
  "Located along West Flamingo Road in the thriving Spring Valley community, this office sits at one of the busiest residential crossroads on the west side of the valley. The 89103 ZIP is a dense, energetic mix of established single-family neighborhoods, modern apartment communities, and the everyday shopping that lines the Rainbow and Flamingo corridors. Patients are just north of the area's signature Chinatown dining along Spring Mountain Road and minutes from the 215 Beltway, which links Spring Valley to Summerlin, the Strip, and the southwest valley. Many residents here work in the nearby resort corridor or the growing commercial districts to the west, and the practice's position makes it an easy fit into a busy schedule. The neighborhood is one of the most diverse and fast-growing in the region, home to families from every corner of the world. For Spring Valley households looking for approachable, conveniently located dental care, this West Flamingo location delivers comprehensive treatment in the middle of where the community lives and works.":
    "Ubicada sobre West Flamingo Road en la próspera comunidad de Spring Valley, esta clínica se encuentra en uno de los cruces residenciales más concurridos del lado oeste del valle. El código postal 89103 es una mezcla densa y enérgica de vecindarios establecidos de casas unifamiliares, comunidades modernas de apartamentos y el comercio cotidiano que bordea los corredores de Rainbow y Flamingo. Los pacientes están justo al norte de la emblemática gastronomía de Chinatown a lo largo de Spring Mountain Road y a minutos del 215 Beltway, que conecta Spring Valley con Summerlin, el Strip y el suroeste del valle. Muchos residentes trabajan en el cercano corredor de resorts o en los crecientes distritos comerciales del oeste, y la ubicación de la clínica la hace fácil de incorporar a una agenda ocupada. El vecindario es uno de los más diversos y de más rápido crecimiento de la región, hogar de familias de todos los rincones del mundo. Para los hogares de Spring Valley que buscan atención dental cercana y bien ubicada, esta clínica de West Flamingo ofrece tratamiento integral justo en el centro de donde la comunidad vive y trabaja.",
  "This North Rainbow Boulevard practice anchors the Northwest Las Vegas neighborhoods that fill the 89108 ZIP, a largely residential stretch where the city eases toward the foothills of Lone Mountain. Rainbow Boulevard here is a key north-south route connecting family subdivisions, neighborhood parks, and the local schools that shape daily life in this part of the valley. Patients are minutes from the eastern edge of the Summerlin master-planned community and have quick access to US-95, which links the area to downtown and the central valley. The surrounding neighborhoods draw families and longtime residents who appreciate the quieter, established feel of the northwest while staying close to shopping along Cheyenne and Lake Mead. With Lone Mountain's trails and the open desert nearby, this is a part of Las Vegas defined by its room to breathe and its neighborly character. For households across the northwest who want dependable, easy-to-reach dental care close to home, this Rainbow Boulevard location keeps comprehensive treatment right in the community.":
    "Esta clínica en North Rainbow Boulevard ancla los vecindarios del noroeste de Las Vegas que llenan el código postal 89108, un tramo mayormente residencial donde la ciudad se acerca a las faldas de Lone Mountain. Rainbow Boulevard es aquí una ruta norte-sur clave que conecta subdivisiones familiares, parques del vecindario y las escuelas locales que dan forma a la vida diaria en esta parte del valle. Los pacientes están a minutos del borde este de la comunidad planificada de Summerlin y tienen acceso rápido a la US-95, que conecta la zona con el centro y el valle central. Los vecindarios cercanos atraen a familias y residentes de toda la vida que aprecian el ambiente más tranquilo y establecido del noroeste, manteniéndose cerca de las tiendas a lo largo de Cheyenne y Lake Mead. Con los senderos de Lone Mountain y el desierto abierto cerca, esta es una parte de Las Vegas definida por su espacio para respirar y su carácter de buena vecindad. Para los hogares del noroeste que quieren atención dental confiable y de fácil acceso cerca de casa, esta clínica de Rainbow Boulevard mantiene el tratamiento integral justo en la comunidad.",
  "At the far southern end of Eastern Avenue, this office serves the master-planned neighborhoods of Enterprise and the Silverado Ranch community in the 89123 ZIP. This is one of the valley's most family-oriented suburban districts, where newer subdivisions, neighborhood parks, and modern shopping centers line the corridors between Eastern and the 215 Beltway. Patients are minutes from the South Point Hotel and Casino, the St. Rose Parkway shopping districts, and the Henderson and Green Valley communities just to the east. The area has grown rapidly into a sought-after place for families drawn by its newer homes, strong schools, and easy freeway access to both the Strip and the southwest employment centers. Daily life here revolves around the convenient retail and recreation that fill the southern valley, and the practice fits naturally into that rhythm. For the growing households of Enterprise and Silverado Ranch who want comprehensive, conveniently located dental care without driving toward the city center, this South Eastern location keeps quality treatment close to the suburbs they call home.":
    "En el extremo sur de Eastern Avenue, esta clínica atiende los vecindarios planificados de Enterprise y la comunidad de Silverado Ranch en el código postal 89123. Este es uno de los distritos suburbanos más orientados a la familia del valle, donde subdivisiones más nuevas, parques del vecindario y modernos centros comerciales bordean los corredores entre Eastern y el 215 Beltway. Los pacientes están a minutos del South Point Hotel and Casino, los distritos comerciales de St. Rose Parkway y las comunidades de Henderson y Green Valley justo al este. La zona ha crecido rápidamente hasta convertirse en un lugar codiciado por las familias atraídas por sus casas más nuevas, sus buenas escuelas y el fácil acceso por autopista tanto al Strip como a los centros de empleo del suroeste. La vida diaria gira en torno al cómodo comercio y la recreación que llenan el sur del valle, y la clínica encaja naturalmente en ese ritmo. Para los crecientes hogares de Enterprise y Silverado Ranch que quieren atención dental integral y bien ubicada sin conducir hacia el centro de la ciudad, esta clínica de South Eastern mantiene el tratamiento de calidad cerca de los suburbios que llaman hogar.",

  // Doctor bios (10)
  "Dr. Harrison Luu chose dentistry for the chance to make a direct, positive difference in people’s lives — relieving pain, restoring function, and improving smiles so patients feel better both physically and emotionally. A 2020 graduate of the UNLV School of Dental Medicine with six years in practice, he focuses on root canals and implants, and is a member of the American Dental Association. Knowing a dental visit can feel stressful, he works to create a calm, judgment-free environment where patients move at their own pace toward a healthy, confident smile. Originally from Southern California, he now lives in Las Vegas with his wife Tina, also a dentist, and their son Hudson. Outside the office he enjoys trying new restaurants and playing pool with friends.":
    "El Dr. Harrison Luu eligió la odontología por la oportunidad de marcar una diferencia directa y positiva en la vida de las personas — aliviando el dolor, restaurando la función y mejorando las sonrisas para que los pacientes se sientan mejor física y emocionalmente. Graduado en 2020 de la UNLV School of Dental Medicine con seis años de experiencia, se enfoca en endodoncias e implantes, y es miembro de la American Dental Association. Sabiendo que una visita al dentista puede resultar estresante, trabaja para crear un ambiente tranquilo y sin juicios donde los pacientes avanzan a su propio ritmo hacia una sonrisa sana y segura. Originario del sur de California, ahora vive en Las Vegas con su esposa Tina, también dentista, y su hijo Hudson. Fuera de la oficina disfruta probar nuevos restaurantes y jugar billar con amigos.",
  "Dr. Justin Wall became a dentist because he loves combining hands-on clinical work with building real relationships with the people he treats. A 2025 graduate of Roseman College of Dental Medicine, he is especially passionate about restorative dentistry, implants, and implant-supported dentures — helping patients get out of pain, rebuild function, and walk out feeling more like themselves. He is a member of the American Dental Association. Dr. Wall lives in Las Vegas, and when he is not at the office you will usually find him out on the golf course. What he loves most about working at Boca Dental & Braces is his team, whose dedication, positivity, and commitment to patients make coming to work rewarding every day — energy that carries straight through to how he cares for the people in his chair.":
    "El Dr. Justin Wall se hizo dentista porque le encanta combinar el trabajo clínico práctico con la construcción de relaciones reales con las personas que atiende. Graduado en 2025 del Roseman College of Dental Medicine, le apasiona especialmente la odontología restauradora, los implantes y las dentaduras sobre implantes — ayudando a los pacientes a salir del dolor, recuperar la función y marcharse sintiéndose más como ellos mismos. Es miembro de la American Dental Association. El Dr. Wall vive en Las Vegas y, cuando no está en la oficina, normalmente lo encontrarás en el campo de golf. Lo que más le gusta de trabajar en Boca Dental & Braces es su equipo, cuya dedicación, positividad y compromiso con los pacientes hacen que ir al trabajo sea gratificante cada día — una energía que se traslada directamente a cómo cuida a las personas en su silla.",
  "Minh chose dentistry out of a strong desire to help people improve their health and confidence — inspired by the example of their adoptive mom Sandra, a dental assistant of 37 years, whose meaningful relationships with patients made the path feel obvious. After earning a Bachelor of Science in Dental Hygiene from the College of Southern Nevada in 2015 (graduating with Honors, alongside an AA in Psychology), Minh has spent 11 years focused on periodontal care, patient education, and supporting people with dental anxiety so they feel genuinely comfortable in the chair. Minh is a member of the American Dental Hygienists’ Association. Originally from Vietnam and now living in Las Vegas, Minh enjoys traveling, exploring history, kayaking, and paddleboarding, and — at home — life with three dogs, family, and a fiancé with a talent for perfectly timed humor.":
    "Minh eligió la odontología por un fuerte deseo de ayudar a las personas a mejorar su salud y su confianza — inspirado por el ejemplo de su mamá adoptiva Sandra, asistente dental durante 37 años, cuyas relaciones significativas con los pacientes hicieron que el camino se sintiera evidente. Tras obtener una Licenciatura en Higiene Dental del College of Southern Nevada en 2015 (graduándose con Honores, junto con un AA en Psicología), Minh ha dedicado 11 años a la atención periodontal, la educación del paciente y el apoyo a personas con ansiedad dental para que se sientan genuinamente cómodas en la silla. Minh es miembro de la American Dental Hygienists' Association. Originario de Vietnam y ahora viviendo en Las Vegas, Minh disfruta viajar, explorar la historia, hacer kayak y paddleboard y — en casa — la vida con tres perros, la familia y un prometido con talento para el humor perfectamente oportuno.",
  "Dr. Johnson Fong became a dentist for one straightforward reason: he loves taking people out of pain. A 2023 graduate of the Tufts University School of Dental Medicine with three years in practice, his clinical focus is implant surgery, where he combines careful surgical technique with results patients can both see and feel. Originally from Boston, Dr. Fong now lives in Las Vegas, and unwinds with a good Netflix night. What he enjoys most about working at Boca Dental & Braces is the team around him, who make every day at the office a little better.":
    "El Dr. Johnson Fong se hizo dentista por una razón sencilla: le encanta sacar a las personas del dolor. Graduado en 2023 de la Tufts University School of Dental Medicine con tres años de experiencia, su enfoque clínico es la cirugía de implantes, donde combina una técnica quirúrgica cuidadosa con resultados que los pacientes pueden ver y sentir. Originario de Boston, el Dr. Fong ahora vive en Las Vegas y se relaja con una buena noche de Netflix. Lo que más disfruta de trabajar en Boca Dental & Braces es el equipo a su alrededor, que hace que cada día en la oficina sea un poco mejor.",
  "Dr. Michael St. Laurent chose dentistry because he wanted to help people feel better, smile bigger, and live more confidently. A graduate of the UNLV School of Dental Medicine with five years in practice, he focuses on oral surgery, implants, and sedation dentistry, and takes the time to understand each patient’s needs before building a personalized treatment plan. His goal is simple: every patient should leave feeling comfortable, cared for, and confident in their smile. He is a member of the American Dental Association and the Academy of General Dentistry. Dr. St. Laurent grew up in Oceanside, California and now lives in Las Vegas. Outside the office he loves spending time with his five-year-old son, hiking, and staying active in the gym — plus two dogs, a maltipoo named Lulu and a shih tzu named Charlie, who keep things lively at home.":
    "El Dr. Michael St. Laurent eligió la odontología porque quería ayudar a las personas a sentirse mejor, sonreír más y vivir con más confianza. Graduado de la UNLV School of Dental Medicine con cinco años de experiencia, se enfoca en cirugía oral, implantes y odontología de sedación, y se toma el tiempo de entender las necesidades de cada paciente antes de elaborar un plan de tratamiento personalizado. Su meta es simple: cada paciente debe irse sintiéndose cómodo, atendido y seguro de su sonrisa. Es miembro de la American Dental Association y de la Academy of General Dentistry. El Dr. St. Laurent creció en Oceanside, California, y ahora vive en Las Vegas. Fuera de la oficina le encanta pasar tiempo con su hijo de cinco años, hacer senderismo y mantenerse activo en el gimnasio — además de dos perros, una maltipoo llamada Lulu y un shih tzu llamado Charlie, que mantienen las cosas animadas en casa.",
  "Dr. Brenden Marlin became a dentist to provide the same compassionate care that once made a difference in his own life, and his focus today is relieving patients’ pain so they can get back to feeling like themselves. A 2025 graduate of the UNLV School of Dental Medicine, he is affiliated with the American Academy of Implant Dentistry and is Invisalign trained. He thinks of himself as a “Super GP,” practicing across all aspects of dentistry — from general care to endodontics, orthodontics, and surgery — which means patients can address more of their needs under one familiar roof. He is a member of the American Dental Association. Originally from Tampa, Florida, Dr. Marlin now lives in southwest Las Vegas, and brings the same energy and curiosity from snowboarding, hiking, and weightlifting into how he approaches his work.":
    "El Dr. Brenden Marlin se hizo dentista para brindar la misma atención compasiva que una vez marcó la diferencia en su propia vida, y su enfoque hoy es aliviar el dolor de los pacientes para que puedan volver a sentirse ellos mismos. Graduado en 2025 de la UNLV School of Dental Medicine, está afiliado a la American Academy of Implant Dentistry y tiene formación en Invisalign. Se considera un “Súper GP”, ejerciendo en todos los aspectos de la odontología — desde la atención general hasta la endodoncia, la ortodoncia y la cirugía — lo que significa que los pacientes pueden atender más de sus necesidades bajo un mismo techo de confianza. Es miembro de la American Dental Association. Originario de Tampa, Florida, el Dr. Marlin ahora vive en el suroeste de Las Vegas, y aporta la misma energía y curiosidad del snowboard, el senderismo y el levantamiento de pesas a su forma de abordar el trabajo.",
  "Dr. Charles Calder is an oral and maxillofacial surgeon who has spent 25 years helping patients get the care they need. He earned his DDS from the Loma Linda University School of Dentistry in 2000, followed by his MD in 2003 and completion of his Oral and Maxillofacial Surgery residency in 2006. His practice focuses on extractions, dental implants, bone grafting, and pathology, and he brings the kind of steady, experienced hand that puts patients at ease — especially when surgery feels intimidating. Dr. Calder is a member of the American Association of Oral and Maxillofacial Surgeons and was inducted into the OKU dental honor society in recognition of his academic achievement. A California native who now lives in Las Vegas, he enjoys cooking and spending time with family and friends.":
    "El Dr. Charles Calder es un cirujano oral y maxilofacial que ha dedicado 25 años a ayudar a los pacientes a recibir la atención que necesitan. Obtuvo su DDS de la Loma Linda University School of Dentistry en 2000, seguido de su MD en 2003 y la finalización de su residencia en Cirugía Oral y Maxilofacial en 2006. Su práctica se centra en extracciones, implantes dentales, injertos óseos y patología, y aporta esa mano firme y experimentada que tranquiliza a los pacientes — especialmente cuando la cirugía resulta intimidante. El Dr. Calder es miembro de la American Association of Oral and Maxillofacial Surgeons y fue admitido en la sociedad de honor dental OKU en reconocimiento a su logro académico. Nativo de California que ahora vive en Las Vegas, disfruta cocinar y pasar tiempo con familia y amigos.",
  "Dr. James Yun chose dentistry because it lets him combine science, problem-solving, and hands-on care while building real relationships with patients. A 2024 graduate of New York University with two years in practice, he is Invisalign trained and especially passionate about restorative dentistry and Invisalign treatment. His approach is personalized and conservative, focused on natural-looking, long-lasting results that improve both how a smile works and how a patient feels about it. He is a member of the American Dental Association and the Academy of General Dentistry, and a recipient of the President’s Volunteer Service Award. Born in Korea and raised in New York City, Dr. Yun recently moved to Las Vegas and is excited to put down roots. When he is not at the office, you will find him snowboarding, hiking, or recharging outdoors.":
    "El Dr. James Yun eligió la odontología porque le permite combinar la ciencia, la resolución de problemas y la atención práctica mientras construye relaciones reales con los pacientes. Graduado en 2024 de la New York University con dos años de experiencia, tiene formación en Invisalign y le apasiona especialmente la odontología restauradora y el tratamiento con Invisalign. Su enfoque es personalizado y conservador, centrado en resultados naturales y duraderos que mejoran tanto el funcionamiento de la sonrisa como cómo se siente el paciente con ella. Es miembro de la American Dental Association y de la Academy of General Dentistry, y recibió el President's Volunteer Service Award. Nacido en Corea y criado en la ciudad de Nueva York, el Dr. Yun se mudó recientemente a Las Vegas y está emocionado de echar raíces. Cuando no está en la oficina, lo encontrarás haciendo snowboard, senderismo o recargando energías al aire libre.",
  "Dr. Kathy Gonzales has spent her entire adult life in dentistry. She started as a dental assistant at 18, worked as a dental hygienist for nearly two decades, and then returned to school to become a dentist once her children were older, earning her degree from UNLV. For her, dentistry is the perfect intersection of art, science, and service. She has completed 300 hours of the AAID MaxiCourse in Implant Dentistry, and her practice focuses on cosmetic and implant work. She is a member of the American Dental Association and the American Academy of Implant Dentistry. Originally from the Philippines and now living in Las Vegas, Dr. Gonzales enjoys sketching, painting, piano, guitar, traveling, hiking, biking, cooking, and baking. She loves bringing laughter into the office and believes a trip to the dentist should feel positive — especially for anxious patients who just need a little reassurance to relax.":
    "La Dra. Kathy Gonzales ha dedicado toda su vida adulta a la odontología. Comenzó como asistente dental a los 18 años, trabajó como higienista dental durante casi dos décadas y luego regresó a la escuela para convertirse en dentista una vez que sus hijos eran mayores, obteniendo su título de UNLV. Para ella, la odontología es la intersección perfecta entre arte, ciencia y servicio. Ha completado 300 horas del AAID MaxiCourse en Odontología de Implantes, y su práctica se centra en el trabajo cosmético y de implantes. Es miembro de la American Dental Association y de la American Academy of Implant Dentistry. Originaria de Filipinas y ahora viviendo en Las Vegas, a la Dra. Gonzales le gusta dibujar, pintar, el piano, la guitarra, viajar, hacer senderismo, andar en bicicleta, cocinar y hornear. Le encanta llevar risas a la oficina y cree que una visita al dentista debe sentirse positiva — especialmente para los pacientes ansiosos que solo necesitan un poco de tranquilidad para relajarse.",
  "Dr. Cole Thompson became a dentist because he wanted a career where he could genuinely make a difference in people’s lives — and helping patients walk out feeling more confident about their smile is what he loves most about the job. A 2024 graduate of Roseman University, he focuses on implants and crowns, and takes pride in creating a comfortable, welcoming experience for every patient in his chair. He is a member of the American Dental Association and the Academy of General Dentistry. Originally from the Bay Area, Dr. Thompson now calls Las Vegas home, where he lives with his wife and two sons. When he is not at the office, he is usually on the golf course, out for a run, in the gym, or catching a game with his family.":
    "El Dr. Cole Thompson se hizo dentista porque quería una carrera en la que pudiera marcar una verdadera diferencia en la vida de las personas — y ayudar a los pacientes a salir sintiéndose más seguros de su sonrisa es lo que más le gusta de su trabajo. Graduado en 2024 de Roseman University, se enfoca en implantes y coronas, y se enorgullece de crear una experiencia cómoda y acogedora para cada paciente en su silla. Es miembro de la American Dental Association y de la Academy of General Dentistry. Originario del Área de la Bahía, el Dr. Thompson ahora llama hogar a Las Vegas, donde vive con su esposa y dos hijos. Cuando no está en la oficina, suele estar en el campo de golf, salir a correr, en el gimnasio o viendo un partido con su familia.",

  // Dr. Dannels bio (multi-paragraph)
  "Dr. Wyatt Dannels graduated from the USC dental program in 2013 and has spent the past 13 years building a career rooted in compassion, accessibility, and life changing care. His path into dentistry began at age 14, after an accident left him with eight broken teeth. That experience gave him a firsthand understanding of how deeply dental problems can affect a person, not only physically, but emotionally and financially as well. It shaped his belief that dentistry should be delivered with empathy, especially for patients who feel embarrassed, fearful, or overwhelmed.\n\nDr. Dannels is most passionate about implant dentistry and full mouth rehabilitation, a focus that grew out of his own life experiences. In 2012, he was diagnosed with a cancer that required a below the knee amputation, and in 2015 he traveled to Australia for a groundbreaking procedure in which implants were placed directly into his tibial bone. That procedure restored his stability, mobility, and confidence in ways he never thought possible, and it transformed the direction of his career. Having lived the impact of implant technology himself, he is uniquely able to connect with patients who feel hopeless about their oral health, including those with failing or missing teeth, severe wear, or ill fitting dentures.\n\nHe also loves cosmetic and restorative dentistry, particularly crowns and Invisalign, where he gets to watch a patient's smile, and confidence, completely transform. For Dr. Dannels, the goal is never simply to fix teeth. It is to restore comfort, function, confidence, and quality of life for every person he treats.\n\nAs the founder and CEO of Boca Dental and Braces, Dr. Dannels built the practice around a clear mission: to expand access to quality, affordable dental care in Las Vegas communities that have long been underserved. He is especially proud that Boca has become a leading provider for Medicaid and Liberty Dental patients, reflecting a commitment to serving families who are often overlooked. He serves on the Liberty Dental board and is a member of the Academy of General Dentistry, and he envisions Boca as the \"Chick fil A of dentistry,\" known for exceptional care, consistency, and genuine warmth.\n\nOriginally from Arizona, Dr. Dannels now calls Las Vegas home. He is bilingual in Spanish, a skill he developed while serving a two year mission in Mexico beginning in 2000, and connecting with the Hispanic community has remained important to him both personally and professionally. Outside the office, he is an avid golfer and a passionate sports card collector. Most importantly, he is a husband and father. He has been married for 20 years and has four children, including an oldest son currently serving a church mission in Chile.":
    "El Dr. Wyatt Dannels se graduó del programa de odontología de USC en 2013 y ha pasado los últimos 13 años construyendo una carrera arraigada en la compasión, la accesibilidad y la atención que cambia vidas. Su camino hacia la odontología comenzó a los 14 años, después de que un accidente le dejara ocho dientes rotos. Esa experiencia le dio una comprensión de primera mano de cuán profundamente los problemas dentales pueden afectar a una persona, no solo física, sino también emocional y económicamente. Eso formó su creencia de que la odontología debe brindarse con empatía, especialmente para los pacientes que se sienten avergonzados, temerosos o abrumados.\n\nAl Dr. Dannels le apasiona sobre todo la odontología de implantes y la rehabilitación bucal completa, un enfoque que surgió de sus propias experiencias de vida. En 2012, le diagnosticaron un cáncer que requirió una amputación por debajo de la rodilla, y en 2015 viajó a Australia para un procedimiento innovador en el que se colocaron implantes directamente en su hueso tibial. Ese procedimiento le devolvió la estabilidad, la movilidad y la confianza de maneras que nunca creyó posibles, y transformó el rumbo de su carrera. Habiendo vivido él mismo el impacto de la tecnología de implantes, tiene una capacidad única para conectar con los pacientes que se sienten sin esperanza respecto a su salud bucal, incluidos aquellos con dientes deteriorados o faltantes, desgaste severo o dentaduras mal ajustadas.\n\nTambién le encanta la odontología cosmética y restauradora, en particular las coronas e Invisalign, donde puede ver cómo la sonrisa, y la confianza, de un paciente se transforman por completo. Para el Dr. Dannels, el objetivo nunca es simplemente arreglar dientes. Es restaurar la comodidad, la función, la confianza y la calidad de vida de cada persona que atiende.\n\nComo fundador y director ejecutivo de Boca Dental and Braces, el Dr. Dannels construyó la práctica en torno a una misión clara: ampliar el acceso a una atención dental de calidad y asequible en las comunidades de Las Vegas que durante mucho tiempo han estado desatendidas. Se enorgullece especialmente de que Boca se haya convertido en un proveedor líder para pacientes de Medicaid y Liberty Dental, lo que refleja un compromiso de servir a familias que a menudo son pasadas por alto. Forma parte de la junta de Liberty Dental y es miembro de la Academy of General Dentistry, y visualiza a Boca como el “Chick-fil-A de la odontología”, conocido por una atención excepcional, la consistencia y una calidez genuina.\n\nOriginario de Arizona, el Dr. Dannels ahora considera a Las Vegas su hogar. Es bilingüe en español, una habilidad que desarrolló mientras servía una misión de dos años en México a partir del año 2000, y conectar con la comunidad hispana ha seguido siendo importante para él tanto personal como profesionalmente. Fuera de la oficina, es un ávido golfista y un apasionado coleccionista de tarjetas deportivas. Y lo más importante, es esposo y padre. Ha estado casado durante 20 años y tiene cuatro hijos, incluido un hijo mayor que actualmente sirve una misión de la iglesia en Chile.",
}
