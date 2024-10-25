<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventRegistrationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/registrasi-event-olahraga', [EventRegistrationController::class, 'getAllData']);
Route::post('/registrasi-event-olahraga', [EventRegistrationController::class, 'insertData']);
