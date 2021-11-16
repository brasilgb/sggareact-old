<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnviosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('envios', function (Blueprint $table) {
            $table->integer('id_envio')->primary();
            $table->timestamp('data_envio');
            $table->time('hora_envio');
            $table->integer('periodo');
            $table->integer('lote_id');
            $table->foreign('lote_id')->references('id_lote')->on('lotes')->onDelete('cascade');
            $table->integer('incubaveis');
            $table->integer('comerciais');
            $table->integer('postura_dia');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('envios');
        Schema::table('envios', function (Blueprint $table) {
            $table->dropForeign('envios_lote_foreign');
            $table->dropColumn('lote_id');
        });
    }
}
