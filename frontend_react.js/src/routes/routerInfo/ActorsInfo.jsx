import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import localhost from "../../common/api";

const ActorsInfo = () => {
  const { actorsId } = useParams();
  const [actor, setActor] = useState({});
  const [search, setSearch] = useState('')
  const navigate = useNavigate();

  const getActor = async () => {
    fetch(localhost.BASE_URL + `/actors/${actorsId}`)
      .then(response => response.json())
      .then(data => setActor(data));
  };

  useEffect(() => {
    getActor()
  }, []);
  return (
    <>
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
            <img className="img-info" src={actor.img} />
          </div>
          <div className="block-info-actor df fd-c jc-c ai-c" key={actor.id}>
            <h3>
              Актер: <b>{actor.name}</b>
            </h3>
            <h3>
              День рождение: <b>{actor.birth}</b>
            </h3>
            <h3>
              Карера: <b>{actor.career}</b>
            </h3>
            <h3>
              Рост: <b>{actor.height}</b>
            </h3>
            <h3>
              Место рождение: <b>{actor.placeofbirth}</b>
            </h3>
            <button style={{color: "black"}} onClick={() => navigate("/actors")}>Назад</button>
          </div>
        </div>
      </div>
      </>
      );
}

      export default ActorsInfo
