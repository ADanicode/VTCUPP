<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DashboardController; // Nuevo: Importamos el controlador del dashboard
use App\Models\Activity; // Nuevo: Importamos el modelo Activity
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ActivityController; // Nuevo: Para manejar inscripciones

// --- 1. RUTA PÚBLICA DE INTRODUCCIÓN ---
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => false, // Desactivamos el registro
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// --- 2. RUTAS DE AUTENTICACIÓN (Login con Matrícula) ---
Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.post');
// La ruta de logout ya está en auth.php, solo la renombramos aquí si es necesario

// --- 3. GRUPO DE RUTAS PROTEGIDAS (Para estudiantes logueados) ---
Route::middleware(['auth', 'verified'])->group(function () {

    // DASHBOARD: Pasa actividades disponibles y las del estudiante.
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // PERFIL (Solo Vista, sin Edición)
    // El controlador de perfil de Breeze ya está en ProfileController::class
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // **Importante:** Eliminamos las rutas PATCH/UPDATE/DELETE para deshabilitar la edición.
    // Solo permitimos la visualización del perfil.

    // RUTAS DE INSCRIPCIÓN A ACTIVIDADES
    // Creamos una ruta POST para la acción de inscribirse
    Route::post('activities/{activity}/enroll', [ActivityController::class, 'enroll'])->name('activities.enroll');
    
    Route::post('/activities/{activity}/unenroll', [ActivityController::class, 'unenroll'])
    ->middleware(['auth', 'verified'])
    ->name('activities.unenroll');
});

// Incluimos las rutas restantes de autenticación de Breeze (principalmente logout).
require __DIR__.'/auth.php';