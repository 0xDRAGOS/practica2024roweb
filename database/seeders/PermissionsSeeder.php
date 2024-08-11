<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            [
                'id' => 1,
                'title' => 'task_create',
            ],
            [
                'id' => 2,
                'title' => 'task_edit',
            ],
            [
                'id' => 3,
                'title' => 'task_destroy',
            ],
        ];
        Permission::insert($permissions);
    }
}
