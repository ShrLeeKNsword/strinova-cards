import { useState, useRef } from 'react';
import './App.css';
import { Modal, Typography, Button, Col, Row, Input, ColorPicker, TextArea, Select, Tag } from '@douyinfe/semi-ui';
import * as htmlToImage from 'html-to-image';
import RankStars from './components/rank';

const { Title } = Typography;

function App() {
  const [cardData, setCardData] = useState({
    type: "SPECIAL",
    title: "我要竞技了",
    titleC: ColorPicker.colorStringToValue("#f1dd97"),
    titleSize: "45px",
    imglink: 'https://cdn.sa.net/2025/03/29/qUySEmBafkXF2jP.png',
    discribe: "每秒受到护甲与生命之和2%的伤害，增加2%伤害",
    discribeBGC: ColorPicker.colorStringToValue("#f4a460"),
    discribeSize: "30px",
    rank:1,
    rankMax:0,

  });
  const [tempCardData, setTempCardData] = useState(cardData);

  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
    setCardData(tempCardData);
  };
  const handleCancel = () => {
    setVisible(false);
    setTempCardData(cardData);
  };

  const fileInputRef = useRef<HTMLInputElement>(null); // 创建 ref

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempCardData({ ...tempCardData, imglink: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <>
      <Title style={{color:"rgba(var(--semi-grey-9), 1)"}}>卡丘卡牌生成器</Title><Tag size="large" color='amber'> V0.2 </Tag><Tag size="large" color='cyan' style={{marginLeft:"8px"}}> 2025.3.30 Ver </Tag>
      <div style={{width:"100%",height:"15px"}}></div>

      <div id="capture" style={{ width: "400px", height: "620px", backgroundColor: "grey", position: "relative", overflow: "hidden" }}>
        <div style={{ width: "100%", backgroundColor: "#8b8b8f" }}>
          <div style={{ width: "100%", height: "3px" }}></div>
          <div style={{ width: "max-content", height: "26px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", borderRadius: "13px", border: "2px solid black", boxShadow: "0 0 40px white" }}>
            <div style={{ marginLeft: "35px", marginRight: "35px" }}>{cardData.type}</div>
          </div>
          <div style={{ width: "100%", height: "3px" }}></div>
        </div>
        <div style={{ width: "100%", height: "310px", backgroundColor: "#c4c6c8", overflow: "hidden", position: "relative" }}>
          <img
            src={cardData.imglink}
            style={{
              height: "800px",
              position: "absolute",
              top: "-180px",
              left: "-220px",
              filter: "grayscale(100%) opacity(0.1)",
            }}
          />
          <img src={cardData.imglink} style={{ height: "380px", transform: "translateY(-40px)" }}></img>
        </div>
        <div style={{ width: "100%", height: "40px", backgroundColor: "black", overflow: "visible" }}>
          <div style={{
            color: cardData.titleC.hex, fontSize: cardData.titleSize, transform: "translateY(-18px)",
            textShadow: "2px 2px 5px black, -2px -2px 5px black, 2px -2px 5px black, -2px 2px 5px black",
          }}>{cardData.title}</div>
        </div>
        <div style={{ width: "100%", height: "200px", backgroundColor: cardData.discribeBGC.hex, display: "flex", alignItems: "center" }}>
          <div style={{ width: "100%", color: "white", textShadow: "0px 0px 5px black", fontSize: cardData.discribeSize, margin: "0 auto", marginLeft: "20px", marginRight: "20px", textAlign: "center" }}>
            {cardData.discribe}</div>
        </div>
        <RankStars rank={cardData.rank} rankMax={cardData.rankMax}/>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Button theme='solid' style={{ margin: "5px" }}
          onClick={() => {
            const MarkingCanvas = document.querySelector("#capture") as HTMLElement;
            htmlToImage
              .toPng(MarkingCanvas)
              .then((dataUrl) => {
                const Presentdate = new Date();
                const imgData = dataUrl;
                const link = document.createElement('a');
                link.href = imgData;
                const presenttime = Presentdate.getFullYear().toString() + (Presentdate.getMonth() + 1 < 10 ? "0" : "") + (Presentdate.getMonth() + 1).toString() + (Presentdate.getDate() < 10 ? "0" : "") + Presentdate.getDate().toString() + Presentdate.getHours().toString() + Presentdate.getMinutes().toString() + Presentdate.getSeconds().toString();
                link.download = 'Card_' + presenttime + '.png';
                link.click();
              })
              .catch((error) => {
                console.error('Error generating image:', error);
              });
          }}
        >
          保存图片</Button>
        <Button theme='solid' style={{ margin: "5px" }} onClick={showDialog}>修改属性</Button>
        <Button theme='solid' style={{ margin: "5px" }} onClick={() => { open("https://space.bilibili.com/403314450", "_blank") }}>作者B站</Button>

        <div style={{color:"rgba(var(--semi-grey-9), 1)"}}>本项目遵循MIT开源 <a href='https://github.com/ShrLeeKNsword/strinova-cards'>Github仓库</a></div>

        <Modal
          title="修改属性"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          closeOnEsc={true}
          footerFill={true}
          keepDOM={true}
        >
          <Row>
            <Col span={6} style={{ marginTop: "3px" }}>类型</Col>
            <Col span={18}><Input value={tempCardData.type}
              onChange={(e) => {
                setTempCardData({ ...tempCardData, type: e });
              }}
            ></Input></Col>
          </Row>
          <Row style={{ marginTop: "8px" }}>
            <Col span={6} style={{ marginTop: "3px" }}>名称</Col>
            <Col span={18}><Input value={tempCardData.title}
              onChange={(e) => {
                setTempCardData({ ...tempCardData, title: e });
              }}></Input></Col>
          </Row>
          <Row style={{ marginTop: "8px" }}>
            <Col span={6} style={{ marginTop: "3px" }}>名称字号</Col>
            <Col span={18}>
              <Select style={{ width: 120 }}
                value={tempCardData.titleSize}
                onChange={(e: any) => {
                  setTempCardData({ ...tempCardData, titleSize: e });
                }}>
                <Select.Option value="45px">标准</Select.Option>
                <Select.Option value="35px">中号</Select.Option>
                <Select.Option value="30px">小号</Select.Option>
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: "8px" }}>
            <Col span={6} style={{ marginTop: "3px" }}>标题字体颜色</Col>
            <Col span={18}><ColorPicker
              value={tempCardData.titleC}
              onChange={(value) => {
                setTempCardData({ ...tempCardData, titleC: value });
              }}
              alpha={true}
              usePopover={true}
            /></Col>
          </Row>
          <Row style={{ marginTop: "8px" }}>
            <Col span={6} style={{ marginTop: "3px" }}>描述</Col>
            <Col span={18}><TextArea maxCount={75} value={tempCardData.discribe} autosize={{ minRows: 1, maxRows: 4 }}
              onChange={(e) => {
                setTempCardData({ ...tempCardData, discribe: e });
              }}></TextArea></Col>
          </Row>
          <Row style={{ marginTop: "8px" }}>
            <Col span={6} style={{ marginTop: "3px" }}>描述字号</Col>
            <Col span={18}>
              <Select style={{ width: 120 }}
                value={tempCardData.discribeSize}
                onChange={(e: any) => {
                  setTempCardData({ ...tempCardData, discribeSize: e });
                }}>
                <Select.Option value="30px">标准</Select.Option>
                <Select.Option value="28px">中号</Select.Option>
                <Select.Option value="25px">小号</Select.Option>
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: "8px" }}>
            <Col span={6} style={{ marginTop: "3px" }}>描述背景颜色</Col>
            <Col span={18}><ColorPicker
              value={tempCardData.discribeBGC}
              onChange={(value) => {
                setTempCardData({ ...tempCardData, discribeBGC: value });
              }}
              alpha={true}
              usePopover={true}
            /></Col>
          </Row>
          <Row style={{ marginTop: "8px" }}>
            <Col span={6} style={{ marginTop: "3px" }}>最大星数</Col>
            <Col span={18}>
              <Select style={{ width: 120 }}
                value={tempCardData.rankMax}
                onChange={(e: any) => {
                  setTempCardData({ ...tempCardData, rankMax: e });
                }}>
                <Select.Option value={0}>禁用</Select.Option>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={3}>3</Select.Option>
                <Select.Option value={4}>4</Select.Option>
                <Select.Option value={5}>5</Select.Option>
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: "8px" }}>
            <Col span={6} style={{ marginTop: "3px" }}>星数</Col>
            <Col span={18}>
              <Select style={{ width: 120 }}
                value={tempCardData.rank}
                disabled={tempCardData.rankMax === 0}
                onChange={(e: any) => {
                  setTempCardData({ ...tempCardData, rank: e });
                }}>
                <Select.Option value={0}>0</Select.Option>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={3}>3</Select.Option>
                <Select.Option value={4}>4</Select.Option>
                <Select.Option value={5}>5</Select.Option>
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: "8px" }}>
            <Col span={6} style={{ marginTop: "3px" }}>图像</Col>
            <Col span={18}>
              <button
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click(); // 触发文件输入元素的点击事件
                  }
                }}

              ><img src={tempCardData.imglink} style={{ width: "180px", height: "180px" }} /></button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }} // 隐藏文件输入元素
              />
            </Col>
          </Row>
        </Modal>
      </div>
    </>
  )
}

export default App;