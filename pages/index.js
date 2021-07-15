import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'


function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`http://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (<ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">

      {propriedades.title} ({propriedades.items.length})
    </h2>
    <ul>
      {propriedades.items.slice(0, 6).map((itemAtual) => {
        return (
          <li key={itemAtual.id}>
            <a href={itemAtual.html_url}>
              <img src={itemAtual.avatar_url} />
              <span>{itemAtual.login}</span>
            </a>
          </li>
        )
      })}
    </ul>
  </ProfileRelationsBoxWrapper>
  )
}



export default function Home() {
  const githubUser = 'west3k'
  const [comunidades, setComunidades] = React.useState([{
  }]);
  const pessoasFavoritas = ['juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'gustavoguanabara',
    'marcobrunodev',
    'peas'
  ];

  //0- Pegar o array de dados do github
  //1- Cria um box que vai ter um map, baseado dos itens do array
  // retornados do github
  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function () {
    fetch('https://api.github.com/users/peas/followers')
      .then(function (res) {

        if (res.ok) {
          return res.json()
        }
        throw new Error('Deu problema aqui: ' + res.status)
      })
      .then(function (resConvertida) {
        setSeguidores(resConvertida)
      })
      .catch((erro) => {
        console.log(erro)
      })



    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '50e206eded7e875d41a0eb090847c7',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
          allCommunities {
            title
            id
            imageUrl
            linkUrl
            creatorSlug
          }
        }`})
    })
      .then((res) => res.json()) // Pega o retorno do response.json() e já retorna
      .then((resCompleta) => {
        const comunidadesDato = resCompleta.data.allCommunities
        setComunidades(comunidadesDato)
      })
  }, []);



  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem Vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'))
              console.log('CampoImage: ', dadosDoForm.get('image'))
              console.log('CampoLink: ', dadosDoForm.get('link'))

              const comunidade = {
                title: dadosDoForm.get('title'),
                link_url: dadosDoForm.get('link'),
                image_url: dadosDoForm.get('image'),
                creator_slug: githubUser,
              }

              fetch("/api/comunidades", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado)
                  const comunidade = dados.registroCriado
                })
               const comunidadesAtualizadas = [...comunidades, comunidade];
               setComunidades(comunidadesAtualizadas)
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>

              <div>
                <input
                  placeholder="Coloque uma URL para capa"
                  name="image"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>

              <div>
                <input
                  placeholder="Gostaria de adicionar um link externo para a Comunidade?"
                  name="link"
                  aria-label="Link da Comunidade"
                  type="text"
                />
              </div>


              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>


          <ProfileRelationsBox title="Seguidores" items={seguidores} />

          <ProfileRelationsBoxWrapper>

            <h2 className="smallTitle"> Comunidades ({comunidades.length})</h2>

            <ul>
              {comunidades.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={itemAtual.linkUrl}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>


          <ProfileRelationsBoxWrapper>

            <h2 className="smallTitle"> Pessoas da comunidade ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

        </div>
      </MainGrid>
    </>
  )
}