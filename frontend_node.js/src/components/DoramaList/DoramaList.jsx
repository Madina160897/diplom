import React, { FC, useState, useMemo } from "react";
import localhost from "../../common/api";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { inst, vk, tele, save, unsave } from "../../img/index"
import MySelect from ".";



const DoramsList = () => {

  const [dorams, setDorams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPage = 6;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedSort, setSelectedSort] = useState("");


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
    fetch(localhost.BASE_URL + "/doram")
      .then((res) => res.json())
      .then(
        (result) => {

          setDorams(result);
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

  const filterDoram = dorams.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.toLocaleLowerCase())
    );
  });

  const doramsAll = getSortDorams();
  function getSortDorams() {
    if (selectedSort) {
      return [...filterDoram].sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
    }
    return filterDoram;
  }
  const sortDorams = (sort) => {
    setSelectedSort(sort);
  };



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

        <MySelect className="sort-name"
              value={selectedSort}
              onChange={sortDorams}
              defaultValue={"Все"}
              options={[
                { value: "genre", name: "Жанры"},
                { value: "title", name: "Название дорам"}
              ]}
            />

          <div className="people-div df jc-sa ai-c">
            

            {doramsAll.slice(firstIndex, lastIndex).map((doram) => (
              <div key={doram._id} className='people-name'>
                <Link to={`/doram/${doram._id}`}>
                  <img className="card-img" src={doram.img} alt="" />
                  <div className="gen-rat">
                    <div>{doram.genre}</div>
                    <div>{doram.rating}</div>
                  </div>
                  <div className="title">{doram.title}</div>
                  <div className="year-doram">Год выпуска: {doram.year} </div>
                </Link> <br />
                
                <div>
                  {user.follows.find((i) => i.id === doram._id) ? (
                    <div onClick={() => unFollowAd(doram._id)}><img className="acc" src={save} alt="" /></div>
                  ) : (
                    <div onClick={() => followAd(doram._id)}><img className="acc" src={unsave} alt="" /></div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div >
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
      </main >

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
    </div >
  );
};

export default DoramsList;
