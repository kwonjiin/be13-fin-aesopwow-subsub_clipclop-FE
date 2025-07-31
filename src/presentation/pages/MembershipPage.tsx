import React, { useState } from 'react';
import { Header } from '@/presentation/layout/Header';
import PricingCard from '@/presentation/components/molecules/PricingCard';
import { MEMBERSHIP_PLANS } from '@/constants/membership';
import { usePaymentViewModel } from '@/application/viewModels/PaymentViewModel';

const MembershipPage: React.FC = () => {
    const [isMonthly, setIsMonthly] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    // 월간/연간 플랜 선택
    const plans = isMonthly ? MEMBERSHIP_PLANS.monthly : MEMBERSHIP_PLANS.yearly;

    // 결제 뷰모델에서 결제 요청 함수 가져오기
    const { requestPayment } = usePaymentViewModel();

    // 가입 버튼 클릭 시 결제 요청
    const handleSubscribe = async (title: string, price: number) => {
        // 결제 요청 함수에 주문명, 금액 전달
        await requestPayment({
            orderName: `${title} ${isMonthly ? '월간' : '연간'} 구독`,
            totalAmount: price,
        });
    };

    return (
        <div className="min-h-screen w-screen bg-[#f0f0e5] overflow-x-hidden text-[#786051] flex flex-col">
            <div className="pt-6">
                <Header />
            </div>

            <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-12">
                <h1 className="text-[#9c7866] text-4xl border-[#9c7866] font-extrabold mb-8">멤버십 구독 플랜</h1>

                {/* 월간/연간 버튼 */}
                <div className="flex justify-center mb-10 space-x-4">
                    <button
                        className={`px-4 py-2 rounded-full font-semibold transition ${
                            isMonthly ? 'bg-white text-[#786051]' : 'bg-[#786051] text-white'
                        }`}
                        onClick={() => setIsMonthly(true)}
                    >
                        월간
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full font-semibold transition ${
                            !isMonthly ? 'bg-white text-[#786051]' : 'bg-[#786051] text-white'
                        }`}
                        onClick={() => setIsMonthly(false)}
                    >
                        연간
                    </button>
                </div>

                {/* 플랜 카드 리스트 */}
                <div className="flex justify-center gap-12 flex-wrap max-w-[100vw] px-4">
                    {plans.map((plan, index) => (
                        <PricingCard
                            key={index}
                            title={plan.title}
                            price={plan.price}
                            features={plan.features}
                            buttonText="구독하기"
                            // 가입하기 버튼 클릭 시 결제 요청 함수 실행 (수정된 부분)
                            onButtonClick={() => handleSubscribe(plan.title, plan.price)}
                            period={isMonthly ? '월' : '년'}
                            onClick={() => setSelectedPlan(plan.title)}
                            isSelected={selectedPlan === plan.title}
                            badge={
                                plan.title === 'Premium'
                                    ? 'BEST'
                                    : plan.title === 'Ultimate'
                                        ? isMonthly ? '2개월 무료' : '15% 할인'
                                        : undefined
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MembershipPage;