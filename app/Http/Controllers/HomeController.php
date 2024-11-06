<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{

    public function index()
    {
        return inertia('home');
    }

    public function question()
    {
        return inertia('question');
    }
}
