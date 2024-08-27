<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'id' => 51,
                'title' => 'Admin',
            ],
            [
                'id' => 52,
                'title' => 'User',
            ],
        ];

        Role::insert($roles);
    }
}
