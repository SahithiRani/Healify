import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../Home/Header";
import newsstyles from "./News.module.css";
import Search  from "./SearchNews";
 const News= () => {
  const [data, setData] = useState();
  const [alldata, setallData] = useState();
  const apiKey = "41dd8c7e43b8464296e19c0e8e647b72";
  const query="mental-health+OR+literature+OR+vacation";
  const [term,setterm]=useState({query});
  useEffect(() => {
    if(term!=query){
      axios
      .get(
        `https://newsapi.org/v2/everything?q=${query}&from= &language=en&sortBy=relevancy&apiKey=${apiKey}`
      )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
    }
  },[]);
  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${term}&from= &language=en&sortBy=relevancy&apiKey=${apiKey}`
      )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [term]);
  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=${apiKey}`
      )
      .then((response2) => setallData(response2.data))
      .catch((error2) => console.log(error2));
  }, []);
  return (
    <>
      <Header />
        <div className={newsstyles.showcase}>
          <div className={newsstyles.overlay+" "+"px-5"}>
            <div className="text-4xl font-bold text-white mb-4 text-center" >
            <h1>News Articles</h1>
            </div>
           <Search  searchtext={(text)=>{setterm(text)}} className="px-5 pt-10 pb-20 "/>
          </div>
        </div>
        <div className={newsstyles.bodyy}>
        <h4 className="px-5 pt-10 pb-20 ">Suggested articles:</h4>
        <div className={newsstyles.all__news}>
          {data
            ? data.articles.map((news) => (
                 <div className={newsstyles.news}>
                 <img
                   src={news.urlToImage}
                   className={newsstyles.news__image}
                   alt="Not Found" onerror="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX9JgRB8c-unjPmV8cuIw2S_kGq3uMI21CkA&usqp=CAU'" />
                 <h3 className={newsstyles.news__title}>{news.title}</h3>
                 <p className={newsstyles.news__desc}>
                   {news.description}
                    <a href={news.url} className={newsstyles.readmore} target="_blank" rel="noreferrer"> Read more </a>
                 </p>
                 <span className={newsstyles.news__author}>{news.author}</span> <br />
                 <span className={newsstyles.news__published}>{news.publishedAt}</span>
                 <span className={newsstyles.news__source}>{news.source.name}</span>
               </div>)): "Loading"}
               </div>
               <h4> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other articles:</h4>
              <div className={newsstyles.all__news}>
          {alldata
            ? alldata.articles.map((news) => (
                 <div className={newsstyles.news}>
                 <img
                   src={news.urlToImage}
                   className={newsstyles.news__image}
                   alt="news" />
                 <h1 className={newsstyles.news__title}>{news.title}</h1>
                 <p className={newsstyles.news__desc}>
                   {news.description}
                    <a href={news.url} className={newsstyles.readmore} target="_blank" rel="noreferrer"> Read more </a>
                 </p>
                 <span className={newsstyles.news__author}>{news.author}</span> <br />
                 <span className={newsstyles.news__published}>{news.publishedAt}</span>
                 <span className={newsstyles.news__source}>{news.source.name}</span>
               </div>)): "Loading"}
                </div>
                </div>
                </>
  );
};
export default News;