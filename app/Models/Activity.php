<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'category', // Puede ser 'tutorias', 'deportivas', etc.
    ];
    
    // **RELACIÓN: Una actividad puede ser realizada por muchos estudiantes.**
    public function students()
    {
        return $this->belongsToMany(Student::class, 'activity_student')
                    ->withPivot('is_completed')
                    ->withTimestamps();
    }
}