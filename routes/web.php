<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('', [HomeController::class, 'index'])->name('home');

Route::group(['prefix' => 'question'], function () {
    Route::get('{id}/detail', [HomeController::class, 'question_detail'])->name('question_detail');
    Route::get('{id}', [HomeController::class, 'question'])->name('question');
});
