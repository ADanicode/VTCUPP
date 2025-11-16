<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Activity; // Asegúrate de importar el modelo

class ActivitySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('activities')->insert([
            [
                'name' => 'Fútbol Rápido',
                'professor_email' => 'profe.futbol@upp.edu.mx',
                'professor_name' => 'Dr. García',
                'schedule_details' => 'Martes y Jueves, 18:00 - 20:00',
                'location' => 'Cancha Principal',
                'google_maps_url' => 'https://maps.app.goo.gl/SC5SQr2P566SWe2r5',
                'image_url' => '/images/futbol.jpg',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'name' => 'Club de Ajedrez',
                'professor_email' => 'profe.ajedrez@upp.edu.mx',
                'professor_name' => 'Mtra. Pérez',
                'schedule_details' => 'Lunes, 14:00 - 16:00',
                'location' => 'Auditorio Principal,',
                'google_maps_url' => 'https://maps.app.goo.gl/SC5SQr2P566SWe2r5',
                'image_url' => '/images/ajedrez.png',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'name' => 'Atletismo',
                'professor_email' => 'profe@upp.edu.mx',
                'professor_name' => 'Ing. Soto',
                'schedule_details' => 'Miércoles y Viernes, 10:00 - 12:00',
                'location' => 'Estacionamiento',
                'google_maps_url' => 'https://maps.app.goo.gl/SC5SQr2P566SWe2r5',
                'image_url' => '/images/atletismo.png',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'name' => 'Basquetbol',
                'professor_email' => 'profe@upp.edu.mx',
                'professor_name' => 'Ing. Soto',
                'schedule_details' => 'Miércoles y Viernes, 17:00 - 18:30',
                'location' => 'Canchas de basquet',
                'google_maps_url' => 'https://maps.app.goo.gl/SC5SQr2P566SWe2r5',
                'image_url' => '/images/basquet.png',
                'created_at' => now(), 'updated_at' => now()
            ]
        ]);
    }
}