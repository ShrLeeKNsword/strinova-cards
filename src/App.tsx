import { useState } from 'react'
import './App.css'
import { Typography, Button } from '@douyinfe/semi-ui';

const { Title } = Typography;

function App() {
  const [cardData, setCardData] = useState({
    type: "SPECIAL",
    title: "我要竞技了",
    discribe: "每秒受到护甲与生命之和2%的伤害，增加2%伤害",
  })
  return (
    <>
      <Title>卡丘卡牌生成器</Title>

      <div id="capture" style={{ width: "400px", height: "620px", backgroundColor: "grey", marginTop: "20px", position: "relative" }}>
        <div style={{ width: "100%", backgroundColor: "#8b8b8f" }}>
          <div style={{ width: "100%", height: "3px" }}></div>
          <div style={{ width: "max-content", height: "26px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", borderRadius: "13px", border: "2px solid black", boxShadow: "0 0 40px white" }}>
            <div style={{ marginLeft: "35px", marginRight: "35px" }}>{cardData.type}</div>
          </div>
          <div style={{ width: "100%", height: "3px" }}></div>
        </div>
        <div style={{ width: "100%", height: "310px", backgroundColor: "#c4c6c8", overflow: "hidden", position: "relative" }}>
          <img
            src='https://cdn.sa.net/2025/03/29/qUySEmBafkXF2jP.png'
            style={{
              height: "800px",
              position: "absolute",
              top: "-180px",
              left: "-220px",
              filter: "grayscale(100%) opacity(0.1)",
            }}
          />
          <img src='https://cdn.sa.net/2025/03/29/qUySEmBafkXF2jP.png' style={{ height: "380px", translate: "0px -40px" }}></img>
        </div>
        <div style={{ width: "100%", height: "40px", backgroundColor: "black", overflow: "visible" }}>
          <div style={{
            color: "#f1dd97", fontSize: "45px", translate: "0px -18px",
            textShadow: "2px 2px 5px black, -2px -2px 5px black, 2px -2px 5px black, -2px 2px 5px black",
          }}>{cardData.title}</div>
        </div>
        <div style={{ width: "100%", height: "200px", backgroundColor: "#f4a460", display: "flex", alignItems: "center" }}>
          <div style={{ width: "100%", color: "white", textShadow: "0px 0px 5px black", fontSize: "30px", margin: "0 auto", marginLeft: "20px", marginRight: "20px", textAlign: "center" }}>
            {cardData.discribe}</div>
        </div>
      </div>

      <div style={{marginTop: "20px"}}>
        <Button theme='solid' style={{margin: "5px"}}>保存图片</Button>
        <Button theme='solid' style={{margin: "5px"}}>修改信息</Button>
      </div>
    </>
  )
}

export default App