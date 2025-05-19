const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');

const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.post('/agendar_consulta', (req, res) => {
  const dados_consulta = req.body;

  // Flags para selects
  dados_consulta.selectedClinicaBrasilia = dados_consulta.clinica === 'Clínica Brasília';
  dados_consulta.selectedClinicaTaguatinga = dados_consulta.clinica === 'Clínica Taguatinga';
  dados_consulta.selectedClinicaCeilandia = dados_consulta.clinica === 'Clínica Ceilândia';

  dados_consulta.selectedOrtopedia = dados_consulta.especialidade === 'Ortopedia';
  dados_consulta.selectedCardiologia = dados_consulta.especialidade === 'Cardiologia';
  dados_consulta.selectedPediatria = dados_consulta.especialidade === 'Pediatria';

  let form_invalido = false;
  let campos_invalidos = [];

  // Campos obrigatórios exceto observacao
  const camposObrigatorios = ['nome', 'sobrenome', 'cpf', 'data_nascimento', 'telefone', 'cep', 'endereco', 'clinica', 'especialidade', 'data_consulta', 'hora_consulta'];

  camposObrigatorios.forEach(campo => {
    if (!dados_consulta[campo] || dados_consulta[campo].trim().length === 0) {
      form_invalido = true;
      campos_invalidos.push(campo.charAt(0).toUpperCase() + campo.slice(1).replace('_', ' '));
    }
  });

  // Validação da data da consulta: deve ser > data atual (hoje)
  if (dados_consulta.data_consulta) {
    const dataConsulta = new Date(dados_consulta.data_consulta);
    const hoje = new Date();
    // Zerando horas para comparar só a data
    hoje.setHours(0, 0, 0, 0);

    if (dataConsulta <= hoje) {
      form_invalido = true;
      campos_invalidos.push('Data da consulta (deve ser futura)');
    }
  }

  res.render('index.html', { form_invalido, campos_invalidos, dados_consulta });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});
w