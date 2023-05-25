'use client';
import Image from 'next/image'
import Menu from "../components/Menu";
import ModuleCard from '@/components/Card';

export default function Home() {
  return (
    <>
          <Menu />

          <ModuleCard/>
    </>
  );
}
