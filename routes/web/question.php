<?php

use App\Http\Controllers\Student\StudentQuestionController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'question'], function () {
    Route::get('{id}/main', [StudentQuestionController::class, 'index'])->name('question.index');
    Route::get('{id}/detail', [StudentQuestionController::class, 'show'])->name('question.show');
});
