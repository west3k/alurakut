import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

  if (request.method === 'POST') {

    const TOKEN = 'bc9562b5bc3b5e6542a0ce9cc9b158';
    const client = new SiteClient(TOKEN);

    //Validar os dados, antes de sair cadastrando
    const registroCriado = await client.items.create({
      itemType: "968159", //ID do Model de "Comunidades criado pelo Dato"
      ...request.body,
      // title: "Comunidade Teste",
      // imageUrl: "https://github.com/west3k.png",
      // linkUrl: "https://github.com/west3k",
      // creatorSlug: "weszwes"
    })

    response.json({
      dados: 'Algum dado qualquer',
      registroCriado: registroCriado
    })
    return;
  }


  response.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST tem!'
  }) 
}