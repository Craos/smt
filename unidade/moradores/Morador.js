let Morador = function (webservice) {

    this.Adicionar = function (info, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'insert',
                fields: info,
                from: 'condominio.moradores',
                returning: 'num'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback();
                return;
            }

            Callback(webservice.PreparaLista('query',http.response)[0]);
        });


    };

    this.Editar = function (info, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'update',
                fields: info,
                from: 'condominio.moradores',
                where: 'num='+info.id,
                returning: 'num'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback();
                return;
            }

            Callback(true);
        });

    };

    this.Remover = function (id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'delete',
                from: 'condominio.moradores',
                where: 'num='+id,
                returning: 'num'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback();
                return;
            }
            Callback(id);

        });

    };

    this.Info = function (id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: '*',
                from: 'condominio.moradores_info',
                where: 'num='+id
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback();
                return;
            }

            Callback(webservice.PreparaLista('query',http.response)[0]);

        });
    };

    this.AtualizaFoto = function (info, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'update',
                fields: {
                    foto1: info.foto
                },
                from: 'condominio.moradores',
                where: 'num='+info.id,
                returning: 'num'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback();
                return;
            }

            Callback(true);
        });

    };

    this.AtivarAcessos = function (info, Callback) {

        webservice.Request({
            process: 'condominio.ativa_registro',
            params: JSON.stringify({
                'bloco': info.bloco,
                'unidade': info.pk_unidade,
                'registro': info.id
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback();
                return;
            }
            Callback(true);

        });

    };

    this.Listar = function (id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: 'num,nome,nascimento',
                from: 'condominio.moradores_info',
                where: 'unidade='+id,
                order: 'num'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaLista('query',http.response));

        });
    };


};

