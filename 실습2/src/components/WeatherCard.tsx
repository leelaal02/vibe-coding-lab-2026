import React from 'react';
import { Cloud, CloudFog, CloudLightning, CloudDrizzle, CloudRain, CloudSun, Sun, Snowflake } from 'lucide-react';
import { WeatherForecast } from '@/services/weatherService';

interface WeatherCardProps {
    forecast: WeatherForecast;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ forecast }) => {
    const formatTime = (timeStr: string) => {
        if (!timeStr) return '';
        const year = timeStr.substring(0, 4);
        const month = timeStr.substring(4, 6);
        const day = timeStr.substring(6, 8);
        const hour = timeStr.substring(8, 10);
        return `${month}/${day} ${hour}:00`;
    };

    const getWeatherIcon = (sky: string, prep: string) => {
        // PREP: 0(없음), 1(비), 2(비/눈), 3(눈), 4(소나기)
        if (prep === '1') return <CloudRain className="w-10 h-10 text-blue-400" />;
        if (prep === '2' || prep === '3') return <Snowflake className="w-10 h-10 text-blue-200" />;
        if (prep === '4') return <CloudDrizzle className="w-10 h-10 text-blue-300" />;

        // SKY: DB01(맑음), DB02(구름조금), DB03(구름많음), DB04(흐림)
        switch (sky) {
            case 'DB01': return <Sun className="w-10 h-10 text-yellow-400" />;
            case 'DB02': return <CloudSun className="w-10 h-10 text-yellow-300" />;
            case 'DB03': return <Cloud className="w-10 h-10 text-gray-300" />;
            case 'DB04': return <CloudFog className="w-10 h-10 text-gray-400" />;
            default: return <Sun className="w-10 h-10 text-yellow-400" />;
        }
    };

    const getSkyLabel = (sky: string) => {
        switch (sky) {
            case 'DB01': return '맑음';
            case 'DB02': return '구름조금';
            case 'DB03': return '구름많음';
            case 'DB04': return '흐림';
            default: return '정보없음';
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-blue-200 text-xs font-medium uppercase tracking-wider">{formatTime(forecast.tmEf)}</p>
                    <h3 className="text-white text-xl font-bold mt-1">{forecast.regName || forecast.regId}</h3>
                </div>
                <div className="group-hover:scale-110 transition-transform duration-300">
                    {getWeatherIcon(forecast.sky, forecast.prep)}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">기온</span>
                    <span className="text-white text-2xl font-bold">
                        {forecast.ta === '-99' ? '-' : forecast.ta}°C
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10">
                    <div>
                        <p className="text-gray-400 text-[10px] uppercase">강수확률</p>
                        <p className="text-white font-semibold">{forecast.st}%</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-[10px] uppercase">하늘상태</p>
                        <p className="text-white font-semibold">{getSkyLabel(forecast.sky)}</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-2">
                <p className="text-blue-100 text-xs italic opacity-80 line-clamp-1">
                    {forecast.wf}
                </p>
            </div>
        </div>
    );
};

export default WeatherCard;
