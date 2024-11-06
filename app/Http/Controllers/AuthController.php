<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Exception;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login()
    {
        return Inertia::render('auth/login');
    }

    public function auth(LoginRequest $request)
    {
        $payload = $request->validated();

        try {
            $data = $request->validated();
            $login = Auth::guard("web")->attempt($data);
            $request->session()->regenerate();

            if ($login) {
                return Inertia::location(route('backoffice.index'));
            } else {
                return back()->withErrors('errors', 'Email atau password salah');
            }
        } catch (Exception $e) {
            return back()->withErrors('errors', $e->getMessage());
        }
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->intended(route('login'));
    }
}
