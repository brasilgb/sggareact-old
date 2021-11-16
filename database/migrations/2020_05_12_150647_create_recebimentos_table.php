<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecebimentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recebimentos', function (Blueprint $table) {
            $table->integer('id_recebimento')->primary();
            $table->integer('periodo');
            $table->integer('lote_id');
            $table->foreign('lote_id')->references('id_lote')->on('lotes')->onDelete('cascade');
            $table->timestamp('data_recebimento');
            $table->time('hora_recebimento');
            $table->string('sexo_ave');
            $table->integer('quantidade');
            $table->string('nota_fiscal');
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
        Schema::dropIfExists('recebimentos');
        Schema::table('recebimentos', function (Blueprint $table) {
            $table->dropForeign('recebimentos_lote_foreign');
            $table->dropColumn('lote_id');
        });
    }
}
