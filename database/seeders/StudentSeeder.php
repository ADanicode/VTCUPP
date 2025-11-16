<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Crear el Estudiante INSCRITO (Matrícula: 1001)
        DB::table('students')->insert([
            'id' => 1,
            'name' => 'Angel Daniel',
            'matricula' => '2431124929',
            'password' => Hash::make('password'), // Contraseña: password
            'created_at' => now(), 'updated_at' => now()
        ]);

        // 2. Crear el Estudiante NO INSCRITO (Matrícula: 1002)
        DB::table('students')->insert([
            'id' => 2,
            'name' => 'Juan ',
            'matricula' => '1002',
            'password' => Hash::make('password'), // Contraseña: password
            'created_at' => now(), 'updated_at' => now()
        ]);

        // 3. Realizar la inscripción de Ana Sofia (ID 1) a Fútbol Rápido (ID 1)
        DB::table('activity_student')->insert([
            'student_id' => 1,
            'activity_id' => 1,
            'created_at' => now(), 'updated_at' => now()
        ]);
    }
}