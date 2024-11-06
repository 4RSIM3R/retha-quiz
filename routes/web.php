<?php

use App\Http\Controllers;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('', [HomeController::class, 'index'])->name('home');
Route::get('question', [HomeController::class, 'question'])->name('question');