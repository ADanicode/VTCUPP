<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\DB; // No necesario, pero buena práctica si lo llegas a usar.

class Student extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * El nombre de la tabla asociada con el modelo.
     * Es crucial que sea 'students'.
     *
     * @var string
     */
    protected $table = 'students';

    /**
     * Los atributos que se pueden asignar masivamente.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'matricula', // Campo usado para el login
        'password',
    ];

    /**
     * Los atributos que deben ser ocultados para la serialización.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Define la relación de muchos a muchos con Activities (Inscripciones).
     */
    public function activities(): BelongsToMany
    {
        // La relación usa la tabla pivote 'activity_student'.
        // IMPORTANTE: NO incluye withPivot('is_completed') para evitar el error SQL.
        return $this->belongsToMany(Activity::class, 'activity_student', 'student_id', 'activity_id')
                    ->withTimestamps();
    }
}