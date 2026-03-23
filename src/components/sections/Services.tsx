"use client";
import ServiceIcon from "../services/ServiceIcon";
import BrandingIcon from "../services/icons/BrandingIcon";
import WebDesignIcon from "../services/icons/WebDesignIcon";
import MarketingIcon from "../services/icons/MarketingIcon";
import SocialMediaIcon from "../services/icons/SocialMediaIcon";
import SeoIcon from "../services/icons/SeoIcon";
import MediaIcon from "../services/icons/MediaIcon";
import PublicityIcon from "../services/icons/PublicityIcon";
import StrategyIcon from "../services/icons/StrategyIcon";
const iconServices = [
  { icon: BrandingIcon, label: "Branding" },
  { icon: WebDesignIcon, label: "Diseño Web" },
  { icon: MarketingIcon, label: "Marketing" },
  { icon: SocialMediaIcon, label: "Social Media" },
];

export default function ServicesSection() {
  return (
    <section className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Lo que hacemos</h2>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-full md:col-span-4 m-0 p-0 relative">
            <div className="icons-grid">
              {iconServices.map((service, i) => (
                <ServiceIcon
                  key={i}
                  Icon={service.icon}
                  label={service.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}