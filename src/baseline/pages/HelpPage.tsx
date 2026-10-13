import { useState } from "react";
import { ChevronDown, ChevronRight, Headphones, Phone } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../components/common/Header";
import { Sheet } from "../components/common/Sheet";
import { faqs } from "../data/mockHelp";
export function HelpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isFaq = location.pathname === "/help/faq";
  const isInquiry = location.pathname === "/help/inquiry";
  const [category, setCategory] = useState("전체");
  const [opened, setOpened] = useState<string | null>(null);
  const [phone, setPhone] = useState(false);
  const [subject, setSubject] = useState("주문·결제");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  if (isInquiry)
    return (
      <div className="bm-inquiry-page">
        <Header title="1:1 문의" />
        {submitted ? (
          <div className="bm-inquiry-complete">
            <Headphones size={45} />
            <h2>문의가 접수되었어요</h2>
            <p>
              입력하신 내용은 이 테스트 화면에서만 처리됩니다.
              <br />
              실제 상담 접수는 진행되지 않아요.
            </p>
            <button
              className="bm-primary-button"
              onClick={() => navigate("/help")}
            >
              확인
            </button>
          </div>
        ) : (
          <form
            className="bm-inquiry-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (message.trim()) setSubmitted(true);
            }}
          >
            <p>무엇을 도와드릴까요?</p>
            <label>
              문의 유형
              <select
                aria-label="문의 유형"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {["주문·결제", "배달", "쿠폰·포인트", "이용 문의"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              문의 내용
              <textarea
                aria-label="문의 내용"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="문의하실 내용을 입력해주세요."
                rows={8}
                maxLength={1000}
                required
              />
            </label>
            <span>{message.length} / 1,000</span>
            <p className="bm-inquiry-notice">
              개인정보나 결제 정보는 입력하지 마세요.
              <br />이 프로토타입에서는 실제 상담이 접수되지 않습니다.
            </p>
            <button className="bm-primary-button" disabled={!message.trim()}>
              문의하기
            </button>
          </form>
        )}
      </div>
    );
  return (
    <div className="bm-help-page">
      <Header title={isFaq ? "자주 묻는 질문" : "고객센터"} />
      {!isFaq && (
        <>
          <div className="bm-help-intro">
            <Headphones size={35} />
            <h2>어떤 도움이 필요하세요?</h2>
            <p>궁금한 내용을 확인해보세요.</p>
          </div>
          <div className="bm-help-menu">
            <Link to="/help/faq">
              <strong>자주 묻는 질문</strong>
              <ChevronRight size={20} />
            </Link>
            <Link to="/help/inquiry">
              <strong>1:1 문의</strong>
              <ChevronRight size={20} />
            </Link>
            <button onClick={() => setPhone(true)}>
              <strong>전화 문의</strong>
              <ChevronRight size={20} />
            </button>
            <Link to="/my/safety">
              <strong>고객안심센터</strong>
              <ChevronRight size={20} />
            </Link>
          </div>
          <div className="bm-help-faq-heading">
            <h2>자주 찾는 질문</h2>
            <Link to="/help/faq">
              전체보기
              <ChevronRight size={13} />
            </Link>
          </div>
        </>
      )}
      {isFaq && (
        <div className="bm-faq-categories">
          {["전체", "주문·결제", "배달", "쿠폰·포인트", "이용 문의"].map(
            (c) => (
              <button
                key={c}
                className={category === c ? "active" : ""}
                onClick={() => {
                  setCategory(c);
                  setOpened(null);
                }}
              >
                {c}
              </button>
            ),
          )}
        </div>
      )}
      <div className="bm-faq-list">
        {faqs
          .filter((f) => category === "전체" || category === f.category)
          .map((faq) => (
            <article key={faq.id}>
              <button
                aria-expanded={opened === faq.id}
                onClick={() => setOpened(opened === faq.id ? null : faq.id)}
              >
                <span>Q.</span>
                <strong>{faq.question}</strong>
                <ChevronDown size={17} />
              </button>
              {opened === faq.id && (
                <div>
                  <span>A.</span>
                  <p>{faq.answer}</p>
                </div>
              )}
            </article>
          ))}
      </div>
      <div className="bm-help-footer">
        <strong>배달의민족 고객센터</strong>
        <p>연중무휴 24시간 운영</p>
        <span>이메일 문의 · 고객안심센터</span>
      </div>
      {phone && (
        <Sheet title="전화 문의" onClose={() => setPhone(false)}>
          <div className="bm-info-sheet">
            <Phone size={30} />
            <h3>고객센터 전화 문의</h3>
            <p>전화 연결은 이 프로토타입에서 제공하지 않아요.</p>
            <button
              className="bm-primary-button"
              onClick={() => setPhone(false)}
            >
              확인
            </button>
          </div>
        </Sheet>
      )}
    </div>
  );
}
