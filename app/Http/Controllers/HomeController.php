<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Inertia\Inertia;

class HomeController extends Controller
{

    public function index()
    {
        $modules = Module::query()->latest()->get();
        return Inertia::render('student/module', ["modules" => $modules]);
    }
}
