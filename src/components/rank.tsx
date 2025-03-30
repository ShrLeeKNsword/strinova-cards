import { Col, Row } from "@douyinfe/semi-ui";
import { FaRegStar, FaStar } from "react-icons/fa";

interface RankStarsProps {
    rank: number;
    rankMax: number;
}

const renderStars = (rank: number, rankMax: number) => {
    const stars = [];
    for (let i = 0; i < rankMax; i++) {
        stars.push(
            <Col key={i} span={4} order={i + 1}>
                <div style={{ color: "yellow", fontSize: "50px", filter: "drop-shadow(0px 0px 5px grey)" }} >{i < rank ? <FaStar /> : <FaRegStar />}</div>
            </Col>
        );
    }
    return stars;
};

const RankStars = (RankStarsData: RankStarsProps) => {
    return <Row type="flex" justify="center" style={{ transform: "translateY(-30px)" }} >
        {renderStars(RankStarsData.rank, RankStarsData.rankMax)}
    </Row>


}

export default RankStars;