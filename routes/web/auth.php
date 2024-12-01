<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Student\StudentAuthController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth', 'as' => 'auth.'], function () {
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::post('attempt', [AuthController::class, 'auth'])->name('attempt');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
});

Route::group(['prefix' => 'auth-student', 'as' => 'auth-student.'], function () {
    Route::get('login', [StudentAuthController::class, 'login'])->name('login');
    Route::post('attempt', [StudentAuthController::class, 'auth'])->name('attempt');
    Route::post('logout', [StudentAuthController::class, 'logout'])->name('logout');
});
