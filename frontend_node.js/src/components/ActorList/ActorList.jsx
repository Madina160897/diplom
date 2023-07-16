import React, { FC, useState, useEffect } from "react";
import localhost from "../../common/api";
import { Link } from "react-router-dom"
import { inst, vk, tele, save, unsave } from "../../img/index"


const ActorList = (props) => {

  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('')
  console.log(search)
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPage = 6;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const user = JSON.parse(localStorage.getItem("user"));

  const getActors = async () => {
    fetch(localhost.BASE_URL + `/actors`)
      .then(response => response.json())
      .then(data => setActors(data))
      .finally(() => setIsLoading(false));
  };

  const postData = async (route, payload) => {
    fetch(localhost.BASE_URL + route, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: payload,
    }).catch(() => console.log("Error sending request"));
  };
  const followAd = (id) => {
    const userId = JSON.parse(localStorage.getItem("user"));
    const payload = {
      userId: userId._id,
      id
    };
    const jsonPayload = JSON.stringify(payload);
    postData("/users/follow", jsonPayload);
    userId.follows.push(payload);
    localStorage.setItem("user", JSON.stringify(userId));
  };

  const unFollowAd = (id) => {
    const userId = JSON.parse(localStorage.getItem("user"));
    const payload = {
      userId: userId._id,
      followedId: id,
    };
    const jsonPayload = JSON.stringify(payload);
    postData("/users/unfollow", jsonPayload);
    userId.follows = userId.follows.filter((item) => item.id !== id);
    localStorage.setItem("user", JSON.stringify(userId));
  };

  useEffect(() => {
    fetch(localhost.BASE_URL + "/actors")
      .then((res) => res.json())
      .then(
        (result) => {

          setActors(result);
        }
      )
      .finally(() => setIsLoading(false));
  }, [user]);

  if (isLoading) {
    return <h1>LOADING...</h1>;
  }

  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
    }
  }

  function nextPage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage + 1)
    }
  }

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
      <main>
        <div className="people-block df jc-sa fd-c ai-c">
          <div className="people-div df jc-sa ai-c">
            {actors.filter((item) => {
              return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
            }).slice(firstIndex, lastIndex).map((actor) => (
              <div key={actor._id} className='people-name'>
                <Link to={`/actors/${actor._id}`}>
                  <img className="card-img" src={actor.img} alt="" />
                  <h2>{actor.name}</h2>
                  <div>{actor.birth}</div>
                  <div>{actor.career}</div>
                </Link> <br />
                <div>
                  {user.follows.find((i) => i.id === actor._id) ? (
                    <div onClick={() => unFollowAd(actor._id)}><img className="acc" src={save} alt="" /></div>
                  ) : (
                    <div onClick={() => followAd(actor._id)}><img className="acc" src={unsave} alt="" /></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="page-box df fd-r jc-sa">
              <div className="box">
                <a href="#" onClick={prePage}> &lt; </a>
              </div>

              <div className="box">
                <a href="#" onClick={nextPage}> &gt; </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="df">
        <div className="df fd-r ai-c jc-sb h-100">

          <img className="img-logo" src="https://abrakadabra.fun/uploads/posts/2021-12/1639622317_6-abrakadabra-fun-p-tsvetok-sakuri-png-6.png" alt="" />
          <h2 className="logo">KOREAN DORAMS</h2>
        </div>

        <div className="web df fd-r jc-sa ai-c">
          <a href="">О нас</a>
          <a href="">Кантакты</a>
        </div>

        <div className="web df fd-r jc-sa ai-c">
          <a href="https://www.instagram.com/softbox_official/"> <img className="footer-img" src={inst} /></a>
          <a href="https://m.vk.com/softbox_official?from=groups"><img className="footer-img" src={vk} /></a>
          <a href="https://web.telegram.org/a/#-1293093420"><img className="footer-img" src={tele} /></a>
        </div>

      </footer>
    </div>
  );
};

export default ActorList;
