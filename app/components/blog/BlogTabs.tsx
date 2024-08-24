'use client';
import React, { useEffect, useState } from 'react';
import FiatCryptoButton from '../table/FiatCryptoButton';
import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import FloatingButtons from '../FloatingButtons';

const categories: FloatingButtonsItems = [
  { label: 'Slots', value: 'slots', id: '0', width: 'w-28' },
  { label: 'Casinos', value: 'casinos', id: '0', width: 'w-28' },
  { label: 'Providers', value: 'providers', id: '0', width: 'w-28' },
  { label: 'News', value: 'news', id: '0', width: 'w-28' },
  { label: 'Education', value: 'education', id: '0', width: 'w-28' },
];

export default function BlogTabs({
  ActiveCategory,
}: {
  ActiveCategory: string;
}) {
  const [selected, setSelected] = useState(categories[0]);
  const [scrolled, setScrolled] = useState(0);

  const select = (v: any) => {
    // setSelected(v);
    // onChange(v.value);
  };

  useEffect(() => {
    const index = categories.findIndex((x) => x.value === ActiveCategory);
    if (index === -1) {
      setSelected(categories[0]);
    } else {
      setSelected(categories[index]);
    }
  }, []);

  const listenScrollEvent = () => {
    setScrolled(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  }, []);

  return (
    <>
      <div
        className={`transition-all duration-300 flex justify-between w-full flex-wrap items-center gap-y-2 ${
          scrolled > 200 && 'fixed top-3 z-10 px-2 left-0 right-0 md:hidden'
        } md:flex-none md:w-auto`}
      >
        {categories.map((category) => (
          <Link key={category.value} href={`/blog/${category.value}`}>
            <FiatCryptoButton
              title={category.label}
              active={ActiveCategory === category.value}
              click={(e: { stopPropagation: () => any }) => e.stopPropagation()}
              className={'py-2 text-xs md:ml-3 md:py-3 md:text-base'}
            />
          </Link>
        ))}
      </div>
      {/* <FloatingButtons selected={selected} items={categories} /> */}
    </>
  );
}
