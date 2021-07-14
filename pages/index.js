import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'


function ProfileSidebar(propriedades){
  return (
    <Box as="aside">
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}}/>
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

function ProfileRelationsBox(propriedades){
  return(<ProfileRelationsBoxWrapper>
          <h2 className="smallTitle"> 
          
            {propriedades.title} ({propriedades.items.length})
          </h2>
          <ul>
              {propriedades.items.slice(0,6).map((itemAtual)=>{
                    return (
                    <li key={itemAtual.id}>
                      <a href={itemAtual.html_url}>
                        <img src={itemAtual.avatar_url}/>
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
    
    id: '132464616847961687461',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    link: 'https://www.orkut.br.com/MainCommunity?cmm=10000'
  },
  {
    
    id: '132464616844654967462',
    title: 'Rock Forever',
    image: 'https://image.freepik.com/vetores-gratis/rock-para-sempre_42186-172.jpg',
    link: 'https://open.spotify.com/playlist/37i9dQZF1DXcmaoFmN75bi'
  },
  {
    
    id: '132464616844651324684',
    title: 'Respondo ao Boa Noite do JN',
    image: 'https://static1.purepeople.com.br/articles/6/27/60/56/@/3136229-fatima-bernardes-falou-sobre-sua-relacao-950x0-1.jpg',
    link: 'https://www.orkut.br.com/MainCommunity?cmm=26836'
  },
  {
    
    id: '1324646168446549123455',
    title: 'Eu tenho medo do PLANTÃO',
    image: 'https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3089845:1621954133/plantao.jpg?f=16x9&h=720&q=0.8&w=1280&$p$f$h$q$w=6826d41',
    link: 'https://tvefamosos.uol.com.br/noticias/redacao/2020/04/17/afinal-por-que-o-plantao-da-globo-causa-sempre-tanto-panico.htm'
  },
  {
    
    id: '132641416844654967462',
    title: 'Minha Playlist',
    image: 'https://scontent.fuba2-1.fna.fbcdn.net/v/t1.6435-9/178524829_3996459867055890_7691373222083781833_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFfCtvTDyG2cjFlpC656ag_nsWoOgiGZqiexag6CIZmqLCMmhNqGwIe-J2wSm9HXnlVOlnyA02vRUxOq9x-K0Do&_nc_ohc=FCjLk96Vj9oAX-EWb1C&_nc_ht=scontent.fuba2-1.fna&oh=a66b857bcd8be3ddf0014e1206481276&oe=60F4A08A',
    link: 'https://open.spotify.com/playlist/1KPNf2RgVpflpeHdbkHwkL'
    
  }
]);
  const pessoasFavoritas = ['juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini', 
    'gustavoguanabara',
    'marcobrunodev',
    'peas'
  ];

  //0- Pegar o array de dados do github
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function(){
      fetch('https://api.github.com/users/peas/followers')
      .then(function(res){
      
          if(res.ok){
              return res.json()
          }
          throw new Error('Deu problema aqui: ' + res.status)
      })
      .then(function(resConvertida){
        setSeguidores(resConvertida)
      })
      .catch((erro)=>{
          console.log(erro)   
    })
  }, [])
  //1- Cria um box que vai ter um map, baseado dos itens do array
  // retornados do github

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style= {{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>

        <div className="welcomeArea" style= {{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem Vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();

              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'))
              console.log('Campo: ', dadosDoForm.get('image'))

              const comunidade = {
                id: new Date().toISOString(),
                titulo: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }
              const comunidadesAtualizadas = ([...comunidades, comunidade])
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

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style= {{ gridArea: 'profileRelationsArea'}}>


        <ProfileRelationsBox title="Seguidores" items={seguidores} />

        <ProfileRelationsBoxWrapper>

          <h2 className="smallTitle"> Comunidades ({comunidades.length})</h2>

              <ul>
                {comunidades.slice(0,6).map((itemAtual)=>{
                  return (
                    <li key={itemAtual.id}>
                      <a href={itemAtual.link}>
                        <img src={itemAtual.image}/>
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
              {pessoasFavoritas.slice(0,6).map((itemAtual)=>{
                return (
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`}/>
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
