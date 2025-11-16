import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';

// Componente Tarjeta base
const Card = ({ title, children, className = '' }) => (
    <div className={`p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border-t-4 border-purple-600 ${className}`}>
        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
        {children}
    </div>
);

// Componente para la actividad disponible (CORREGIDO: Muestra Imagen)
const AvailableActivityCard = ({ activity }) => {
    const handleEnroll = (e) => {
        // Muestra un diálogo de confirmación antes de inscribirse
        if (!confirm(`¿Estás seguro de que quieres inscribirte a la actividad "${activity.name}"?`)) {
            e.preventDefault(); 
        }
    };

    const imageUrl = activity.image_url || '/images/default_activity.jpg';

    return (
        // Estructura adaptada para verse bien en una rejilla de 2 columnas en móvil/tablet
        <div className="flex flex-col overflow-hidden transition-shadow duration-300 bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-zinc-700 dark:border-zinc-700">
            
            {/* CORRECCIÓN: Fondo dinámico con URL de imagen */}
            <div 
                className="flex items-center justify-center w-full h-32 bg-center bg-cover" 
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                <span className="z-10 p-1 text-sm font-semibold text-white bg-black rounded-sm bg-opacity-40">
                    {activity.name}
                </span>
            </div> 

            <div className="w-full p-4">
                <h4 className="text-lg font-bold text-purple-600 truncate dark:text-purple-400">{activity.name}</h4>
                
                <div className="flex flex-col mt-3 space-y-2">
                    {/* Botón de Inscripción con confirmación */}
                    <Link
                        href={route('activities.enroll', activity.id)}
                        method="post"
                        as="button"
                        onClick={handleEnroll}
                        className="w-full px-4 py-2 text-sm font-semibold text-white transition duration-300 transform bg-purple-600 rounded-lg hover:bg-purple-700 hover:scale-[1.01]"
                    >
                        Inscribirme
                    </Link>
                    
                    {/* Botón de Ubicación */}
                    <a 
                        href={activity.google_maps_url} 
                        target="_blank" 
                        className="w-full px-4 py-2 text-sm font-medium text-center text-blue-500 transition border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
                    >
                        Ver Detalles 📍
                    </a>
                </div>
            </div>
        </div>
    );
};


// Componente para la actividad INSCRITA (Sin cambios, ya funcionaba)
const EnrolledActivityCard = ({ activity }) => {
    const handleUnenroll = (e) => {
        if (!confirm(`¡ADVERTENCIA! Estás a punto de darte de baja de la actividad "${activity.name}". ¿Deseas continuar?`)) {
            e.preventDefault(); 
        }
    };
    
    const imageUrl = activity.image_url || '/images/default_activity.jpg';


    return (
        <div className="overflow-hidden transition-shadow border border-purple-300 rounded-lg shadow-md bg-gray-50 dark:bg-zinc-700 hover:shadow-xl dark:border-purple-800">
            
            {/* Encabezado y Horario (Responsivo: pasa de fila a apilado) */}
            <div className="flex flex-col items-start justify-between p-4 border-b border-purple-200 sm:flex-row sm:items-center bg-purple-50 dark:bg-zinc-600 dark:border-purple-700">
                <div>
                    <p className="text-xl font-extrabold text-purple-800 dark:text-purple-300">{activity.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Profesor: {activity.professor_name}</p>
                </div>
                <span className="mt-2 text-lg font-bold text-purple-600 dark:text-purple-400 sm:mt-0">
                    {activity.schedule_details}
                </span>
            </div>

            {/* Detalles de la Actividad y Botones (Grid Responsivo) */}
            <div className="grid items-center grid-cols-1 gap-4 p-4 md:grid-cols-3">
                
                {/* 1. Imagen/Placeholder Clickeable a Ubicación */}
                <a 
                    href={activity.google_maps_url} 
                    target="_blank" 
                    className="md:col-span-1 block relative overflow-hidden group transition-transform transform hover:scale-[1.02] rounded-md"
                >
                    {/* Fondo dinámico y efecto hover */}
                    <div 
                        className="flex items-center justify-center h-20 text-xs text-white bg-center bg-cover rounded-md" 
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    >
                        <span className="z-10 p-1 transition-opacity bg-black bg-opacity-50 rounded-sm group-hover:bg-opacity-0">
                            VER MAPA 🗺️
                        </span>
                        <div className="absolute inset-0 transition-opacity duration-300 bg-blue-500 rounded-md opacity-0 group-hover:opacity-30"></div>
                    </div>
                </a>

                {/* 2. Información Clave (Responsivo: Ocupa 1/3) */}
                <div className="space-y-1 text-sm md:col-span-1">
                    <p className="text-gray-700 truncate dark:text-gray-300">
                        <strong className="font-semibold">Ubicación:</strong> {activity.location}
                    </p>
                    <p className="text-gray-700 truncate dark:text-gray-300">
                        <strong className="font-semibold">Contacto:</strong> {activity.professor_email}
                    </p>
                </div>

                {/* 3. Botón de Baja (Responsivo: Ocupa 1/3) */}
                <div className="flex flex-col space-y-2 md:col-span-1">
                    <Link
                        href={route('activities.unenroll', activity.id)}
                        method="post"
                        as="button"
                        onClick={handleUnenroll}
                        className="w-full px-4 py-2 text-sm font-medium text-center text-white transition bg-red-600 rounded-md hover:bg-red-700"
                    >
                        Darse de Baja 🚫
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default function Dashboard({ user, myActivities, availableActivities }) {
    
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            
            <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-900">
                <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl lg:grid-cols-3">
                    
                    {/* Columna Principal y Horarios */}
                    <div className="space-y-8 lg:col-span-2">
                        
                        {/* Mensaje Flash (Éxito o Error) */}
                        {flash && (flash.success || flash.error) && (
                            <div className={`px-4 py-3 rounded-lg shadow-md ${flash.success ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`} role="alert">
                                <strong className="font-bold">{flash.success ? '¡Éxito! ' : '¡Error! '}</strong>
                                <span className="block sm:inline">{flash.success || flash.error}</span>
                            </div>
                        )}

                        {/* Tarjeta de Bienvenida Estilizada */}
                        <div className="p-6 text-white bg-purple-600 shadow-xl rounded-xl">
                            <h2 className="text-3xl font-extrabold">¡Hola, {user.name.split(' ')[0]}!</h2>
                            <p className="mt-1 font-medium text-purple-200">Matrícula: {user.matricula}</p>
                            <p className="mt-4 text-sm font-medium">Desarrollo Integral, UPP</p>
                        </div>

                        {/* Mi Horario Personalizado (Actividades Inscritas) */}
                        <Card title="Mi Horario Personalizado">
                            {myActivities.length > 0 ? (
                                <div className="space-y-4">
                                    {myActivities.map(activity => (
                                        <EnrolledActivityCard key={activity.id} activity={activity} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">Aún no tienes actividades inscritas. ¡Revisa las opciones disponibles!</p>
                            )}
                        </Card>
                    </div>

                    {/* Columna Derecha (Actividades Disponibles) */}
                    <div className="space-y-8 lg:col-span-1">
                        <Card title="Explora e Inscríbete" className="h-full">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
                                {availableActivities.map(activity => (
                                    <AvailableActivityCard key={activity.id} activity={activity} />
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}