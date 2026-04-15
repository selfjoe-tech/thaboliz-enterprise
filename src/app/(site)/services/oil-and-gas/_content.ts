export type OilGasPage = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  bullets?: string[];
};

export const OIL_GAS = {
  brand: "Thaboliz Oil & Gas",
  location: "Sandton, Johannesburg, South Africa",
  heroTitle: "World changing impact",
  heroSubtitle:
    "The world's dealmaking hub for oil and gas",
  ctaPrimary: "Request a partnership call",
  ctaSecondary: "Explore our services",
  executiveSummary:
    "Thabolize Oil and Gas is an emerging South African energy company headquartered in Sandton, Johannesburg. We are committed to sustainable energy solutions, fuel security, and economic transformation through innovation across the oil and gas value chain. As South Africa enters a pivotal era shaped by the Upstream Petroleum Resources Development Act (UPRDA) and a national shift toward gas-to-power initiatives, Thabolize Oil and Gas is positioned to bridge the gap between resource potential and market delivery.",
  mission: [
    { label: "Reliability", text: "Consistent, secure supply of petroleum products and energy services for industrial and commercial sectors." },
    { label: "Innovation", text: "Leverage technology and partnerships to optimize distribution and exploration readiness." },
    { label: "Transformation", text: "Champion B-BBEE and inclusive growth across the South African energy landscape." },
    { label: "Sustainability", text: "Operate with high environmental standards and support the transition to a lower-carbon economy." },
  ],
  vision:
    "To be a leading energy partner in the gloabl market, recognized for excellence in operational integrity, sustainable resource management, and the empowerment of communities.",
  sandtonAdvantages: [
    {
      title: "Proximity to Capital",
      text: "Direct access to financial institutions, venture capital, and investment banks essential for large-scale energy projects.",
    },
    {
      title: "Networking Hub",
      text: "Close to multinational energy firms, regulators, and specialist legal and technical advisors.",
    },
    {
      title: "Infrastructure",
      text: "World-class telecoms and transport links, including the Gautrain, enabling efficient domestic and international operations.",
    },
  ],
  compliance: [
    {
      title: "DMRE Alignment",
      text: "Compliance with the Petroleum Products Act and licensing requirements for wholesale and retail operations.",
      tag: "Licensing + governance",
    },
    {
      title: "PASA Engagement",
      text: "Engagement for upstream opportunities and access to technical data in support of future exploration participation.",
      tag: "Upstream readiness",
    },
    {
      title: "UPRDA (2026)",
      text: "Leveraging an evolving legislative environment aimed at investment certainty and streamlined licensing for petroleum rights.",
      tag: "Policy tailwind",
    },
    {
      title: "Transformation & B-BBEE",
      text: "Commitment to the Liquid Fuels Charter and B-BBEE Codes of Good Practice, including skills development and ESD initiatives.",
      tag: "Inclusive growth",
    },
  ],
  esg: [
    {
      title: "Natural Gas Focus",
      text: 'Prioritizing gas as a bridge fuel to support decarbonization while maintaining grid stability.',
    },
    {
      title: "Community Impact",
      text: "Investing in local socio-economic development in the areas where we operate.",
    },
    {
      title: "Environmental Stewardship",
      text: "Rigorous safety and environmental management systems to prevent spills and reduce carbon footprint.",
    },
  ],
  whyPartner: [
    {
      title: "Local Expertise",
      text: "Deep understanding of South Africa’s regulatory and socio-political environment.",
    },
    {
      title: "Strategic Agility",
      text: "Lean Sandton-based operation designed for fast decisions and market adaptability.",
    },
    {
      title: "Growth Roadmap",
      text: "Clear pathway from downstream distribution toward integrated energy solutions.",
    },
    {
      title: "Ethical Governance",
      text: "Integrity, transparency, and best-practice operating standards from day one.",
    },
  ],
  contact: {
    name: "Thabolize Oil and Gas",
    address: "[Insert Specific Sandton Address], Sandton, Johannesburg, South Africa",
    email: "[Insert Email Address]",
    phone: "[Insert Phone Number]",
    website: "[Insert Website URL]",
  },
};

export const OIL_GAS_SUBPAGES: OilGasPage[] = [
  {
    slug: "downstream",
    title: "Downstream",
    kicker: "Distribution, reliability, fuel security",
    summary:
      "Wholesale distribution of refined petroleum products (Diesel, Petrol, Jet Fuel, and LPG) to commercial, mining, and agricultural sectors.",
    bullets: [
      "Commercial supply agreements",
      "Multi-sector distribution planning",
      "Quality, traceability, and delivery governance",
    ],
  },
  {
    slug: "midstream",
    title: "Midstream",
    kicker: "Storage + logistics resilience",
    summary:
      "Strategic storage solutions and logistics management to strengthen supply chain resilience and minimize regional fuel shortages.",
    bullets: [
      "Storage strategy and utilization planning",
      "Logistics governance and contingency pathways",
      "Supplier coordination and demand smoothing",
    ],
  },
  {
    slug: "upstream",
    title: "Upstream (Future)",
    kicker: "UPRDA-enabled exploration participation",
    summary:
      "Identifying and participating in exploration opportunities enabled by the UPRDA framework, focusing on natural gas and offshore potential.",
    bullets: [
      "Data room readiness and technical engagement",
      "Partner-led execution for specialist scopes",
      "Licensing pathway preparation",
    ],
  },
  {
    slug: "energy-services",
    title: "Energy Consulting Services",
    kicker: "Systems, compliance, efficiency",
    summary:
      "Consulting on fuel management systems, regulatory compliance, and energy efficiency for industrial clients.",
    bullets: [
      "Fuel management process design",
      "Compliance documentation support",
      "Efficiency and consumption optimization support",
    ],
  },
  {
    slug: "regulatory",
    title: "Regulatory & Compliance",
    kicker: "A compliant foundation for scale",
    summary:
      "Regulatory alignment across DMRE licensing, PASA engagement, UPRDA readiness, and B-BBEE transformation requirements.",
  },
  {
    slug: "sustainability",
    title: "Sustainability & ESG",
    kicker: "Energy transition with accountability",
    summary:
      "Integrating ESG principles with a practical approach to gas-to-power support, safety, community impact, and environmental stewardship.",
  },
  {
    slug: "partnerships",
    title: "Partnerships",
    kicker: "Local capability, global standards",
    summary:
      "A partner-first model built on integrity, transparency, and strong execution pathways across the value chain.",
  },
];
