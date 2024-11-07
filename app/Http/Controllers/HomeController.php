<?php

namespace App\Http\Controllers;

use App\Models\AnswerItem;
use App\Models\Module;
use App\Models\Question;
use App\Models\QuestionItem;
use Illuminate\Http\Request;

class HomeController extends Controller
{

    public function index()
    {

        $modules = Module::all();

        return inertia('home', [
            "modules" => $modules,
        ]);
    }

    public function question($id)
    {

        // $question = Question::query()->find($id);
        // $question_items = QuestionItem::query()->where('question_id', $id)->get();
        // $answer_item = AnswerItem::query()->where('question_id', $id)->get();

        return inertia('question', [
            // "question" => $question,
            // "question_items" => $question_items,
            // "answer_item" => $answer_item,
        ]);
    }
}
