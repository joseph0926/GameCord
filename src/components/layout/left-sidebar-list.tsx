'use client';

import { SidebarLink } from '@/@types/custom';
import { sidebarLinks } from '@/lib/contants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

type PositionType = {
  top: number;
  width: string;
  height: number;
  left: number;
  opacity: number;
};

export function LeftSidebarList() {
  const [position, setPosition] = useState<PositionType>({
    top: 0,
    width: '10rem',
    height: 0,
    left: 0,
    opacity: 0
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0
        }));
      }}
      className="relative flex flex-col gap-11"
    >
      <List setPosition={setPosition} item={sidebarLinks[0]} />
      <List setPosition={setPosition} item={sidebarLinks[1]} />
      <List setPosition={setPosition} item={sidebarLinks[2]} />
      <List setPosition={setPosition} item={sidebarLinks[3]} />
      <Cursor position={position} />
    </ul>
  );
}

function List({
  item,
  setPosition
}: {
  item: SidebarLink;
  setPosition: Dispatch<SetStateAction<PositionType>>;
}) {
  const liRef = useRef<HTMLLIElement | null>(null);

  return (
    <li
      key={item.route}
      ref={liRef}
      onMouseEnter={() => {
        if (!liRef.current) return;

        const { height } = liRef.current.getBoundingClientRect();

        setPosition({
          top: liRef.current.offsetTop - 15,
          width: '10rem',
          height: height + 20,
          left: -30,
          opacity: 1
        });
      }}
      className="relative z-10"
    >
      <Link
        href={item.route}
        className="flex flex-col items-center gap-2.5 text-secondary"
      >
        {item.icon}
        <p>{item.label}</p>
      </Link>
    </li>
  );
}

function Cursor({ position }: { position: PositionType }) {
  return (
    <motion.li
      animate={{
        ...position
      }}
      className="size-7 md:size-12 absolute z-0 cursor-pointer rounded-full bg-white dark:bg-black"
    />
  );
}
