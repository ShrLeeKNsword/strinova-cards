import { Button, Modal, Tabs, TabPane } from "@douyinfe/semi-ui";
import React, { useState } from 'react';
import Shenghuaka from "../data/分类_生化卡牌 - 卡拉彼丘WIKI_BWIKI_哔哩哔哩.json"
import StrinovaEmoji from "../data/分类_表情包 - 卡拉彼丘WIKI_BWIKI_哔哩哔哩.json"

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
                <TabPane tab="官方生化" itemKey="1" style={{ maxHeight: "600px", overflowY: "scroll" }}>
                    {Shenghuaka.map((item) => {
                        return <button style={{ boxShadow: tempImgLink == item.图片 ? "0 0 10px #000000" : "unset" }}>
                            <img style={{ height: "60px" }} src={item.图片} alt={item.名称} onClick={() => setTempimgLink(item.图片)} />
                        </button>
                    })}
                </TabPane>
                <TabPane tab="官方表情" itemKey="2" style={{ maxHeight: "600px", overflowY: "scroll" }}>
                    {StrinovaEmoji.map((item) => {
                        return <button style={{ boxShadow: tempImgLink == item.图片 ? "0 0 10px #000000" : "unset" }}>
                            <img style={{ height: "60px" }} src={item.图片} alt={item.名称} onClick={() => setTempimgLink(item.图片)} />
                        </button>
                    })}
                </TabPane>
            </Tabs>
        </Modal>
    </>

    );
};

export default PreImg;