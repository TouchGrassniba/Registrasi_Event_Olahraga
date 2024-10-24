<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCabangOlahragaTable extends Migration
{
    public function up()
    {
        Schema::create('cabang_olahraga', function (Blueprint $table) {
            $table->id();
            $table->string('nama_peserta');
            $table->string('nama_cabang');
            $table->date('tanggal_event');
            $table->string('nomor_registrasi')->unique();
            $table->string('kategori');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cabang_olahraga');
    }
}
