<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentAuthController extends Controller
{
    public function login()
    {
        return Inertia::render('student/auth');
    }

    public function auth(LoginRequest $request)
    {
        $data = $request->validated();
        Auth::guard('student')->attempt($data);
        return redirect()->intended(route('home'));
    }

    public function logout()
    {
        Auth::guard('student')->logout();
        return redirect()->intended(route('home'));
    }
}
