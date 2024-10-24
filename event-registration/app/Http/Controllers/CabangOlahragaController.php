<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CabangOlahraga;
use Validator;

class CabangOlahragaController extends Controller
{
    // Get all cabang olahraga
    public function index()
    {
        $cabangOlahraga = CabangOlahraga::all();
        return response()->json([
            'code' => 200,
            'message' => 'Success',
            'data' => $cabangOlahraga
        ]);
    }

    // Insert new cabang olahraga
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_peserta' => 'required|string|max:255',
            'nama_cabang' => 'required|string|max:255',
            'tanggal_event' => 'required|date',
            'nomor_registrasi' => 'required|string|unique:cabang_olahraga|max:10',
            'kategori' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 400,
                'message' => 'Validation Failed',
                'errors' => $validator->errors()
            ]);
        }

        try {
            CabangOlahraga::create($request->all());
            return response()->json([
                'code' => 200,
                'message' => 'Success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Server Error',
                'error' => $e->getMessage()
            ]);
        }
    }
}
