<?php

namespace App\Http\Controllers;

use App\Http\Requests\ModuleRequest;
use App\Models\Module;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ModuleController extends Controller
{

    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $perPage = $request->get('perPage', 10);

        $modules = Module::query()->latest()->paginate(perPage: $perPage, page: $page)->withQueryString();

        $response = [
            'data' => $modules->items(),
            'prev_page' => (int)mb_substr($modules->previousPageUrl(), -1) ?: null,
            'current_page' => $modules->currentPage(),
            'next_page' => (int)mb_substr($modules->nextPageUrl(), -1) ?: null
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
