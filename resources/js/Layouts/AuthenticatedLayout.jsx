import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-zinc-900">
            {/* --- BARRA DE NAVEGACIÓN SUPERIOR (Simétrica) --- */}
            <nav className="bg-white border-b border-gray-200 shadow-md dark:bg-zinc-800 dark:border-zinc-700">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo y Nombre App */}
                        <div className="flex items-center">
                            <Link href={route('dashboard')} className="flex items-center space-x-2 text-xl font-bold text-purple-600 dark:text-purple-400">
                                {/* Puedes usar el ApplicationLogo aquí si quieres */}
                                <span>ViveTuCampusUPP</span>
                            </Link>
                        </div>

                        {/* Menú y Perfil */}
                        <div className="flex items-center space-x-4">
                            <Link 
                                href={route('dashboard')} 
                                className="text-sm font-medium text-gray-700 transition dark:text-gray-300 hover:text-purple-600"
                            >
                                Dashboard
                            </Link>
                            <Link 
                                href={route('profile.edit')} 
                                className="text-sm font-medium text-gray-700 transition dark:text-gray-300 hover:text-purple-600"
                            >
                                Perfil
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="px-3 py-1 text-sm font-medium text-white transition bg-red-600 rounded-full hover:bg-red-700"
                            >
                                Salir
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            
            {/* Contenido Principal */}
            <main>{children}</main>
        </div>
    );
}