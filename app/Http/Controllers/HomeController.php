<?php

namespace App\Http\Controllers;

use App\Models\AnswerItem;
use App\Models\Module;
use App\Models\Question;
use App\Models\QuestionItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{

    public function index()
    {
        return Inertia::render('home', ["modules" => Module::all()]);
    }

    public function question($id)
    {
        $questions = Question::query()->with(['module'])->where('module_id', $id)->get();
        $module = Module::query()->where('id', $id)->first();
        return Inertia::render('question', ["questions" => $questions, "module" => $module]);
    }

    public function question_detail($id)
    {
        $items = QuestionItem::query()->where('question_id', $id)->get();
        $question = Question::query()->where('id', $id)->first();
        return Inertia::render('question_detail', ["items" => $items, "question" => $question]);
    }
}
