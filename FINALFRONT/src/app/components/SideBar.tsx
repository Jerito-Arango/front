'use client';

import Link from 'next/link';

export function SideBar() {
  return (
    <nav className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">GlammGiannt</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/" className="hover:underline block">Inicio</Link>
        </li>
        <li>
          <Link href="/makeup" className="hover:underline block">Productos de Maquillaje</Link>
        </li>
        <li>
          <Link href="/product-test" className="hover:underline block">Pruebas de Productos</Link>
        </li>
      </ul>
    </nav>
  );
}