<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ActivityStudent extends Pivot
{
    /**
     * El nombre de la tabla asociada con el modelo.
     *
     * @var string
     */
    protected $table = 'activity_student';

    /**
     * Los campos que pueden ser asignados masivamente.
     * Aunque esta tabla solo tiene claves foráneas y timestamps,
     * se definen para consistencia.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'activity_id',
        'student_id',
    ];

    // Opcional: Define la relación con Activity (si la necesitas)
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    // Opcional: Define la relación con Student (si la necesitas)
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}