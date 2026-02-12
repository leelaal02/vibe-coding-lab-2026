'use client';

import { useState, useEffect } from 'react';
import { weatherService, WeatherForecast, RegionInfo } from '@/services/weatherService';
import WeatherCard from '@/components/WeatherCard';
import { Search, MapPin, RefreshCw, CloudSun } from 'lucide-react';

export default function Home() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const [regions, setRegions] = useState<RegionInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('서울');
  const [selectedRegion, setSelectedRegion] = useState<RegionInfo | null>(null);

  useEffect(() => {
    // Initial regions load
    const loadRegions = async () => {
      try {
        const data = await weatherService.getRegions();
        setRegions(data);
        // Find "서울" exactly if possible, or the most specific match
        const seoul = data.find(r => r.regName === '서울') ||
          data.find(r => r.regName.includes('서울')) ||
          data[0];
        if (seoul) {
          setSelectedRegion(seoul);
          fetchWeather(seoul.regId, seoul.regName);
        }
      } catch (error) {
        console.error('Failed to load regions:', error);
      }
    };
    loadRegions();
  }, []);

  const fetchWeather = async (regId: string, regName: string) => {
    setLoading(true);
    setForecasts([]); // Clear old data
    try {
      const data = await weatherService.getForecast(regId);
      const mappedData = data.map(f => ({ ...f, regName }));
      setForecasts(mappedData);
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    // Filter potential matches
    const matches = regions.filter(r => r.regName === query || r.regName.includes(query));

    if (matches.length > 0) {
      // Prioritize "City (C)" type, then "Broad (A)", then "Local (B)"
      const sortedMatches = [...matches].sort((a, b) => {
        const priority: Record<string, number> = { 'C': 1, 'A': 2, 'B': 3 };
        return (priority[a.regSp] || 99) - (priority[b.regSp] || 99);
      });

      const region = sortedMatches[0];
      setSelectedRegion(region);
      fetchWeather(region.regId, region.regName);
    } else {
      alert('해당 지역을 찾을 수 없습니다.');
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-6 md:p-12 overflow-x-hidden">
      {/* Decorative Elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20">
              <CloudSun className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
                Weather
              </h1>
              <p className="text-gray-400 text-sm font-medium">대한민국 단기 예보 서비스</p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex w-full md:w-auto items-center gap-2 group">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="지역명을 입력하세요 (예: 서울, 부산)"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/30 active:scale-95 text-sm"
            >
              조회
            </button>
          </form>
        </header>

        {selectedRegion && (
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold">{selectedRegion.regName} 날씨 현황</h2>
              {forecasts.length > 0 && (
                <span className="text-gray-400 text-xs bg-white/5 px-2 py-1 rounded-md">
                  발표: {forecasts[0].tmFc.substring(4, 6)}/{forecasts[0].tmFc.substring(6, 8)} {forecasts[0].tmFc.substring(8, 10)}:00
                </span>
              )}
            </div>
            <button
              onClick={() => fetchWeather(selectedRegion.regId, selectedRegion.regName)}
              className="p-2 hover:bg-white/5 rounded-full transition-colors"
              title="새로고침"
            >
              <RefreshCw className={`w-5 h-5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-gray-400 animate-pulse">데이터를 불러오는 중입니다...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {forecasts.map((forecast, index) => (
              <WeatherCard key={`${forecast.regId}-${index}`} forecast={forecast} />
            ))}
          </div>
        )}

        {!loading && selectedRegion && forecasts.length === 0 && (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm max-w-2xl mx-auto">
            <div className="bg-amber-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <CloudSun className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">"{selectedRegion.regName}" 예보 데이터가 없습니다.</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed px-10">
              광역 지역이나 해상 구역은 단기 예보 데이터가 직접 제공되지 않을 수 있습니다.<br />
              <b>더 구체적인 도시명</b>(예: 수원, 고양, 의정부 등)으로 다시 검색해 보시는 것을 권장합니다.
            </p>
            <div className="flex flex-wrap justify-center gap-2 px-6">
              {['수원', '고양', '인천', '안양', '수지', '화성'].map(city => (
                <button
                  key={city}
                  onClick={() => {
                    setSearchQuery(city);
                    const region = regions.find(r => r.regName === city) || regions.find(r => r.regName.includes(city));
                    if (region) {
                      setSelectedRegion(region);
                      fetchWeather(region.regId, region.regName);
                    }
                  }}
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs font-semibold transition-all border border-white/5"
                >
                  #{city}
                </button>
              ))}
            </div>
          </div>
        )}

        {!loading && !selectedRegion && forecasts.length === 0 && (
          <div className="text-center py-40 opacity-50">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <p className="text-xl">지역을 선택하여 날씨를 조회해보세요.</p>
          </div>
        )}
      </div>

      <footer className="mt-20 pt-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2026 WeatherFlow. All rights reserved.</p>
        <p className="mt-1">Data provided by Korea Meteorological Administration</p>
      </footer>
    </main>
  );
}
