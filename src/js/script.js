window.onload = function () {


  var params = new URLSearchParams(window.location.search)
  //var grupo = params.get("grupo")
  window.cpf1 = validarCPF(params.get("cpf1"))
  window.cpf2 = validarParametro(params.get("cpf1"))
  window.idsegurado = validarParametro(params.get("idsegurado"))
  window.data_encerramento_grupo = validarParametro(params.get("data_encerramento_grupo"))
  const pepValor = validarParametro(params.get("pep"))
  pegarValorPeP(pepValor)

  const cota = validarParametro(params.get("cota"))
  const taxa = validarParametro(params.get("taxa"))
  const valorcredito = validarParametro(params.get("valorcredito"))
  const faixarenda = validarParametro(params.get("faixarenda"))
  pegarValorRenda(faixarenda)


  //Transformando valores em numeros
  const taxaNumerica = parseFloat(taxa.replace(',', '.'));
  const valorCreditoNumerico = parseFloat(valorcredito);
  const premio_mensal = (taxaNumerica * valorCreditoNumerico) / 100;
  window.valor_mes = String(premio_mensal)
  window.taxa = taxa
  window.valorcredito = valorcredito



  const premio_mensal_formatado = premio_mensal.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const grupo = validarParametro(params.get("grupo"))
  const StrongGrupoElemente = document.querySelector("#StrongGrupoVar")

  StrongGrupoElemente.textContent = grupo

  const StrongPremio_mensalElemente = document.querySelector("#StrongPremio_mensalVar")
  StrongPremio_mensalElemente.textContent = premio_mensal_formatado

  const StrongCotaElemente = document.querySelector("#StrongCotaVar")
  StrongCotaElemente.textContent = cota

  const dataDeNas = validarParametro(params.get("dataDeNas"))
  pegarDataCerta(dataDeNas)



  const cleanUrl = window.location.pathname + window.location.hash;
  window.history.replaceState(null, document.title, cleanUrl);
}

// const input = document.getElementById('renda');

//   input.addEventListener('input', function () {
//     let value = this.value;

//     // Remove tudo que não for número
//     value = value.replace(/\D/g, '');

//     // Se vazio, limpa o campo
//     if (value === '') {
//       this.value = '';
//       return;
//     }

//     // Converte para número (centavos)
//     const number = Number(value) / 100;

//     // Formata para Real Brasileiro
//     this.value = number.toLocaleString('pt-BR', {
//       style: 'currency',
//       currency: 'BRL'
//     });
//   });

const input = document.getElementById('renda');


