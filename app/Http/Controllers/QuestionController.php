<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuestionRequest;
use App\Models\Question;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class QuestionController extends Controller
{

    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $perPage = $request->get('perPage', 10);

        $questions = Question::query()->latest()->paginate(perPage: $perPage, page: $page)->withQueryString();

        $response = [
            'data' => $questions->items(),
            'prev_page' => (int)mb_substr($questions->previousPageUrl(), -1) ?: null,
            'current_page' => $questions->currentPage(),
            'next_page' => (int)mb_substr($questions->nextPageUrl(), -1) ?: null
        ];

        return Inertia::render('backoffice/question/index', [
            'questions' => $response,
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/question/form');
    }

    public function store(QuestionRequest $request)
    {
        $payload = $request->validated();
        $payload["duration"] = 0;

        try {
            DB::beginTransaction();
            Question::query()->create($payload);
            DB::commit();
            return Inertia::location(route('backoffice.question.index'));
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors('errors', $e->getMessage());
        }
    }

    public function show(string $id)
    {
        $modules = Question::query()->find($id);

        return Inertia::render('backoffice/question/form', [
            'question' => $modules,
        ]);
    }


    public function update(QuestionRequest $request, string $id)
    {
        $payload = $request->validated();

        try {
            DB::beginTransaction();
            $question = Question::query()->find($id);
            $question->update($payload);
            DB::commit();
            return Inertia::location(route('backoffice.question.index'));
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors('errors', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();
            $question = Question::query()->find($id);
            $question->delete();
            DB::commit();
            return Inertia::location(route('backoffice.question.index'));
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors('errors', $e->getMessage());
        }
    }
}
