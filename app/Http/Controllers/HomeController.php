<?php

namespace App\Http\Controllers;

use App\Models\Aviario;
use App\Models\Backup;
use App\Models\Coleta;
use App\Models\Consumo;
use App\Models\Empresa;
use App\Models\Envio;
use App\Models\Estoque_ave;
use App\Models\Estoque_ovo;
use App\Models\Geraltarefa;
use App\Models\Lote;
use App\Models\Mortalidade;
use App\Models\Periodo;
use App\Models\Semana;
use Carbon\Carbon;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{

        /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function index()
    {
       return Inertia::render('home');
    }
}
