import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout'; 

export default function Login({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        // Usamos 'matricula'
        matricula: '', 
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        // Inertia maneja la redirección al dashboard al ser exitoso.
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sesión" />

            <div className="flex flex-col items-center justify-center mb-6">
                <h1 className="mb-2 text-3xl font-bold text-white">Iniciar Sesión</h1>
                <p className="text-sm text-gray-400">Plataforma de Actividades Extracurriculares</p>
            </div>
            
            {status && (
                <div className="mb-4 text-sm font-medium text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="matricula" value="Matrícula" className="text-gray-300" />
                    <TextInput
                        id="matricula"
                        type="text"
                        name="matricula"
                        value={data.matricula}
                        // Estilo elegante en morado oscuro
                        className="block w-full mt-1 text-white placeholder-gray-500 transition duration-300 rounded-lg bg-violet-900 border-violet-700 focus:ring-purple-500 focus:border-purple-500"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('matricula', e.target.value)}
                    />
                    <InputError message={errors.matricula} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" className="text-gray-300" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        // Estilo elegante en morado oscuro
                        className="block w-full mt-1 text-white placeholder-gray-500 transition duration-300 rounded-lg bg-violet-900 border-violet-700 focus:ring-purple-500 focus:border-purple-500"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="text-sm text-gray-400 ms-2">
                            Recordarme
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-6">
                    <PrimaryButton className="px-6 py-2 font-bold text-white transition duration-300 transform bg-purple-600 rounded-lg ms-4 hover:bg-purple-700 hover:scale-105" disabled={processing}>
                        Entrar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}