function formatarRenda(el) {
  let value = el.value;

  // Remove tudo que não for número
  value = value.replace(/\D/g, '');

  // Se vazio, limpa o campo
  if (value === '') {
    el.value = '';
    return;
  }

  // Converte para número (centavos)
  const number = Number(value) / 100;

  // Formata para Real Brasileiro
  el.value = number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

// ao digitar
input.addEventListener('input', function () {
  formatarRenda(this);
});

function pegarDataCerta(elemento) {
  try {
    const [dia, mes, ano] = elemento.split(/[-/]/).map(Number);

    const data = new Date(ano, mes - 1, dia);

    const anoFormatado = data.getFullYear();
    const mesFormatado = String(data.getMonth() + 1).padStart(2, '0');
    const diaFormatado = String(data.getDate()).padStart(2, '0');

    const dataFormatada = `${anoFormatado}-${mesFormatado}-${diaFormatado}`;

    document.getElementById("nascimento").value = dataFormatada;
  } catch (error) {
    console.log("Ocorreu um erro na hora de pegar o valor da data de nascimento");
  }
}

function pegarValorRenda(elemento) {
  document.getElementById("renda").value = elemento
}

function getDeviceData() {
  const nav = navigator;

  const userAgent = nav.userAgent || '';
  const uaData = nav.userAgentData || null;

  const data = {
    // Básico
    languages: nav.languages || [],
    mobile: uaData?.mobile ?? /Mobile|Android|iPhone|iPad/i.test(userAgent),
    deviceType: getDeviceType(userAgent),
    browser: getBrowser(userAgent),
    os: getOS(userAgent),

    
    hardware: {
      cpuCores: nav.hardwareConcurrency || null,
      memoryGB: nav.deviceMemory || null,
      maxTouchPoints: nav.maxTouchPoints || 0
    },

    locate: Intl.DateTimeFormat().resolvedOptions().timeZone,
    localTime: new Date().toISOString()
    
  };

  return data;
}

function getDeviceType(ua) {
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  if (/mobile|android|iphone/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

function getBrowser(ua) {
  if (/edg/i.test(ua)) return 'Edge';
  if (/chrome|crios/i.test(ua)) return 'Chrome';
  if (/firefox|fxios/i.test(ua)) return 'Firefox';
  if (/safari/i.test(ua)) return 'Safari';
  return 'Unknown';
}

function getOS(ua) {
  if (/windows nt/i.test(ua)) return 'Windows';
  if (/android/i.test(ua)) return 'Android';
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
  if (/mac os x/i.test(ua)) return 'MacOS';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Unknown';
}



function pegarValorPeP(elemento) {
  try {
    const valor = elemento?.toLowerCase()
    if (valor === "sim") {
      document.getElementById("pep").value = "true";
    } else if (valor === "não" || valor === "nao") {
      document.getElementById("pep").value = "false";
    } else {
      console.warn("Valor inesperado:", valor);
    }
  } catch (erro) {
    console.error("Erro ao atualizar o campo PEP:", erro);
  }
}

function validarParametro(elemento) {
  if (elemento == null) {
    elemento = "valor não encontrado"
  }
  return elemento
}
function validarCPF(elemento) {

  document.getElementById('corpo').style.display = 'block';

  try {
    elemento = elemento.substring(0, 3);
    return elemento
  }
  catch (error) {
    console.log("deu erro :(")
    document.getElementById('sumir').style.display = 'none';
    document.getElementById('sumirDados').style.display = 'block';
  }
}

// ===== Utilitários =====
const qs = new URLSearchParams(location.search);
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const dataLayer = window.dataLayer = window.dataLayer || [];

// Prefill de campos por querystring
const prefillMap = { cpf: '#cpf', nome: '#nome', rg: '#rg', endereco: '#endereco', telefone: '#telefone', grupo: '#grupo', cota: '#cota', profissao: '#profissao', renda: '#renda', pep: '#pep', prazo: '#prazo', premio: '#preco', cep: '#cep', bairro: '#bairro', cidade: '#cidade', uf: '#uf', taxa: '#taxa', valorcredito: '#valorcredito' };

Object.entries(prefillMap).forEach(([k, sel]) => { const val = qs.get(k); if (val && $(sel)) { if (sel === '#preco') { $(sel).textContent = val; } else { $(sel).value = val; } } });

// UTM tracking
['utm_source', 'utm_medium', 'utm_campaign'].forEach(k => { const v = qs.get(k); if (v) $('#' + k).value = v; });

// Ano no rodapé
$('#ano').textContent = new Date().getFullYear();

// Máscara CPF
$('#cpf').addEventListener('input', e => { let v = e.target.value.replace(/\D/g, '').slice(0, 11); v = v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2'); e.target.value = v; });

// Validação CPF
function validaCPF(cpf) {
  return cpf === cpf1;
}

function data() {
  // horário de Brasília
  let agora = new Date();
  let options = { timeZone: "America/Sao_Paulo" };
  let dataBrasilia = new Date(agora.toLocaleString("en-US", options));

  // soma +3 horas
  dataBrasilia.setHours(dataBrasilia.getHours() + 3);

  // pega ano e hora
  let ano = dataBrasilia.getFullYear();
  let hora = dataBrasilia.getHours().toString().padStart(2, "0");

  // resto da data (dia e mês)
  let dia = dataBrasilia.getDate().toString().padStart(2, "0");
  let mes = (dataBrasilia.getMonth() + 1).toString().padStart(2, "0");

  // monta resultado: ANO + dia/mês + HORA
  let resultado = `${ano}${dia}${mes}${hora}`;

  return resultado;
}

function getFormattedDate() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // meses começam em 0
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function normalizarData(data) {
  if (!data || typeof data !== "string") return data;
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
    return data;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }
  return data;
}


// Idade (anos completos)
function idade(nasc) { const d = new Date(nasc); if (isNaN(+d)) return null; const t = new Date(); let i = t.getFullYear() - d.getFullYear(); const m = t.getMonth() - d.getMonth(); if (m < 0 || (m === 0 && t.getDate() < d.getDate())) i--; return i; }

function show(el) { el.classList.remove('hide'); }
function hide(el) { el.classList.add('hide'); }
function stepActive(n) { const dots = $$('.stepper .dot'); dots.forEach((d, i) => d.classList.toggle('active', i < n)); }

// Fluxo: validar CPF → buscar dados → mostrar formulário
$('#btnCpf').addEventListener('click', async () => {
  let cpf = $('#cpf').value.trim();
  if (!validaCPF(cpf)) { $('#cpfError').classList.remove('hide'); return; }
  $('#cpfError').classList.add('hide');
  $('#cpf_hidden').value = cpf.replace(/\D/g, '');

  hide($('#step-cpf'));
  show($('#form-adesao'));
  stepActive(2);
  dataLayer.push({ event: 'cpf_validado' });
  console.log(input)
  let novoValor = input
  novoValor.value = novoValor.value + '00'
  formatarRenda(input);
});

$('#btnLimpar').addEventListener('click', () => { $('#cpf').value = ''; $('#cpf').focus(); });

// Envio Opt‑in
$('#form-adesao').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nasc = $('#nascimento').value; const i = idade(nasc);
  // const prazo = parseInt($('#prazo').value || '0', 10);
  const prazo = 0
  const elegivel = i != null && i >= 14 && i <= 69 && (i + (isFinite(prazo) ? prazo / 12 : 0)) <= 78;
  if (!elegivel) { const box = $('#eligError'); box.textContent = i == null ? 'Preencha sua data de nascimento.' : 'Você não atende aos critérios de elegibilidade (idade e/ou prazo).'; box.classList.remove('hide'); box.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  if (!$('#consent').checked) { const box = $('#eligError'); box.textContent = 'Para continuar, aceite as Condições Gerais e o uso de dados (LGPD).'; box.classList.remove('hide'); return; }
  $('#eligError').classList.add('hide');

  function somarAno(anoAlvo) {
    const hoje = new Date();
    hoje.setFullYear(anoAlvo);

    const dd = String(hoje.getDate()).padStart(2, "0");
    const mm = String(hoje.getMonth() + 1).padStart(2, "0");
    const yyyy = hoje.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  }


    const DeviceData = getDeviceData();
    console.log(DeviceData);

  let rendaFinal = $('#renda').value
  rendaFinal = rendaFinal.replace("R$", "").trim()

  let dataDeEnvio = getFormattedDate()
  const valorDoTelefone = document.getElementById("telefone").value
  const ddd = valorDoTelefone.slice(0, 2)
  
  const valorDoNascimento = document.getElementById("nascimento").value
  const dataCorreta = normalizarData(valorDoNascimento)
  const nomeSocial = document.getElementById("nomesocial").value
  const dataFinal = somarAno(window.data_encerramento_grupo)

  const payload = {

    DadosDipositivos: DeviceData,
    idsegurado: idsegurado,
    dados: [{
      magalu_resposta_nome: $('#nome').value,
      magalu_resposta_nascimento: dataCorreta,
      magalu_resposta_rg: $('#rg').value,
      magalu_resposta_telefone: valorDoTelefone,
      magalu_resposta_ddd: ddd,
      magalu_resposta_endereco: $('#endereco').value,
      magalu_resposta_cidade: $('#cidade').value,
      magalu_resposta_bairro: $('#bairro').value,
      magalu_resposta_uf: $('#uf').value,
      magalu_resposta_cep: $('#cep').value,
      magalu_resposta_profissao: $('#profissao').value,
      magalu_resposta_renda: rendaFinal,
      magalu_resposta_grupo: $('#grupo').value,
      magalu_resposta_cota: $('#cota').value,
      magalu_resposta_optin: true,
      magalu_resposta_pep: $('#pep').value,
      magalu_resposta_data: dataDeEnvio,
      magalu_resposta_premio_de_seguro: window.valor_mes,
      magalu_resposta_taxa: window.taxa,
      magalu_resposta_valor_credito: window.valorcredito,
      magalu_resposta_cpf: cpf2,
      magalu_resposta_conf: true,
      magalu_resposta_datafim: dataFinal,
      magalu_resposta_nomeSocial: nomeSocial
    }]
  };



  try {
    // let token2 = "TWFnYWx1Okd2OUByTCF4RnoyI0twOHFOdCQxVXc2ZQ=="

    const btn = document.getElementById('btnOptIn');
    btn.disabled = true;
    btn.style.backgroundColor = '#f7b97a';
    btn.style.cursor = 'not-allowed';
    btn.textContent = 'Enviando...';

    const username = "Magalu";
    const password = "Gv9@rL!xFz2#Kp8qNt$1Uw6e";

    const credentials = btoa(`${username}:${password}`);

    let token = data()
    const r = await fetch('(URL_WEBHOOK_ENV)/(URL_SENDDATA_WEBHOOK_ENV)', { method: 'POST', headers: { "Content-Type": "application/json", "Authorization": `Basic ${credentials}`, "token": `${token}` }, body: JSON.stringify(payload) });


    if (!r.ok) throw new Error('Falha ao enviar');
  } catch (err) { const box = $('#eligError'); box.textContent = 'Não foi possível concluir agora. Tente novamente.'; box.classList.remove('hide'); return; }
  finally {
    document.getElementById('btnOptIn').disabled = false;
  }


  hide($('#form-adesao'));
  $('#okMsg').textContent = 'Obrigado! Enviaremos a confirmação e próximas etapas para seu e‑mail.';
  show($('#step-ok'));
  stepActive(3);
  dataLayer.push({ event: 'optin_enviado' });
});
