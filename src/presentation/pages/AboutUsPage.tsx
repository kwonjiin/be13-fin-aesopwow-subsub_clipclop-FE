import { Header } from "../layout/Header";
import aboutus from "@/assets/phone.png";
import vision from "@/assets/vision.jpg";
import wevision from "@/assets/wevision.jpg";
import lockin from "@/assets/lockin.png";
import analytics from "@/assets/ana.jpg";
import care from "@/assets/care.jpg";
import visionkey from "@/assets/visionkey.png";
import SplitText from "@/presentation/components/atoms/SplitText";
import BlurText from "@/presentation/components/atoms/BlurText";
import SpotlightCard from '@/presentation/components/atoms/SpotlightCard';
import ScrollDownIndicator from "@/presentation/components/atoms/ScrollDownIndicator";
import logo from "@/assets/logo.png"
import { motion } from "framer-motion";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen w-full bg-[#f0f0e5] flex flex-col overflow-x-hidden">
      <Header />
      <br /><br /><br /><br /><br />
      
      <motion.div
        initial={{ x: 0, y: 0, opacity: 0 }}
        animate={{ 
          x: [100, 300, 500, 700, 900, 1100, 1300],           // 오른쪽으로 이동
          y: [0, -100, 0, -100, 0, -100, 0, -100, 0, -100, 0, -100, 0 ],   // 위로 점프했다 내려오기
          opacity: 1
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeatDelay: 0.1        // 점프 후 잠깐 쉼
        }}
      >
        <img
          src={logo}
          alt="logo"
          className="w-[300px] h-[300px] rounded-lg"
        />
      </motion.div>
      <br /><br />

      <BlurText
        text="구독자 관리를 가장 쉽게 하는 방법"
        delay={250}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="blur-text text-7xl font-bold text-center text-[#9c7866] flex justify-center"
      />

      <br /><br /><br /><br /><br /><br /><br /><br /><br />

      <main className="flex flex-col items-center justify-center px-4 py-16 space-y-32">
        <SpotlightCard className="custom-spotlight-card bg-white flex flex-col md:flex-row max-w-screen-xl w-full shadow-lg rounded-xl overflow-hidden" spotlightColor="rgba(110, 70, 0, 0.3)">
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-black">
              황금알을 낳는 고객을 위한, <br /><br />
              <SplitText
                text="다구독 다구독!"
                className="text-6xl font-bold text-center text-[#9c7866]"
                delay={250}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
              />
            </h2>
            <p className="text-lg leading-relaxed text-black">
              <br /><br />고객은 단순한 수익원이 아닌, 장기적인 가치를 창출하는 <br /><strong className="text-[#9c7866]">황금알을 낳는 거위</strong>입니다.<br />
              <br />
              다구독 다구독은 고객 이탈을 최소화하고, <br />기존 구독자를 세심하게 관리함으로써<br />
              <strong className="text-[#9c7866]">지속가능한 수익과 고객 락인(Lock-in)</strong>을 실현하는 <br />B2B 구독 관리 플랫폼입니다.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img src={aboutus} alt="about" className="object-cover w-full h-full rounded-lg" />
          </div>
        </SpotlightCard>

        <SpotlightCard className="custom-spotlight-card bg-white flex flex-col md:flex-row max-w-screen-xl w-full shadow-lg rounded-xl overflow-hidden" spotlightColor="rgba(110, 70, 0, 0.3)">
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6 text-black">Mission</h2><br />
            <p className="text-lg leading-relaxed text-black">
              다구독 다구독은 고객을 단순한 유치 대상이 아닌 <strong className="text-[#9c7866]">장기적인 파트너</strong>로 인식합니다.
              <br /><br />
              우리는 고객 중심의 가치 설계와 경험 최적화를 통해<br />
              <strong className="text-[#9c7866]">고객의 이탈을 최소화</strong>하고, 예측 가능한 구독 수익을 창출하며,
              AI와 데이터 기반 기술을 활용해 <strong className="text-[#9c7866]">기업의 지속가능한 성장</strong>을 돕습니다.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img src={vision} alt="vision" className="object-cover w-full h-full rounded-lg" />
          </div>
        </SpotlightCard>

        <SpotlightCard
          className="custom-spotlight-card bg-white flex flex-col max-w-screen-xl w-full shadow-lg rounded-xl overflow-hidden"
          spotlightColor="rgba(110, 70, 0, 0.3)"
        >
          <div className="w-full text-center py-8">
            <h2 className="text-4xl font-bold px-6 mb-10 text-black">Vision</h2>
          </div>
          <div className="flex flex-col md:flex-row w-full items-center md:items-start px-6 pb-8">
            <div className="md:w-1/2 text-left mb-6 md:mb-0">
              <div className="text-lg text-black text-center">
                <strong className="text-[#9c7866] text-2xl ">
                  “고객 유지 중심의 구독 관리 패러다임을 <br />
                  선도하는 인텔리전트 플랫폼”
                </strong>
                <br /><br /><br />
                고객 성공과 수익 안정화를 동시에 이루며, <br />
                업계의 구독 운영 방식에 새로운 기준을 제시합니다.
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <img
                src={visionkey}
                alt="visionkey"
                className="object-contain w-[600px] h-auto rounded-lg"
              />
            </div>
          </div>
        </SpotlightCard>


        <SpotlightCard className="custom-spotlight-card bg-white flex flex-col md:flex-row max-w-screen-xl w-full shadow-lg rounded-xl overflow-hidden" spotlightColor="rgba(110, 70, 0, 0.3)">
          <p>
            <h2 className="text-4xl font-bold mb-10 text-center px-6 py-8 text-black">Strategy</h2><br />
            <div className="space-y-16 text-lg">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-2 text-[#9c7866]">AI 분석 기반 전략</h3><br /><br />
                  <ul className="list-disc list-inside space-y-1 text-black">
                    <li>생성형 AI 기반 인사이트 자동 추천</li><br />
                    <li>구독자 이탈 징후 예측 및 대응 전략 수립</li><br />
                    <li>클라이언트 간 구독 성과 벤치마킹</li><br />
                  </ul>
                </div>
                <div className="md:w-1/2 order-1 md:order-2">
                  <img src={analytics} className="w-full h-auto rounded-lg" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <img src={lockin} className="w-full h-auto rounded-lg" />
                </div>
                <div className="md:w-1/2 order-2 md:order-1">
                  <h3 className="text-2xl font-semibold mb-2 text-[#9c7866]">고객 락인 전략</h3><br /><br />
                  <ul className="list-disc list-inside space-y-1 text-black">
                    <li>워크플로우 설계로 락인 유도</li><br />
                    <li>장기 구독자 맞춤 혜택 제공</li><br />
                    <li>행동 패턴 기반 이탈 방지 마케팅</li><br />
                  </ul>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 order-2 md:order-1">
                  <h3 className="text-2xl font-semibold mb-2 text-[#9c7866]">운영 최적화 전략</h3><br /><br />
                  <ul className="list-disc list-inside space-y-1 text-black">
                    <li>다채널 구독 서비스 통합 관리</li><br />
                    <li>자동 결제/해지/갱신 기능</li><br />
                    <li>권한 기반 조직 운영 시스템</li><br />
                  </ul>
                </div>
                <div className="md:w-1/2 order-1 md:order-2">
                  <img src={care} className="w-full h-auto rounded-lg" />
                </div>
              </div>
            </div>
          </p>
        </SpotlightCard>

        <SpotlightCard className="custom-spotlight-card bg-white flex-col md:flex-row max-w-screen-xl w-full shadow-lg rounded-xl overflow-hidden" spotlightColor="rgba(110, 70, 0, 0.3)">
          <h2 className="text-3xl font-bold py-8 text-center text-black">핵심 가치 (Core Values)</h2><br /><br />
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-lg">
            <div className="md:w-1/2">
              <ul className="list-disc list-inside space-y-4 text-black">
                <br /><li><strong>고객 중심:</strong> 모든 의사결정은 고객의 성공과 경험을 기준으로 합니다.</li><br />
                <li><strong>데이터 기반:</strong> 직관이 아닌 데이터로 판단하고 실행합니다.</li><br />
                <li><strong>지속 가능성:</strong> 단기 실적보다 장기 관계를 추구합니다.</li><br />
                <li><strong>정직한 성장:</strong> 핵심가치에 반하는 사업은 과감히 포기합니다.</li><br />
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <img src={wevision} alt="wevision" className="object-contain w-[600px] h-auto rounded-lg" />
            </div>
          </div>
        </SpotlightCard>
      </main>
      <ScrollDownIndicator />
    </div >
  );
}