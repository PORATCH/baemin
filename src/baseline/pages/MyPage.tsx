import {
  Settings,
  ChevronRight,
  Ticket,
  Wallet,
  Coins,
  Gift,
  ReceiptText,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "../components/common/Header";
import { MenuRow } from "../components/mypage/MenuRow";
export function MyPage() {
  return (
    <div className="bm-my-page">
      <Header
        title="마이배민"
        back={false}
        right={
          <Link to="/settings" className="bm-icon-button" aria-label="환경설정">
            <Settings size={23} />
          </Link>
        }
      />
      <Link to="/my/account" className="bm-user-profile">
        <span className="bm-user-illustration">😋</span>
        <div>
          <p>오늘도 맛있는 하루!</p>
          <h2>
            배민이님 <ChevronRight size={20} />
          </h2>
        </div>
      </Link>
      <div className="bm-my-wallet">
        <Link to="/my/coupons">
          <Ticket size={22} />
          <span>쿠폰</span>
          <strong>3</strong>
        </Link>
        <Link to="/my/points">
          <Coins size={22} />
          <span>포인트</span>
          <strong>1,200</strong>
        </Link>
        <Link to="/my/pay">
          <Wallet size={22} />
          <span>배민페이</span>
          <strong>등록하기</strong>
        </Link>
      </div>
      <Link to="/my/coupons" className="bm-my-benefit">
        <span>
          이번 주 혜택도 놓치지 마세요!
          <strong>나에게 온 할인쿠폰 확인하기</strong>
        </span>
        <span>💌</span>
      </Link>
      <div className="bm-my-quick">
        <Link to="/orders">
          <ReceiptText size={25} />
          <strong>주문내역</strong>
        </Link>
        <Link to="/favorites">
          <Heart size={25} />
          <strong>찜한 가게</strong>
        </Link>
        <Link to="/service/gift">
          <Gift size={25} />
          <strong>선물함</strong>
        </Link>
      </div>
      <section className="bm-my-menu-group">
        <MenuRow to="/my/reviews">내가 쓴 리뷰</MenuRow>
        <MenuRow to="/my/address">주소 관리</MenuRow>
        <MenuRow to="/my/friends" badge="NEW">
          친구에게 알려주기
        </MenuRow>
      </section>
      <section className="bm-my-menu-group">
        <MenuRow to="/my/events">진행 중인 이벤트</MenuRow>
        <MenuRow to="/my/gift">배민 선물하기</MenuRow>
        <MenuRow to="/my/business">배민 사장님 광장</MenuRow>
        <MenuRow to="/my/notices">공지사항</MenuRow>
        <MenuRow to="/help">고객센터</MenuRow>
        <MenuRow to="/my/terms">약관 및 정책</MenuRow>
      </section>
      <footer className="bm-my-footer">
        <strong>배달의민족</strong>
        <p>버전 12.0.0</p>
      </footer>
    </div>
  );
}
