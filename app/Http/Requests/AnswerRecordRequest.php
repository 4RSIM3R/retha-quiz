<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnswerRecordRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'question_id' => 'required|exists:questions,id',
            'score' => 'required|integer',
            'time_taken' => 'required|integer',
        ];
    }
}
