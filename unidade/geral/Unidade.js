let Unidade = function (unidade) {

    this.Params = unidade;

    this.Adicionar = function (info, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'insert',
                fields: info,
                from: 'condominio.unidades',
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
                from: 'condominio.unidades',
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
                from: 'condominio.unidades',
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
                from: 'condominio.unidade_info',
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

    this.Listar = function (id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: 'num,nome,nascimento',
                from: 'condominio.unidades',
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

Unidade.prototype.form = [
    {type:'settings', position:'label-top'},
    {type: "radio", name: "situacao", value: 1, label: "O meu im&oacute;vel pr&oacute;prio", tooltip: "Marque esta opção se você é o propriet&aacute;rio do imóvel", list:[
        {type: "input", required: true, name: "nome_proprietario", label: "Nome do propriet&aacute;rio", tooltip: "Informe o nome do propriet&aacute;rio."},
        {type: "input", name: "rg", required: true, label: "Doc. de identifica&ccedil;&atilde;o", tooltip: "Informe o n&uacute;mero de RG ou RNE ou passaporte", info: true},
        {type: "input", required: true, name: "telefone_proprietario", label: "Telefone"},
        {type: "input", required: true, name: "email_proprietario", label: "E-mail", tooltip: "Informe o Endere&ccedil;o de e-mail do propriet&aacute;rio, para que ele possa receber comunicados do Condomm&iacute;nio.", info: true, note: {text: "Endere&ccedil;o de e-mail do propriet&aacute;rio"}}
    ]},
    {type: "radio", name: "situacao", value: 2, label: "O meu im&oacute;vel alugado", tooltip: "Marque esta opçãoo para informar os dados de contato com o propriet&aacute;rio do imóvel", list:[
        {type: "input", required: true, name: "imobiliaria", label: "Nome da imobili&aacute;ria",  tooltip: "Preencha este campo para que possamos fornecer eventuais comunicados de procedimentos internos do Condomm&iacute;nio.", info: true, note: {text: "Informe o nome da imobili&aacute;ria e a sua localiza&ccedil;&atilde;o. Exemplo: im&oacute;vel blueimovel - S&atilde;o Bernardo"}},
        {type: "input", required: true, name: "nome_proprietario_imobiliaria", label: "Nome do propriet&aacute;rio", tooltip: "Informe o nome do propriet&aacute;rio que está disponível no contrato de aluguel do imóvel."},
        {type: "input", name: "telefone_imobiliaria", label: "Telefone", tooltip: "Informe o n&uacute;mero do telefone da imobili&aacute;ria.", info: true, note: {text: "N&uacute;mero do telefone da imobili&aacute;ria com DDD"}},
        {type: "input", name: "telefone_proprietario_imobiliaria", label: "Telefone"},
        {type: "input", required: true, name: "email_proprietario_imobiliaria", label: "E-mail", tooltip: "Informe o Endere&ccedil;o de e-mail do propriet&aacute;rio, para que ele possa receber comunicados do Condomm&iacute;nio.", info: true, note: {text: "Endere&ccedil;o de e-mail do propriet&aacute;rio"}}
    ]},
    {type: "input", name: "email_correspondencias", label: "E-mail para comunicar chegada de nova correspondência", required: true, tooltip: "Informe o endereço de e-mail que será utilizado pela equipe de correspondência para avisar que chegou novas encomendas. Caso exista mais de um utilize vírgula para separar os endereços", info: true, note: {text: "Informe o(s) endereços de e-mail. Exemplo: contato@morador.com.br, morador@apartamento.com.br "}},

];