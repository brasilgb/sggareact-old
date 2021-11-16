<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAviarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aviarios', function (Blueprint $table) {
            $table->integer('id_aviario')->primary();
            $table->integer('lote_id');
            $table->foreign('lote_id')->references('id_lote')->on('lotes')->onDelete('cascade');
            $table->integer('periodo');
            $table->timestamp('data_aviario')->nulllable();
            $table->string('aviario');
            $table->integer('femea_box1');
            $table->integer('femea_box2')->nullable();
            $table->integer('femea_box3')->nullable();
            $table->integer('femea_box4')->nullable();
            $table->integer('macho_box1');
            $table->integer('macho_box2')->nullable();
            $table->integer('macho_box3')->nullable();
            $table->integer('macho_box4')->nullable();
            $table->integer('femea');
            $table->integer('macho');
            $table->integer('tot_ave');
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
        Schema::dropIfExists('aviarios');
        chema::table('aviarios', function (Blueprint $table) {
            $table->dropForeign('aviarios_lote_id_foreign');
            $table->dropColumn('lote_id');
        });
    }
}
