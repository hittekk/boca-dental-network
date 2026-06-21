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
}
