<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BackofficeController extends Controller
{
    public function index()
    {
        return Inertia::render('backoffice/index');
    }
}