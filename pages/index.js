import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'


function ProfileSidebar(propriedades){
  return (
    <Box>
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}}/>
    </Box>
  )
}


export default function Home() {
  const githubUser = 'west3k'
  const pessoasFavoritas = ['juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini', 
    'gustavoguanabara',
    'marcobrunodev']

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style= {{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>

        <div className="welcomeArea" style= {{ gridArea: 'welcomeArea'}}>
          <Box className="title">
            <h1>Bem Vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>

        <div className="profileRelatioinsArea" style= {{ gridArea: 'profileRelatioinsArea'}}>

          <ProfileRelationsBoxWrapper>

            <h2 className="smallTitle"> Pessoas da comunidade ({pessoasFavoritas.length})</h2>

            <ul>
              {pessoasFavoritas.map((itemAtual)=>{
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
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