Morador.prototype.form = [
    { type: "settings", labelAlign: "left", inputHeight: "18", offsetLeft: "4", offsetTop: "2", position: "label-top"},
    { type: "block", list: [
            {type: "template", name: "titulo", value: "Cadastro de todos os moradores da unidade", style: "font-weight:bold; color: #003366;"},
            { type: "block", list: [
                    {type: "fieldset", name: "opcoes", label: "Informa&ccedil;&otilde;es gerais do morador", list: [
                            { type: "block", list: [
                                    {type: "input", name: "nome", label: "Nome completo", style: "font-weight:bold;", tooltip: "Informe o nome completo do morador", required: true, info: true, note: {text: "Nome completo do morador"}},
                                    {type: "newcolumn"},
                                    {type: "input", name: "nascimento", label: "Data de nascimento", style: "font-weight:bold;", tooltip: "Data de nascimento do morador", required: true, info: true, note: {text: "Ex.: 12/06/1981"}},
                                    {type: "newcolumn"},
                                    {type: "input", name: "local_nascimento", label: "Local de nascimento", style: "font-weight:bold;", tooltip: "Cidade e Estado se for no Brasil; cidade e pa?s se for no estrangeiro. Ex.: Campinas-S?o Paulo ou Roma-It?lia", required: true, info: true, note: {text: "Cidade e Estado brasileiro ou pa?s estrangeiro"}}
                                ]},
                            { type: "block", list: [
                                    {type: "input", name: "rg", label: "Doc. de identifica&ccedil;&atilde;o", style: "font-weight:bold;",
                                        tooltip: "Informe o número de RG ou RNE ou passaporte", info: true
                                    },
                                    {type: "newcolumn"},
                                    {type: "input", name: "cpf", label: "CPF", value:"___.___.___-__", style: "font-weight:bold;"},
                                    {type: "newcolumn"},
                                    {type: "combo", name: "genero", label: "G&ecirc;nero", style: "font-weight:bold;", required: true, options: [
                                            {value: "", text: "Selecione", selected: true},
                                            {value: "1", text: "Masculino"},
                                            {value: "2", text: "Feminino"}
                                        ]},
                                    {type: "newcolumn"},
                                    {type: "combo", name: "parentesco", label: "Parentesco/Proximidade", required: true, style: "font-weight:bold;", options: [
                                            {value: "", text: "Selecione", selected: true},
                                            {value: "1", text: "Conjuge"},
                                            {value: "2", text: "Filho/a"},
                                            {value: "3", text: "Pai/Mãe"},
                                            {value: "4", text: "Sogro/a"},
                                            {value: "5", text: "Cunhado/a"},
                                            {value: "6", text: "Irmã(o)"},
                                            {value: "7", text: "Tio/a"},
                                            {value: "8", text: "Primo/a"},
                                            {value: "9", text: "Neto/a"},
                                            {value: "10", text: "Avó/ô"},
                                            {value: "11", text: "Parente"},
                                            {value: "12", text: "Amigo/a"},
                                            {value: "13", text: "Outro/a"}
                                        ]},
                                    {type: "newcolumn"},
                                    {type: "input", name: "telefone", label: "Telefone Cel.", offsetLeft: "10", style: "font-weight:bold;"}
                                ]},
                            {type: "block", list: [
                                    {type: "input", name: "ativacao", label: "Data da ativa&ccedil;&atilde;o", style: "font-weight:bold;", readonly:"true"},
                                    {type: "newcolumn"},
                                    {type: "label", name:"aviso_ativacao", offsetTop: "20"}
                                ]}
                        ]}
                ]},
            { type: "block", list: [
                    {type: "fieldset", name: "opcoes", label: "Informa&ccedil;&otilde;es complementares", list: [
                            { type: "settings", labelAlign: "left", inputHeight: "18", offsetLeft: "20", offsetTop: "2", position: "label-top"},
                            {type: "input", name: "emg_plano_saude", label: "Nome do plano de sa&uacute;de", inputWidth: "250", style: "font-weight:bold;"},
                            {type: "input", name: "emg_alergia_medicamentos", label: "Al&eacute;rgico a medicamentos / Quais?", inputWidth: "250", style: "font-weight:bold;"},
                            {type: "input", name: "emg_parente", label: "Em caso de emerg&ecirc;ncia quem contactar", inputWidth: "250", style: "font-weight:bold;"},
                            {type: "newcolumn"},
                            {type: "input", name: "emg_necessidade_especial", label: "Descreva as necessidades especiais", inputWidth: "250", style: "font-weight:bold;"},
                            {type: "input", name: "emg_remedio", label: "Usu&aacute;rio de medicamento controlado / Qual?", inputWidth: "250", style: "font-weight:bold;"},
                            {type: "input", name: "emg_parente_telefone", label: "N&uacute;mero do telefone", inputWidth: "250", style: "font-weight:bold;"},
                            {type: "newcolumn"},
                            {type: "combo", name: "emg_tipo_sanguineo", label: "Tipo sangu&iacute;neo", style: "font-weight:bold;", options: [
                                    {value: "", text: "Selecione", selected: true},
                                    {value: "1", text: "O +"},
                                    {value: "2", text: "A +"},
                                    {value: "3", text: "B +"},
                                    {value: "4", text: "AB +"},
                                    {value: "5", text: "O -"},
                                    {value: "6", text: "A -"},
                                    {value: "7", text: "B -"},
                                    {value: "8", text: "AB -"}
                                ]}
                        ]}
                ]},
            { type: "block", list: [
                    {type: "fieldset", name: "opcoes", label: "Moradores cadastrados na unidade", list: [
                            {type: "container", name: "gridfamiliares", inputWidth: 100, inputHeight: 180}
                        ]}
                ]}
        ]},
    {type: "newcolumn"},
    { type: "block", list: [
            {type: "fieldset", name: "opcoes", label: "Opera&ccedil;&otilde;es", list: [
                    {type: "button", name: "novo", value: "1. Cadastrar novo morador"},
                    {type: "button", name: "salvar", value: "2. Salvar dados do morador"},
                    {type: "button", name: "remover", value: "3. Apagar dados do morador"},
                    {type: "button", name: "finalizar", value: "4. Finalizar este cadastro"}
                ]},
            {type: "fieldset", name: "instrucoes", label: "Instru&ccedil;&otilde;es", list: [
                    { type: "block", list: [
                            {type: "template", name: "texto_instrucoes1", value: 'Cadastre primeiro o morador respons&aacute;vel pela unidade, desconsiderando o campo &quot;Parentesco&quot;, e feche esse cadastro clicando em &quot;Salvar dados do morador&quot;.', style: "color: #137da1; height: 80px;"},
                            {type: "template", name: "texto_instrucoes2", value: 'Para todos os demais moradores, clique em &quot;Cadastrar novo morador e continue preenchendo e salvando, de modo que todos apare&ccedil;am no bloco &quot;Moradores cadastrados da unidade&quot;.', style: "color: #137da1; height: 100px;"},
                            {type: "template", name: "texto_instrucoes3", value: 'Depois do cadastro de todos os moradores da unidade, clique em &quot;Finalizar este cadastro&quot;, para passar para outra p&aacute;gina.', style: "color: #137da1; height: 70px;"}
                        ]}
                ]}
        ]},
    {type: "hidden", name: "num"},
    {type: "hidden", name: "proprietario"}
];