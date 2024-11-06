<?php

use App\Http\Controllers\BackofficeController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'backoffice', 'middleware' => ['auth'], 'as' => 'backoffice.'], function () {

    Route::get('/', [BackofficeController::class, 'index'])->name('index');

    Route::group(['prefix' => 'module', 'as' => 'module.'], function () {
        Route::get('', [ModuleController::class, 'index'])->name('index');
        Route::get('create', [ModuleController::class, 'create'])->name('create');
        Route::post('store', [ModuleController::class, 'store'])->name('store');
        Route::get('{id}/show', [ModuleController::class, 'show'])->name('show');
        Route::put('{id}/edit', [ModuleController::class, 'update'])->name('update');
        Route::delete('{id}/delete', [ModuleController::class, 'delete'])->name('delete');
    });

    // Route::group(['prefix' => 'question'], function () {});

    Route::group(['prefix' => 'student'], function () {
        Route::get('', [StudentController::class, 'index'])->name('index');
        Route::get('create', [StudentController::class, 'create'])->name('create');
        Route::post('store', [StudentController::class, 'store'])->name('store');
        Route::get('{id}/show', [StudentController::class, 'show'])->name('show');
        Route::put('{id}/edit', [StudentController::class, 'update'])->name('update');
        Route::delete('{id}/delete', [StudentController::class, 'delete'])->name('delete');
    });
});
