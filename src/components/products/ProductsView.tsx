import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { sound } from '../../utils/sound';
import { ServiceDetailModal, type TadbeerService } from '../modals/ServiceDetailModal';

export const TADBEER_SERVICES: TadbeerService[] = [
  {
    id: 'srv-01',
    name: 'Enterprise ERP & Core Systems',
    nameArabic: 'حلول تخطيط الموارد للمؤسسات',
    category: 'ERP & Software',
    tagline: 'Custom Enterprise Resource Planning tailored for Omani & GCC corporate operations',
    description:
      'Eliminate disconnected tools and manual paper trails. We build unified ERP systems that manage inventory across multiple branches, connect directly to factory scales and barcode scanners, automate supplier procurement, and instantly generate XML e-Invoices compliant with the Oman Tax Authority (OTA).',
    priceAmount: 1450,
    priceUnit: 'month',
    setupFee: 3500,
    status: 'Active',
    deliverables: [
      'Multi-warehouse real-time inventory synchronization',
      'Oman VAT & Tax Authority (OTA) certified e-Invoicing connector',
      'Automated purchase order & supplier quotation workflows',
      'Point of Sale (POS) with offline-first local cache',
      'Bilingual Arabic/English double-entry financial ledger',
    ],
    timeline: '3 - 5 weeks turn-key rollout',
    activeDeployments: 18,
    referenceClients: ['Al Harrasi Rope Factory', 'Mafran Meat & Livestock', 'Sultanate of Marble'],
    techStack: ['PostgreSQL', 'Node.js', 'React', 'Oman OTA XML Gateway'],
  },
  {
    id: 'srv-02',
    name: 'Enterprise AI & Intelligent Business Automation',
    nameArabic: 'تقنيات الذكاء الاصطناعي وأتمتة العمليات',
    category: 'AI Technology',
    tagline: 'Practical bilingual AI models and autonomous workflow agents built for enterprise scale',
    description:
      'Turn repetitive manual tasks into instant automated actions. We train and deploy bilingual Arabic/English document OCR to parse commercial invoices and customs declarations, build 24/7 intelligent customer agents, and deliver predictive machine learning for demand forecasting.',
    priceAmount: 1200,
    priceUnit: 'month',
    setupFee: 2800,
    status: 'Active',
    deliverables: [
      'Arabic & English intelligent invoice and document OCR extraction',
      'Autonomous customer communication agents (WhatsApp & Web)',
      'Predictive inventory demand forecasting algorithms',
      'Automated contract analysis & legal clause checking',
      'Private, on-premise sovereign LLM deployment options',
    ],
    timeline: '2-week rapid sprint',
    activeDeployments: 12,
    referenceClients: ['Oman Vision 2040 Unit', 'Oman Air Digital Hub'],
    techStack: ['Python', 'OpenAI Enterprise', 'LangChain', 'Sovereign PyTorch Cluster'],
  },
  {
    id: 'srv-03',
    name: 'Custom Software & Web Application Engineering',
    nameArabic: 'هندسة البرمجيات والتطبيقات المخصصة',
    category: 'ERP & Software',
    tagline: 'Mission-critical custom applications and web portals engineered for your unique workflow',
    description:
      'When off-the-shelf software falls short, our Muscat engineering team crafts custom web portals, customer mobile apps, and secure high-throughput REST/GraphQL APIs with zero bloat and lightning fast speed. Engineered specifically for regional business models and multi-branch operations.',
    priceAmount: 3800,
    priceUnit: 'milestone + SLA',
    status: 'Deployment Sprint',
    deliverables: [
      'Modern, responsive web applications built with Next.js & React',
      'High-throughput microservices architecture with Redis caching',
      'Bespoke client self-service portals and mobile dashboards',
      'Real-time bidirectional WebSockets for low-latency live telemetry',
      'Full CI/CD automated pipeline with test coverage guarantees',
    ],
    timeline: '4 - 8 weeks delivery',
    activeDeployments: 24,
    referenceClients: ['Oman Air', 'AMEC Al Musharfi Engineering'],
    techStack: ['TypeScript', 'Next.js', 'Tailwind', 'Docker', 'Kubernetes'],
  },
  {
    id: 'srv-04',
    name: 'Digital Marketing & Growth Engine',
    nameArabic: 'محرك التسويق الرقمي ونمو المبيعات',
    category: 'Digital Marketing',
    tagline: 'Data-driven B2B customer acquisition and omnichannel brand engineering across GCC',
    description:
      'Stop guessing your return on ad spend. We build high-converting growth engines for Omani and regional brands, combining localized Google SEO dominance, performance acquisition campaigns, corporate storytelling, and lead generation funnels that reliably book enterprise deals.',
    priceAmount: 850,
    priceUnit: 'sprint',
    status: 'Enterprise Retainer',
    deliverables: [
      'Qualified B2B enterprise lead generation and funnel management',
      'Oman & GCC regional Search Engine Optimization (SEO)',
      'Precision paid performance campaigns across Meta, Google & LinkedIn',
      'High-converting Arabic & English copywriting and brand positioning',
      'Full-funnel attribution analytics and CAC/LTV reporting',
    ],
    timeline: 'Ongoing monthly growth sprint',
    activeDeployments: 15,
    referenceClients: ["Gloria Jean's Coffees Oman", 'Atiin Omani Heritage', 'Al Qurum Perfumes'],
    techStack: ['Google Ads', 'Meta Business', 'Semrush', 'GA4 Enterprise'],
  },
  {
    id: 'srv-05',
    name: 'Human Capital & Omanization Consulting',
    nameArabic: 'استشارات رأس المال البشري والتعمين',
    category: 'Human Capital',
    tagline: 'Strategic workforce management, tech talent acquisition, and Ministry of Labour compliance',
    description:
      'Attract and retain top-tier talent while staying 100% compliant with Omani labor regulations. We handle strategic tech recruitment, executive search, automated Wages Protection System (WPS) payroll integration, and proactive Omanization quota planning.',
    priceAmount: 950,
    priceUnit: 'month',
    status: 'Active',
    deliverables: [
      'Omanization quota planning & Ministry of Labour compliance audits',
      'Automated Omani WPS (Wages Protection System) payroll calculation',
      'Specialized tech recruitment & executive headhunting',
      'Corporate performance management & OKR tracking systems',
      'Employee onboarding digital workflows and contract generation',
    ],
    timeline: 'Immediate onboarding & setup',
    activeDeployments: 10,
    referenceClients: ['Tameer Investments', 'Al Harrasi Rope Factory'],
    techStack: ['WPS Banking Gateway', 'Tadbeer HR Core', 'Ministry of Labour Portal'],
  },
  {
    id: 'srv-06',
    name: 'GCC Sovereign Cloud Infrastructure & DevOps',
    nameArabic: 'البنية التحتية السحابية السيادية والعمليات',
    category: 'ERP & Software',
    tagline: 'Secure, local cloud infrastructure compliant with Omani data residency regulations',
    description:
      'Protect your proprietary business data and meet the Sultanate’s Data Protection regulations. We host and manage isolated high-availability cloud clusters inside Equinix MC1 Muscat, complete with automated daily encrypted backups and zero-downtime failover.',
    priceAmount: 1100,
    priceUnit: 'month',
    status: 'Active',
    deliverables: [
      '99.99% Guaranteed uptime SLA with financial backing',
      'Muscat sovereign data residency compliance (Royal Decree 6/2022)',
      'Daily off-site encrypted disaster recovery replication to Salalah',
      'Automated DDoS mitigation and enterprise Web Application Firewall',
      '24/7 localized Oman response team for critical incidents',
    ],
    timeline: '48-hour cluster provisioning',
    activeDeployments: 32,
    referenceClients: ['Oman Air', 'Sultanate of Marble', 'Oman Vision 2040 Unit'],
    techStack: ['Equinix MC1', 'Kubernetes', 'Terraform', 'WireGuard VPN'],
  },
];

