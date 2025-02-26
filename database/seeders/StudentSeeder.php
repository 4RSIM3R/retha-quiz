<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $payload = [
            [
                "email" => "student_1@retha.com",
                "name" => "Student 1",
                "password" => Hash::make("password")
            ],
            [
                "email" => "student_2@retha.com",
                "name" => "Student 2",
                "password" => Hash::make("password")
            ]
        ];

        Student::insert($payload);
    }
}
