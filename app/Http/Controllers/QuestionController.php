<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuestionRequest;
use App\Models\Module;
use App\Models\Question;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class QuestionController extends Controller
{

    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $perPage = $request->get('perPage', 10);

        $questions = Question::query()->with(['module'])->latest()->paginate(perPage: $perPage, page: $page);

        $response = [
            "prev_page" => $questions->currentPage() > 1 ? $questions->currentPage() - 1 : null,
            "items" => $questions->items(),
            "next_page" => $questions->hasMorePages() ? $questions->currentPage() + 1 : null,
        ];

        return Inertia::render('backoffice/question/index', [
            'questions' => $response,
        ]);
    }

    public function create()
    {
        $modules = Module::query()->get(['id', 'name']);

        return Inertia::render('backoffice/question/form', [
            "modules" => $modules,
        ]);
    }

    public function store(QuestionRequest $request)
    {
        $payload = $request->validated();
        $payload["slug"] = Str::slug($payload["name"]);

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
