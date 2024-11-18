<?php

namespace App\Http\Controllers;

use App\Http\Requests\ModuleRequest;
use App\Models\Module;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ModuleController extends Controller
{

    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $perPage = $request->get('perPage', 10);

        $modules = Module::query()->latest()->paginate(perPage: $perPage, page: $page);

        $response = [
            "prev_page" => $modules->currentPage() > 1 ? $modules->currentPage() - 1 : null,
            "items" => $modules->items(),
            "next_page" => $modules->hasMorePages() ? $modules->currentPage() + 1 : null,
        ];

        return Inertia::render('backoffice/module/index', [
            'modules' => $response,
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/module/form');
    }

    public function store(ModuleRequest $request)
    {
        $payload = $request->validated();
        $payload['slug'] = Str::slug($payload['name']);

        try {
            DB::beginTransaction();
            Module::query()->create($payload);
            DB::commit();
            return Inertia::location(route('backoffice.module.index'));
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors('errors', $e->getMessage());
        }
    }

    public function show(string $id)
    {
        $module = Module::query()->find($id);

        return Inertia::render('backoffice/module/form', [
            'module' => $module,
        ]);
    }

    public function update(ModuleRequest $request, string $id)
    {
        $payload = $request->validated();

        try {
            DB::beginTransaction();
            $module = Module::query()->find($id);
            $module->update($payload);
            DB::commit();
            return Inertia::location(route('backoffice.module.index'));
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors('errors', $e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();
            $module = Module::query()->find($id);
            $module->delete();
            DB::commit();
            return Inertia::location(route('backoffice.module.index'));
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors('errors', $e->getMessage());
        }
    }
}
