import dataFormater from "../../utils/dataFormater.js"

export default function ContentRenderer({ data }){
    return(
        <div>
            {
                data.length === 0 ? "No data yet..." :data.map((news)=> <RenderNews news={news} key={news.id}/>)
            }
        </div>
    )
}

function RenderNews({news}){
    const tzOffset = (new Date()).getTimezoneOffset() * 60000; 
    const actualDate = new Date(Date.now()- tzOffset).toISOString().split(',')[0].slice(0,10);
    const { spTime, date } = dataFormater(news.date)
    return (
      <div>
        <h4>
          {
            actualDate === date ? spTime+" " : date.split("-").reverse().join("-")+" "
          }
          - RTS - <a href={news.url} target="_blank">{news.title}</a></h4>
      </div>
    )
  }