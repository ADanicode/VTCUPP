<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Activity;
use Inertia\Inertia;

class ActivityController extends Controller
{
    /**
     * Procesa la inscripción del estudiante a una actividad.
     */
    public function enroll(Request $request, Activity $activity)
    {
        $student = Auth::user();

        // Verificar si el estudiante ya está inscrito
        if ($student->activities()->where('activity_id', $activity->id)->exists()) {
            return back()->with('error', 'Ya estás inscrito en esta actividad.');
        }

        // Realizar la inscripción (añadir una fila a la tabla pivote activity_student)
        $student->activities()->attach($activity->id);

        // Redirigir al dashboard con un mensaje de éxito
        return redirect()->route('dashboard')->with('success', '¡Inscripción exitosa a ' . $activity->name . '!');
    }
    public function unenroll(Activity $activity)
    {
        $student = Auth::user();

        // 1. Verificar si el estudiante está realmente inscrito
        if (!$student->activities()->where('activity_id', $activity->id)->exists()) {
            return back()->with('error', 'No estás inscrito en esta actividad.');
        }

        // 2. Realizar la baja (eliminar fila de la tabla pivote activity_student)
        $student->activities()->detach($activity->id);

        // 3. Redirigir al dashboard con un mensaje de éxito
        return redirect()->route('dashboard')->with('success', 'Te has dado de baja exitosamente de ' . $activity->name . '.');
    }

    /**
     * Muestra los detalles de una actividad específica (usado para la inscripción).
     */
    public function show(Activity $activity)
    {
        // Esta vista mostraría los detalles de la actividad con el botón de inscripción
        return Inertia::render('ActivityDetails', [
            'activity' => $activity,
        ]);
    }

    // El método index sería el catálogo completo de actividades
    public function index()
    {
        $activities = Activity::all();
        return Inertia::render('Activities/Index', ['activities' => $activities]);
    }
}