"use client";

import {
  FacebookIcon,
  XIcon,
  LinkedinIcon,
  SlackIcon,
  GoogleIcon,
  WhatsAppIcon,
  IMessageIcon,
} from "@/components/SocialIcons";

export default function SupportedPlatforms() {
  const platforms = [
    { name: "WhatsApp", icon: <WhatsAppIcon size={16} /> },
    { name: "iMessage", icon: <IMessageIcon size={16} /> },
    { name: "Facebook", icon: <FacebookIcon size={16} /> },
    { name: "X (Twitter)", icon: <XIcon size={15} /> },
    { name: "LinkedIn", icon: <LinkedinIcon size={16} /> },
    { name: "Slack", icon: <SlackIcon size={16} /> },
    { name: "Google", icon: <GoogleIcon size={16} /> },
  ];

  return (
    <section
      id="supported-platforms"
      className="w-full py-5 sm:py-6 border-t border-b border-gray-200 dark:border-neutral-900 my-8 sm:my-10"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 flex-wrap">
        <span className="text-[11px] font-bold tracking-widest text-slate-400 dark:text-neutral-500 uppercase flex-shrink-0">
          SUPPORTED PLATFORMS
        </span>

        <div className="flex items-center justify-center flex-wrap gap-5 sm:gap-7 lg:gap-8">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {p.icon}
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
