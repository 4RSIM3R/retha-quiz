<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::post('attempt', [AuthController::class, 'auth'])->name('attempt');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
});
