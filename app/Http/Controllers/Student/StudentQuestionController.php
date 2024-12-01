<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\AnswerRecordRequest;
use App\Models\AnswerRecord;
use App\Models\Module;
use App\Models\Question;
use App\Models\QuestionItem;
use Auth;
use Inertia\Inertia;

class StudentQuestionController extends Controller
{

    public function index($id)
    {
        $questions = Question::query()->with(['module'])->where('module_id', $id)->get();
        $module = Module::query()->where('id', $id)->first();
        return Inertia::render('question', ["questions" => $questions, "module" => $module]);
    }

    public function detail($id)
    {
        $items = QuestionItem::query()->where('question_id', $id)->get();
        $question = Question::query()->where('id', $id)->first();
        return Inertia::render('question_detail', ["items" => $items, "question" => $question]);
    }

    public function store(AnswerRecordRequest $request)
    {
        $studentId = Auth::guard('student')->id();
        AnswerRecord::create(array_merge($request->validated(), ['student_id' => $studentId]));
        return true;
    }

}
