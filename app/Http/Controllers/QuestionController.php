<?php

namespace App\Http\Controllers;

use App\Http\Requests\ParseCodeRequest;
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

    public function code($id)
    {
        return Inertia::render('backoffice/question/code', [
            'question' => Question::query()->find($id),
        ]);
    }

    public function parse(ParseCodeRequest $request)
    {
        $payload = $request->validated();
        $code = $payload['code'];

        $tmpFileName = 'code_' . Str::random(10) . '.py';
        $tmpFilePath = sys_get_temp_dir() . DIRECTORY_SEPARATOR . $tmpFileName;
        file_put_contents($tmpFilePath, $code);

        $pythonPath = 'python'; // Replace this with your Python executable path
        $scriptPath = base_path('python/parse.py');
        $command = "$pythonPath \"$scriptPath\" --file \"$tmpFilePath\"";

        // Execute the command using shell_exec
        $output = shell_exec($command);

        // Check for errors
        if ($output === null) {
            return back()->withErrors('errors', 'cannot parse the code');
        }

        // Decode the JSON output from Python
        $result = json_decode($output, true);

        return Inertia::render('backoffice/question/arrange', [
            "result" => $result,
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