export const ProductsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<TadbeerService | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filtered = TADBEER_SERVICES.filter((srv) => {
    const matchesCat = selectedCategory === 'All' || srv.category === selectedCategory;
    const matchesSearch =
      srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.nameArabic.includes(searchQuery) ||
      srv.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenDetail = (service: TadbeerService) => {
    sound.playNav();
    setSelectedService(service);
    setIsDetailOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="page-container"
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            Services & Enterprise Solutions
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
            Official service offerings from Tadbeer Transformation Trading (tadbeertt.com) • Engineered for the Sultanate of Oman & GCC
          </p>
        </div>

        {/* Action Button & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--bg-surface)',
              padding: '6px 14px',
              borderRadius: 9999,
              border: '1px solid var(--border-light)',
              width: 260,
            }}
          >
            <Search size={14} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search services or capabilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: 12.5,
                color: 'var(--text-primary)',
                width: '100%',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <button
            onClick={() => handleOpenDetail(TADBEER_SERVICES[0])}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 16px',
              borderRadius: 9999,
              fontSize: 12.5,
              fontWeight: 700,
              background: 'var(--pill-active-bg)',
              color: 'var(--pill-active-text)',
              border: 'none',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <Plus size={15} />
            <span>Deploy Service</span>
          </button>
        </div>
      </div>

      {/* Category Pills Bar matching tadbeertt.com 4 Pillars */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 22, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
        {[
          { key: 'All', label: 'All Services (6)' },
          { key: 'ERP & Software', label: 'Software & ERP Systems' },
          { key: 'AI Technology', label: 'AI & Business Automation' },
          { key: 'Digital Marketing', label: 'Digital Marketing & Growth' },
          { key: 'Human Capital', label: 'Human Capital & Omanization' },
        ].map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => {
                setSelectedCategory(cat.key);
                sound.playFilter();
              }}
              style={{
                padding: '7px 16px',
                borderRadius: 9999,
                fontSize: 12.5,
                fontWeight: isActive ? 700 : 500,
                background: isActive ? 'var(--pill-active-bg)' : 'var(--bg-surface)',
                color: isActive ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Services Grid with Rich Glass Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: 20,
          minHeight: 'calc(100vh - 290px)',
        }}
      >
        {filtered.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: idx * 0.04 }}
            whileHover={{ y: -3 }}
            onClick={() => handleOpenDetail(service)}
            className="glass-card"
            style={{
              padding: '24px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 330,
              cursor: 'pointer',
              borderRadius: 20,
              border: '1px solid var(--border-light)',
              transition: 'border-color 0.2s ease, transform 0.2s ease',
            }}
          >
            <div>
              {/* Category & Arabic name row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '2px 9px',
                    borderRadius: 9999,
                    background: 'var(--bg-surface-subtle)',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {service.category}
                </span>

                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  {service.nameArabic}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.25 }}>
                {service.name}
              </h3>

              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 14 }}>
                {service.tagline}
              </p>

              {/* Key Deliverable Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
                {service.deliverables.slice(0, 3).map((d, dIdx) => (
                  <div key={dIdx} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                    <CheckCircle2 size={12} style={{ color: 'var(--accent-green-text)', flexShrink: 0 }} />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: OMR Pricing + Interactive Action */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                paddingTop: 14,
                borderTop: '1px dashed var(--border-light)',
              }}
            >
              <div>
                <div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Starting From
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  OMR {service.priceAmount.toLocaleString()}{' '}
                  <span style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--text-secondary)' }}>/ {service.priceUnit}</span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                <span>View Scope</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Service Detail & Pricing Scope Modal */}
      <ServiceDetailModal
        isOpen={isDetailOpen}
        service={selectedService}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedService(null);
        }}
      />
    </motion.div>
  );
};
