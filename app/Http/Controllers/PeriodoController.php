<?php

namespace App\Http\Controllers;

use App\Models\Checklist;
use App\Models\Periodo;
use App\Models\Semana;
use Carbon\Carbon;
use DateInterval;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\Date;

class PeriodoController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $periodos = Periodo::orderBy('id_periodo', 'DESC')->paginate(10);
        return Inertia::render('periodos', compact('periodos'));
    }

    public function busca(Request $request)
    {
        $periodos = Periodo::where('data_inicial', $request->search)->paginate('10');
        $busca = true;
        return Inertia::render('periodos', compact('periodos', 'busca'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $messages = [
            'date_format' => 'O campo data do lote só aceita datas!',
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        $request->validate(
            [
                'datainicial' => 'date_format:"Y-m-d"|required',
                'semanainicial' => 'required|integer',
                'semanafinal' => 'required|integer'
            ],
            $messages,
            [
                'datainicial' => 'data inicial',
                'semanainicial' => 'semana inicial',
                'semanafinal' => 'semana final',
            ]
        );
        
        $nperiodo = Periodo::where('id_periodo', Periodo::idperiodo())->first();

        $data['id_periodo'] = Periodo::idperiodo();
        $data['periodo'] = $nperiodo ? $nperiodo->periodo + 1 : 1;
        $data['ativo'] = 1;
        $data['data_inicial'] = $request->datainicial;
        $data['semana_inicial'] = $request->semanainicial;
        $data['semana_final'] = $request->semanafinal;
        Periodo::create($data);
        Periodo::where('id_periodo', '<>', $data['id_periodo'])->where('ativo', 1)->update(['ativo' => 0]);
        $this->addSemanas($request->datainicial, $request->semanainicial, $request->semanafinal);
        $this->addChecklist($request->datainicial);
        Session::flash('success', 'Período criado com sucesso!');
        return Redirect::route('periodos.index');
    }

    public function addSemanas($datainicio, $inicial, $final)
    {

        //Cria semanas com eclosão, fertilidade e produção
        $dataatrasada = date('Y-m-d', strtotime("-7 day", strtotime($datainicio)));
        $dtini = DateTime::createFromFormat('Y-m-d', $dataatrasada);
        $dtfin = DateTime::createFromFormat('Y-m-d', $datainicio);
        $nperiodo = Periodo::where('id_periodo', Periodo::idperiodo() - 1)->first();
        for ($i = $inicial; $i <= $final; $i++) {
            $data['periodo'] = $nperiodo->periodo;
            $data['semana'] = $i;
            $data['data_inicial'] = $dtini->add(new DateInterval('P7D'));
            $data['data_final'] = $dtfin->add(new DateInterval('P7D'));
            Semana::create($data);
        }
        //Adiciona data de término em períodos *****************************
        $semanas = Semana::orderBy('id_semana', 'desc')->first();
        Periodo::where('id_periodo', $semanas->periodo)->update(['desativacao' => $semanas->data_final]);
    }

    public function addChecklist($datainicio)
    {
        $mesatrasado = date('Y-m-d', strtotime("-1 month", strtotime($datainicio)));
        $dtmesinicial = DateTime::createFromFormat('Y-m-d', $mesatrasado);
        $dtmesfinal = DateTime::createFromFormat('Y-m-d', $datainicio);

        $datetime1 = new DateTime($datainicio);
        $dtfimsemana2 = Semana::orderBy('id_semana', 'desc')->first();
        $datetime2 = new DateTime($dtfimsemana2->data_final);
        $interval = $datetime1->diff($datetime2);
        for ($a = 1; $a <= $interval->format('%m'); $a++) {
            $data['periodo'] = Periodo::idperiodo() - 1;
            $data['mes'] = $a;
            $data['data_inicial'] = $dtmesinicial->add(new DateInterval('P1M'));
            $data['data_final'] = $dtmesfinal->add(new DateInterval('P1M'));
            Checklist::create($data);
        }
    }

    public function addsemanasperiodo(Request $request)
    {

        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        $request->validate(
            [
                'numsemanas' => 'required'
            ],
            $messages,
            [
                'numsemanas' => 'número da semana'
            ]
        );

        $lastdata = Semana::where('periodo', $request->idperiodo)->orderBy('id_semana', 'desc')->first();
        $semanainicial = $lastdata->semana + 1;
        $semanafinal = $lastdata->semana + $request->numsemanas;

        $datainia = date('Y-m-d H:i:s', strtotime($lastdata->data_inicial));
        $datafinb = date('Y-m-d H:i:s', strtotime(Carbon::parse( $datainia)->addDays(7)));
        $dataini = new DateTime($datainia);
        $datafin = new DateTime($datafinb);
        for ($i = $semanainicial; $i <= $semanafinal; $i++) :
            Semana::where('periodo', $request->idperiodo)->create([
                'periodo' => $request->idperiodo,
                'semana' => $i,
                'data_inicial' => $dataini->add(new DateInterval('P7D')),
                'data_final' => $datafin->add(new DateInterval('P7D'))
            ]);
        endfor;

        //Número de semanas em períodos
        $semperiodo = Periodo::where('id_periodo', $request->idperiodo)->first();
        //Altera semana final e adiciona data de término em períodos *****************************
        $dtfimsemana = Semana::orderBy('id_semana', 'desc')->first();
        Periodo::where('id_periodo', $request->idperiodo)->update(['semana_final' => $semperiodo->semana_final + $request->numsemanas, 'desativacao' => $dtfimsemana->data_final]);
        //Cria checklist
        $dadoschechlist = Checklist::where('periodo', $request->idperiodo)->orderBy('id_checklist', 'desc')->first();
        //       $mesatrasado = date('Y-m-d', strtotime("-1 month", strtotime($dadoschechlist->data_inicial)));
        $dtmesinicial = new DateTime($dadoschechlist->data_inicial);
        //        $mesadiantado = date('Y-m-d', strtotime("+1 month", strtotime($request->desativacao)));
        $dtmesfinal = new DateTime($dadoschechlist->data_final);

        $dtfimsemana2 = Semana::where('periodo', $request->idperiodo)->orderBy('id_semana', 'desc')->first();
        $datetime1 = new DateTime($dadoschechlist->data_inicial);
        $datetime2 = new DateTime($dtfimsemana2->data_final);
        $interval = $datetime1->diff($datetime2);
        //        echo $interval->format('%m');exit;
        for ($a = 1; $a <= $interval->format('%m'); $a++) {
            Checklist::where('periodo', $request->idperiodo)->create([
                'periodo' => $request->idperiodo,
                'mes' => $dadoschechlist->mes + $a,
                'data_inicial' => $dtmesinicial->add(new DateInterval('P1M'))->format('Y-m-d'),
                'data_final' => $dtmesfinal->add(new DateInterval('P1M'))->format('Y-m-d')
            ]);
        }
        Session::flash('success', 'Semanas adicionadas com sucesso!');
        return Redirect::route('periodos.index');
    }

    public function ativaperiodo(Request $request, Periodo $periodo)
    {

        $periodo->where('ativo', '1')->update(['ativo' => '0']);
        if ($request->ativo == '0') :
            $periodo->where('id_periodo', $request->idperiodo)->update(['ativo' => '1']);
        else :
            $periodo->where('id_periodo', $request->idperiodo)->update(['ativo' => '0']);
        endif;

        return Redirect::route('periodos.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Periodo $periodo)
    {
        $periodo->delete();
        Session::flash('success', 'Período removido com sucesso!');
        return Redirect::route('periodos.index');
    }
}
