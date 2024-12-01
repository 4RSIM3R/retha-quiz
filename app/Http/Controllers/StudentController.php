<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequest;
use App\Models\Student;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StudentController extends Controller
{

    public function index(Request $request)
    {

        $page = $request->get('page', 1);
        $perPage = $request->get('perPage', 10);

        $students = Student::query()->latest()->paginate(perPage: $perPage, page: $page);

        $response = [
            "prev_page" => $students->currentPage() > 1 ? $students->currentPage() - 1 : null,
            "items" => $students->items(),
            "next_page" => $students->hasMorePages() ? $students->currentPage() + 1 : null,
        ];

        return Inertia::render('backoffice/student/index', [
            'students' => $response,
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/student/form');
    }

    public function store(StudentRequest $request)
    {
        $payload = $request->validated();
        $payload["password"] = Hash::make($payload["password"]);

        try {
            DB::beginTransaction();
            Student::query()->create($payload);
            DB::commit();
            return Inertia::location(route('backoffice.student.index'));
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors('errors', $e->getMessage());
        }
    }

    public function show($id)
    {
        return Inertia::render('backoffice/student/form', [
            'student' => Student::query()->find($id),
        ]);
    }

    public function update($id, StudentRequest $request)
    {

        $payload = $request->validated();

        try {
            DB::beginTransaction();
            $student = Student::query()->find($id);
            $student->update($payload);
            DB::commit();
            return Inertia::location(route('backoffice.student.index'));
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors('errors', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            $student = Student::query()->find($id);
            $student->delete();
            DB::commit();
            return Inertia::location(route('backoffice.student.index'));
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors('errors', $e->getMessage());
        }
    }
}
