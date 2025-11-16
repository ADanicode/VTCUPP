import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

export default function Edit() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Perfil de Estudiante" />

            <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-900">
                <div className="mx-auto space-y-6 max-w-7xl">
                    <div className="p-4 bg-white border-t-4 border-purple-600 shadow-xl sm:p-8 dark:bg-zinc-800 rounded-xl">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Datos Personales (Solo Lectura)</h2>
                        
                        <div className="space-y-4">
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                <strong className="block text-sm font-semibold text-purple-600">Nombre Completo:</strong> 
                                {auth.user.name}
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                <strong className="block text-sm font-semibold text-purple-600">Matrícula:</strong> 
                                {auth.user.matricula}
                            </p>
                            
                            <p className="pt-4 mt-6 text-sm text-red-500 border-t border-gray-200 dark:border-zinc-700">
                                *Nota: Estos datos son gestionados por la administración de la UPP y no pueden ser modificados por el estudiante.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}