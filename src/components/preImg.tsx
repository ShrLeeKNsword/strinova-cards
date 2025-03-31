import { Button, Modal, Tabs, TabPane } from "@douyinfe/semi-ui";
import React, { useState } from 'react';
import Shenghuaka from "../data/分类_生化卡牌 - 卡拉彼丘WIKI_BWIKI_哔哩哔哩.json"
import StrinovaEmoji from "../data/分类_表情包 - 卡拉彼丘WIKI_BWIKI_哔哩哔哩.json"
import Achievements from "../data/分类_成就图标 - 卡拉彼丘WIKI_BWIKI_哔哩哔哩.json"
import PaintInk from "../data/分类_喷漆 - 卡拉彼丘WIKI_BWIKI_哔哩哔哩.json"
import Xunzhang from "../data/分类_勋章 - 卡拉彼丘WIKI_BWIKI_哔哩哔哩.json"

interface PreImgProps {
    onFinish: (result: any) => void;
}

const PreImg: React.FC<PreImgProps> = ({ onFinish }) => {

    const [visible, setVisible] = useState(false);
    const [imgLink, setimgLink] = useState("https://patchwiki.biligame.com/images/klbq/b/bb/nja9di318oabxiw3juwp628k08ut8af.png");
    const [tempImgLink, setTempimgLink] = useState("https://patchwiki.biligame.com/images/klbq/b/bb/nja9di318oabxiw3juwp628k08ut8af.png");
    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = async () => {
        setVisible(false);
        await setimgLink(tempImgLink);
        onFinish(tempImgLink)
    };
    const handleCancel = () => {
        setVisible(false);
        setTempimgLink(imgLink);
    };

    return (<>
        <Button onClick={showDialog}>预选图标</Button>
        <Modal
            title="预选图标"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            closeOnEsc={true}
        >
            <Tabs type="line" style={{}}>
                <TabPane tab="生化" itemKey="1" style={{ maxHeight: "600px", overflowY: "scroll" }}>
                    {Shenghuaka.map((item) => {
                        return <button style={{ boxShadow: tempImgLink == item.图片 ? "0 0 10px #000000" : "unset", margin: "5px" }}>
                            <img style={{ height: "50px" }} src={item.图片} alt={item.名称} onClick={() => setTempimgLink(item.图片)} />
                        </button>
                    })}
                </TabPane>
                <TabPane tab="卡丘丘的日常" itemKey="2" style={{ maxHeight: "600px", overflowY: "scroll" }}>
                    {StrinovaEmoji.map((item) => {
                        return <button style={{ boxShadow: tempImgLink == item.图片 ? "0 0 10px #000000" : "unset", margin: "5px" }}>
                            <img style={{ height: "50px" }} src={item.图片} alt={item.名称} onClick={() => setTempimgLink(item.图片)} />
                        </button>
                    })}
                </TabPane>
                <TabPane tab="成就" itemKey="3" style={{ maxHeight: "600px", overflowY: "scroll" }}>
                    {Achievements.map((item) => {
                        return <button style={{ boxShadow: tempImgLink == item.图片 ? "0 0 10px #000000" : "unset", margin: "5px" }}>
                            <img style={{ height: "50px" }} src={item.图片} alt={item.名称} onClick={() => setTempimgLink(item.图片)} />
                        </button>
                    })}
                </TabPane>
                <TabPane tab="喷漆" itemKey="4" style={{ maxHeight: "600px", overflowY: "scroll" }}>
                    {PaintInk.map((item) => {
                        return <button style={{ boxShadow: tempImgLink == item.图片 ? "0 0 10px #000000" : "unset", margin: "5px" }}>
                            <img style={{ height: "50px" }} src={item.图片} alt={item.名称} onClick={() => setTempimgLink(item.图片)} />
                        </button>
                    })}
                </TabPane>
                <TabPane tab="勋章" itemKey="5" style={{ maxHeight: "600px", overflowY: "scroll" }}>
                    {Xunzhang.map((item) => {
                        return <button style={{ boxShadow: tempImgLink == item.图片 ? "0 0 10px #000000" : "unset", margin: "5px" }}>
                            <img style={{ height: "50px" }} src={item.图片} alt={item.名称} onClick={() => setTempimgLink(item.图片)} />
                        </button>
                    })}
                </TabPane>
            </Tabs>
        </Modal>
    </>

    );
};

export default PreImg;