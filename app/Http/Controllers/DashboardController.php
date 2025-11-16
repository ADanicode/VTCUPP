<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Activity;
use App\Models\Student;

class DashboardController extends Controller
{
    /**
     * Muestra el dashboard del estudiante autenticado con sus horarios y recomendaciones.
     */
    public function index()
    {
        // Obtiene el estudiante autenticado
        $student = Auth::user(); 

        // 1. Actividades inscritas por el estudiante (Mi Horario)
        $myActivities = $student->activities()->get();
        
        // 2. Actividades disponibles para recomendación (Actividades que NO cursa)
        // Obtenemos los IDs de las actividades inscritas por el estudiante
        $enrolledActivityIds = $myActivities->pluck('id')->toArray();
        
        // Obtenemos las actividades disponibles excluyendo las ya inscritas
        $availableActivities = Activity::whereNotIn('id', $enrolledActivityIds)
                                    ->inRandomOrder()
                                    ->take(4) // Tomamos 4 actividades para las recomendaciones
                                    ->get();
        
        return Inertia::render('Dashboard', [
            // Pasamos solo los datos necesarios, no el objeto Auth completo
            'user' => [
                'id' => $student->id,
                'name' => $student->name,
                'matricula' => $student->matricula,
            ],
            'myActivities' => $myActivities,
            'availableActivities' => $availableActivities,
        ]);
    }
}