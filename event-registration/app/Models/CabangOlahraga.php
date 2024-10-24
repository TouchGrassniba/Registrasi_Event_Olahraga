<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CabangOlahraga extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_peserta',
        'nama_cabang',
        'tanggal_event',
        'nomor_registrasi',
        'kategori',
    ];
}
