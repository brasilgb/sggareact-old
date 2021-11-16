<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use App\Models\Lote;
use App\Models\Periodo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Str;

class LoteController extends Controller
{
    // public function __construct()
    // {
    //     if(Empresa::first()->segmento == 0){
    //         return redirect()->route('home')->send();
    //     }
    // }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $lotes = Lote::with('aviarios')->where('periodo', Periodo::ativo())->orderBy('id_lote', 'DESC')->paginate(15);
        return Inertia::render('lotes', compact('lotes'));
    }

    public function busca(Request $request)
    {
        $data = $request->all();

        $rules = [
            'search' => 'required'
        ];
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        Validator::make($data, $rules, $messages)->validate();

        $lotes = Lote::with('aviarios')->where('lote', $request->search)->paginate('10');
        $busca = true;
        return Inertia::render('lotes', compact('lotes', 'busca'));

    }

    public function checklote(Request $request)
    {
        $lote = Lote::where('lote', $request->lote)->first();
        if ($lote) :
            $valid = 'false';
        else :
            $valid = 'true';
        endif;
        return $valid;
    }

    public function checkuplote(Request $request)
    {
        $lote = Lote::where('id_lote', $request->idlote)->where('lote', $request->lote)->first();
        if (!$lote) :
            $valid = 'false';
        else :
            $valid = 'true';
        endif;
        return $valid;
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('lotes/addlote');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Lote $lote)
    {
        $data = $request->all();

        $rules = [
            'data_lote' => 'date_format:"Y-m-d"|required',
            'lote' => 'required|unique:lotes',
            'femea' => 'required|integer',
            'macho' => 'required|integer'
        ];
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!',
            'integer' => 'O campo :attribute só aceita inteiros!',
            'date_format' => 'O campo data do lote só aceita datas!',
            'unique' => 'O nome do :attribute já existe na base de dados!'
        ];
        Validator::make($data, $rules, $messages)->validate();
        $data['id_lote'] = Lote::idlote();
        $data['lote'] = Str::upper($request->lote);
        $data['periodo'] = Periodo::ativo();
        $data['data_lote'] = $request->data_lote;

        $lote->create($data);
        return redirect()->route('lotes.index')->with('success', 'Lote adicionado com sucesso!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Lote  $lote
     * @return \Illuminate\Http\Response
     */
    public function show(Lote $lote)
    {
        return Inertia::render('lotes/edtlote', compact('lote'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Lote  $lote
     * @return \Illuminate\Http\Response
     */
    public function edit(Lote $lote)
    {
        return redirect()->route('lotes.show', ['lote' => $lote->id_lote]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Lote  $lote
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Lote $lote)
    {
        $data = $request->all();

        $rules = [
            'data_lote' => 'date_format:"Y-m-d"|required',
            'lote' => 'required|unique:lotes,id_lote',
            'femea' => 'required|integer',
            'macho' => 'required|integer'
        ];
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!',
            'integer' => 'O campo :attribute só aceita inteiros!',
            'date_format' => 'O campo data do lote só aceita datas!',
            'unique' => 'O nome do :attribute já existe na base de dados!'
        ];
        Validator::make($data, $rules, $messages)->validate();
        $data = $request->all();
        $lote->update($data);
        return redirect()->route('lotes.index')->with('success', 'Lote editado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Lote  $lote
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lote $lote)
    {
        $lote->delete();
        return redirect()->route('lotes.index')->with('success', 'Lote deletado com sucesso!');
    }

    public function showcapitalizada(Request $request)
    {
        $cap = Lote::where('id_lote', $request->idlote)->first();
        $dataatual = date("Y-m-d", strtotime(now()));
        $lotes = [
            'capfemea' => $cap->femea_capitalizada ? $cap->femea_capitalizada : '0',
            'capmacho' => $cap->macho_capitalizado ? $cap->macho_capitalizado : '0',
            'datafemea' => $cap->femea_capitalizada ? Carbon::createFromFormat('Y-m-d', $cap->data_femea_capitalizada)->format('d/m/Y') : Carbon::createFromFormat('Y-m-d', $dataatual)->format('d/m/Y'),
            'datamacho' => $cap->macho_capitalizado ? Carbon::createFromFormat('Y-m-d', $cap->data_macho_capitalizado)->format('d/m/Y') : Carbon::createFromFormat('Y-m-d', $dataatual)->format('d/m/Y')
        ];

        return $lotes;
    }

    public function capitalizar(Request $request, Lote $lote)
    {

        $data = $request->all();


        $rules = [
            'data_femea_capitalizada' => 'date_format:"Y-m-d"|required',
            'data_macho_capitalizado' => 'date_format:"Y-m-d"|required',
            'femea_capitalizada' => 'required|integer|min:1',
            'macho_capitalizado' => 'required|integer|min:1'
        ];
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!',
            'integer' => 'O campo :attribute só aceita inteiros!',
            'date_format' => 'O campo data do lote só aceita datas!',
            'unique' => 'O nome do :attribute já existe na base de dados!',
            'min' => 'O campo :attribute requer valor maior que "0"!'
        ];
        Validator::make($data, $rules, $messages)->validate();
        $data = [
            'femea_capitalizada' => $request->femea_capitalizada,
            'macho_capitalizado' => $request->macho_capitalizado,
            'data_femea_capitalizada' => $request->data_femea_capitalizada,
            'data_macho_capitalizado' => $request->data_macho_capitalizado
        ];

        $lote->where('id_lote', $lote->id_lote)->update($data);
        return redirect()->route('lotes.index')->with('success', 'Lote capitalizado com sucesso!');
    }
}
