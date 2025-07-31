import React from 'react';
import { CustomButton } from '@/presentation/components/atoms/CustomButton';

interface PricingCardProps {
    title: string;
    price: number;
    period?: string;
    features: string[];
    onButtonClick?: () => void;
    buttonText: string;
    onClick?: () => void;
    isSelected?: boolean;
    badge?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
    title,
    price,
    period = 'mo',
    features,
    onButtonClick,
    buttonText,
    onClick,
    badge,
    isSelected = false
}) => {
    return (
        <div
            onClick={onClick}
            className={`relative rounded-2xl p-6 w-[370px] h-[500px] flex flex-col justify-between items-center cursor-pointer
                transition-all duration-300
                ${
                    isSelected
                        ? 'bg-[#fffff9] text-black scale-110 shadow-2xl z-10'
                        : 'bg-[#fffff9] text-gray-800 shadow-lg hover:bg-gray-200 hover:[#a49287] hover:shadow-xl'
                }`}
        >
            {badge && (
                <div className="absolute -top-5 -left-5 bg-yellow-300 text-[#786051] text-lg font-bold px-5 py-2 rounded-full shadow-xl z-10">
                    {badge}
                </div>
            )}

            <h2 className="text-2xl font-bold mb-2">{title}</h2>

            <div className="flex items-baseline my-4 gap-1">
                <span className="text-3xl font-bold mr-1">₩</span>
                <span className="text-6xl font-extrabold leading-none tabular-nums">
                    {price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600 ml-1 whitespace-nowrap">/{period}</span>
            </div>

            <ul
                className={`w-full my-4 list-disc text-base space-y-2 ${
                    isSelected ? 'text-gray-800' : 'text-gray-800 font-semibold'
                } pl-16 text-left`}
            >
                {features.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
                </ul>

                {Array.from({ length: 5 - features.length }).map((_, idx) => (
                    <li key={`placeholder-${idx}`} className="invisible">placeholder</li>
                ))}

            <div className="w-full flex justify-center mt-2">
                <CustomButton
                    onClick={onButtonClick}
                    title={buttonText}
                    loading={false}
                />
            </div>
        </div>
    );
};

export default PricingCard;
