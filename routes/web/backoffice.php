<?php

use App\Http\Controllers\BackofficeController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice', 'middleware' => ['auth'], 'as' => 'backoffice.'], function () {

    Route::get('/', [BackofficeController::class, 'index'])->name('index');

    // Route::group(['prefix' => 'module'], function () {});

    // Route::group(['prefix' => 'question'], function () {});

    // Route::group(['prefix' => 'student'], function () {});

});
