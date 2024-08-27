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
                'title' => 'product_create',
            ],
            [
                'id' => 2,
                'title' => 'product_edit',
            ],
            [
                'id' => 3,
                'title' => 'product_destroy',
            ],
        ];
        Permission::insert($permissions);
    }
}
