<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CabangOlahragaController;




Route::get('/cabang-olahraga', [CabangOlahragaController::class, 'index']);
Route::post('/cabang-olahraga', [CabangOlahragaController::class, 'store']);
