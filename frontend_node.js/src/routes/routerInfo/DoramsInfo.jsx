import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import localhost from "../../common/api";
import { like, dislike } from "../../img/index"


const DoramsInfo = () => {
  const { doramsId } = useParams()
  const [doram, setDoram] = useState({});
  const [search, setSearch] = useState('')
  const navigate = useNavigate();
  
  const getDoram = async () => {
    fetch(localhost.BASE_URL + `/doram/${doramsId}`)
    .then(response => response.json())
    .then(data => setDoram(data))
    
  };
 
  useEffect(() => {
    getDoram()
    
  }, []);

  return (
    <div>
      <header className="header-page df jc-sb ai-c">
        <div className="df fd-r ai-c jc-sb h-100">
          <img className="img-logo" src="https://abrakadabra.fun/uploads/posts/2021-12/1639622317_6-abrakadabra-fun-p-tsvetok-sakuri-png-6.png" alt="" />
          <h2 className="logo">KOREAN DORAMS</h2>
        </div>
        <div className="logo-title df fd-r ai-c jc-sa">
          <Link to='/main'>
            <div>
              <div> Главный </div>
            </div>
          </Link>
          <Link to='/doram'>
            <div>
              <div> Дорамы </div>
            </div>
          </Link>
          <Link to='/actors'>
            <div>
              <div> Актеры </div>
            </div>
          </Link>
        </div>
        <Link to=''>
          <input onChange={(e) => setSearch(e.target.value)} className="input-search" type="text" placeholder="Поиск" />
        </Link>
        <div className="logo-exit df fd-r ai-c jc-sa">
          <Link to='/'>
            <span className="btn-logo">Выйти</span>
          </Link>
        </div>
      </header>
      <div className="doram-block ">
        <div className="df jc-sa fd-r ai-c">
          <div style={{ width: 300 }}>
            <img className="img-info" src={doram.img} />
          </div>
          <div className="block-info" key={doram.idD}>
            <h1>{doram.title}</h1>
            <div>{doram.titleLang}</div>
            <div>
              <b>Описание: </b> <div> {doram.description}</div> <br />
            </div>
            <div> <b> Год выпуска:</b> {doram.year}</div> <br />
            <div><b>Количество серий:</b> {doram.numberofepisodes}</div> <br />
            <div> <b>Продолжительность:</b> {doram.duration}</div> <br />
            <div><b>Жанр:</b> {doram.genre}</div> <br />
            <div><b>Страна:</b> {doram.country}</div> <br />
            <div><b>Рейтинг:</b> {doram.rating}</div> <br />
            <div >
             <br />
              <button onClick={() => navigate("/doram")}>Назад</button>
            </div>
          </div>
          {/* {doram.actor.map((i, index) => (
            <p key={index}> {i.name}</p>
          ))} */}
         
        
        </div>
        <div className="df jc-c mt-20">
            <video width="750" height="500" controls >
              <source src={doram.video} type="video/mp4" />
            </video>
          </div>
      </div>

      
    </div>
  );
}

export default DoramsInfo
