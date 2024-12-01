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


}
