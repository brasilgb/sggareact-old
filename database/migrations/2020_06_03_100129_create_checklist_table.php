<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChecklistTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('checklists', function (Blueprint $table) {
            $table->bigIncrements('id_checklist');
            $table->integer('periodo');
            $table->foreign('periodo')->references('id_periodo')->on('periodos')->onDelete('cascade');
            $table->integer('mes');
            $table->timestamp('data_inicial');
            $table->timestamp('data_final');
            $table->decimal('check', 10,2)->nullable();
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
        Schema::dropIfExists('checklists');
        Schema::table('checklists', function (Blueprint $table) {
            $table->dropForeign('checklists_periodo_foreign');
            $table->dropColumn('periodo');
        });
    }
}
