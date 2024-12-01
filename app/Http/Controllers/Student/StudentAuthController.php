<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Exception;

class StudentAuthController extends Controller
{
    public function login()
    {
        if (Auth::guard("student")->check()) return redirect(route('home'));
        return Inertia::render('student/auth');
    }

    public function auth(LoginRequest $request)
    {
        try {
            $data = $request->validated();
            $login = Auth::guard("student")->attempt($data);
            $request->session()->regenerate();

            if ($login) {
                return Inertia::location(route('home'));
            } else {
                return back()->withErrors('errors', 'Email atau password salah');
            }
        } catch (Exception $e) {
            return back()->withErrors('errors', $e->getMessage());
        }
    }

    public function logout()
    {
        Auth::guard('student')->logout();
        return redirect()->intended(route('home'));
    }
}
