import styled from 'styled-components';
import Header from '../components/Header';
import FundingCard from '../components/FundingCard';
import RoomCard from '../components/RoomCard';
import { useQuery } from 'react-query';
// import { useParams } from 'react-router-dom';
import { getAllFunding, getTop4Room } from '../apis/fundingApi';
import Footer from '../components/Footer';

const RoomContainer = styled.div`
  padding: 50px 200px;
  display: flex;
  background-color: #f4f4f4;
  flex-direction: column;
`;

const Room = styled.div`
  display: flex;
  justify-content: center;
`;

const PageContainer = styled.div`
  padding: 30px 200px;
`;

const Title = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const More = styled.a`
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  color: #6314e7;
  text-underline-position: under;

  &:active {
    color: black;
  }
`;

const Funds = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 980px;
  padding: 0px 200px;
`;

const Grids = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
`;

export default function Home() {
  // const { roomId, fundingId } = useParams();

  const { isLoading: isL1, data: rooms } = useQuery(['Top4Rooms', getTop4Room], () => getTop4Room(), {
    onSuccess: data => {
      console.log('Top 4 Room data:', data);
    },
  });

  const { isLoading: isL2, data: funds } = useQuery(['AllFund', getAllFunding], () => getAllFunding(), {
    onSuccess: data => {
      console.log('All Funding data:', data);
    },
  });

  return (
    <>
      <Header />
      <RoomContainer>
        <Title> 요즘 뜨는 방 </Title>
        <Room>
          <Grids>
            {rooms?.map(room => (
              <RoomCard key={room.host_id} room={room} />
            ))}
          </Grids>
        </Room>
        <More> 전체보기 </More>
      </RoomContainer>
      <PageContainer>
        <Title> 현재 진행 중인 펀딩 </Title>
      </PageContainer>
      <Funds>
        <Grids>
          {funds?.map(fund => (fund.is_active === 3 ? <FundingCard key={fund.funding_id} fund={fund} /> : null))}
        </Grids>
      </Funds>
      <Footer />
    </>
  );
}
