import {React, useState} from 'react'
import { Link } from "react-router-dom"

const MainPage = () => {
  const [search, setSearch] = useState('')
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
          <Link to='/author'>
            <span className="btn-logo">Выйти</span>
          </Link>
        </div>
      </header>

      <main className='people-div df jc-sa'>
      <Link to='/actors' >
      <div className='box-header'>
                <img className='img-main' src="https://cityspideynews.s3.amazonaws.com/uploads/spidey/202302/cover-(36)-1676883755.webp" alt="" />
              <h1> Актеры </h1>
            </div>
          </Link>
          <Link to='/doram'>
            <div className='box-header'>
                <img className='img-main' src="https://www.kpoppost.com/wp-content/uploads/2023/04/New-Korean-Dramas-in-May-2023-COVER-1140x570.jpg" alt="" />
              <h1> Дорам </h1>
            </div>
          </Link>
      </main>
        </>
    )
}

export default MainPage
