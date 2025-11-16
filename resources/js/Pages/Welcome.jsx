import React from 'react';
import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth }) {
    // Nota: El botón de registro está oculto ya que las matrículas están pre-cargadas.
    
    return (
        <>
            <Head title="ViveTuCampusUPP" />

            <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12 overflow-hidden text-white sm:px-6 lg:px-8 bg-gradient-to-br from-violet-900 to-indigo-900">

                {/* --- Contenido Principal (Título y Botones) --- */}
                <div className="relative z-20 flex flex-col items-center justify-center text-center">
                    <Link href="/">
                        {/* Asegúrate de que ApplicationLogo renderice el logo de la UPP */}
                        <ApplicationLogo className="w-24 h-24 transition-transform duration-500 transform sm:w-32 sm:h-32 hover:rotate-6" />
                    </Link>
                    <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-7xl">
                        Vive Tu Campus UPP
                    </h1>
                    <p className="max-w-2xl mt-4 text-lg font-light leading-relaxed text-gray-300 sm:text-xl">
                        Descubre, inscríbete y participa en un universo de actividades que te conectan con la vida universitaria. Explora y haz de tu experiencia académica algo inolvidable.
                    </p>
                    
                    <div className="flex justify-center mt-8">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="px-8 py-3 text-lg font-medium text-white transition duration-300 transform bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 hover:scale-105">
                                Ir al Dashboard
                            </Link>
                        ) : (
                            <Link href={route('login')} className="px-8 py-3 text-lg font-medium text-white transition duration-300 transform bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 hover:scale-105">
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>
                </div>

                {/* --- Bloques de Información (Scrollable Content) --- */}
                <div className="relative z-10 w-full mt-24">
                    {/* Bloque 1: SIUP */}
                    <div className="flex flex-col items-center p-8 my-16 transition-all duration-700 ease-in-out transform bg-white shadow-xl md:flex-row bg-opacity-10 rounded-xl backdrop-filter backdrop-blur-sm hover:scale-105">
                        <div className="p-4 md:w-1/2">
                            <h3 className="mb-4 text-2xl font-bold text-purple-300">
                                Accede a tus Calificaciones
                            </h3>
                            <p className="mb-4 leading-relaxed text-gray-200">
                                Consulta tus horarios y estado académico de forma rápida.
                            </p>
                            <a href="https://siup.upp.edu.mx" target="_blank" className="inline-block px-6 py-3 text-lg font-medium text-white transition duration-300 transform bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 hover:scale-105">
                                Ir al SIUP
                            </a>
                        </div>
                        <div className="flex items-center justify-center p-4 md:w-1/2">
                            <img
                                src="/images/siupp.png"
                                alt="SIUP Mockup"
                                className="object-cover object-center w-full h-64 rounded-lg shadow-xl"
                            />
                        </div>
                    </div>

                    {/* Bloque 2: Sobre la UPP */}
                    <div className="flex flex-col items-center p-8 my-16 transition-all duration-700 ease-in-out transform bg-white shadow-xl md:flex-row-reverse bg-opacity-10 rounded-xl backdrop-filter backdrop-blur-sm hover:scale-105">
                        <div className="p-4 md:w-1/2">
                            <h3 className="mb-4 text-2xl font-bold text-purple-300">
                                Conoce la Universidad
                            </h3>
                            <p className="mb-4 leading-relaxed text-gray-200">
                                Explora sus carreras, proyectos y cómo puedes formar parte de su comunidad.
                            </p>
                            <a href="https://upp.edu.mx" target="_blank" className="inline-block px-6 py-3 text-lg font-medium text-white transition duration-300 transform bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 hover:scale-105">
                                Visitar UPP.edu.mx
                            </a>
                        </div>
                        <div className="flex items-center justify-center p-4 md:w-1/2">
                            <img
                                src="/images/UPP Mockup.jpg"
                                alt="UPP Mockup"
                                className="object-cover object-center w-full h-64 rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-auto text-sm text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} ViveTuCampusUPP.</p>
                </div>
            </div>
        </>
    );
}