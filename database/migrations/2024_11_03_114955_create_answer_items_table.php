<?php

use App\Models\QuestionItem;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('answer_items', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(QuestionItem::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->json('content');
            $table->boolean('is_correct');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('answer_items');
    }
};
