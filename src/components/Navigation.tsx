'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface DropdownItem {
  href: string;
  label: string;
}

interface NavSection {
  label: string;
  items: DropdownItem[];
}

export default function Navigation() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const sections: NavSection[] = [
    {
      label: 'Naamvallen',
      items: [
        { href: '/overzicht', label: 'Overzicht' },
        { href: '/quiz', label: 'Quiz' },
      ],
    },
    {
      label: 'Werkwoorden',
      items: [
        { href: '/werkwoorden/overzicht', label: 'Overzicht' },
        { href: '/werkwoorden/quiz', label: 'Quiz' },
      ],
    },
  ];

  const isInSection = (section: NavSection) => {
    return section.items.some((item) => pathname === item.href);
  };

  return (
    <nav className="bg-primary text-white shadow-lg relative z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold tracking-wide">
            Latijn Leren
          </Link>
          <div className="flex gap-1 items-center">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                pathname === '/'
                  ? 'bg-white/20 font-semibold'
                  : 'hover:bg-white/10'
              }`}
            >
              Home
            </Link>

            {sections.map((section) => (
              <div
                key={section.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(section.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                    isInSection(section)
                      ? 'bg-white/20 font-semibold'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {section.label}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      openDropdown === section.label ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openDropdown === section.label && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl py-2 min-w-[160px] text-foreground">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-2 transition-colors ${
                          pathname === item.href
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'hover:bg-primary/5'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
