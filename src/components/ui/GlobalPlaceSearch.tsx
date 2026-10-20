import React, { useState, useEffect, useRef } from 'react';
import { Globe, MapPin, Search, RefreshCw, Check, X } from 'lucide-react';
import { Language } from '../../types/index.ts';
import { searchLocalCities, CITIES_DATABASE } from '../../data/vedicAstroCalc.ts';

export interface SelectedPlace {
  cityName: string;
  latitude: number;
  longitude: number;
  timezone: string;
  tzOffset: number;
  country: string;
  state?: string;
}

interface GlobalPlaceSearchProps {
  value: string;
  onChange: (place: SelectedPlace) => void;
  onRawChange?: (raw: string) => void;
  placeholder?: string;
  currentLang?: Language;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  showQuickPills?: boolean;
  autoSelectDefault?: boolean;
}

/** Calculate exact UTC offset in hours from IANA timezone string */
export function getTimezoneOffsetFromTz(timeZone: string, date: Date = new Date()): number {
  try {
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
    return parseFloat(((tzDate.getTime() - utcDate.getTime()) / 3600000).toFixed(2));
  } catch {
    return 5.5; // Default IST
  }
}

export const GlobalPlaceSearch: React.FC<GlobalPlaceSearchProps> = ({
  value,
  onChange,
  onRawChange,
  placeholder,
  currentLang = 'en',
  className = '',
  required = false,
  disabled = false,
  showQuickPills = true,
  autoSelectDefault = true
}) => {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState<SelectedPlace[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(() => {
    if (value) {
      const match = CITIES_DATABASE.find(c => c.displayName.toLowerCase() === value.toLowerCase() || c.city.toLowerCase() === value.toLowerCase());
      if (match) {
        return {
          cityName: match.displayName,
          latitude: match.lat,
          longitude: match.lon,
          timezone: match.country === 'India' ? 'Asia/Kolkata' : 'UTC',
          tzOffset: match.tzOffset,
          country: match.country,
          state: match.state
        };
      }
    }
    return {
      cityName: 'Bhopal, Madhya Pradesh, India',
      latitude: 23.2599,
      longitude: 77.4126,
      timezone: 'Asia/Kolkata',
      tzOffset: 5.5,
      country: 'India',
      state: 'Madhya Pradesh'
    };
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync external value
  useEffect(() => {
    if (value !== query) {
      setQuery(value || '');
    }
  }, [value]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search logic: Local Instant + Debounced Open-Meteo Geocoding
  const handleInputChange = (newVal: string) => {
    setQuery(newVal);
    if (onRawChange) onRawChange(newVal);

    if (!newVal.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    // 1. Instant local matching (0ms)
    const local = searchLocalCities(newVal, 5).map(c => ({
      cityName: c.displayName,
      latitude: c.lat,
      longitude: c.lon,
      timezone: c.country === 'India' ? 'Asia/Kolkata' : 'UTC',
      tzOffset: c.tzOffset,
      country: c.country,
      state: c.state
    }));
    setSuggestions(local);
    setIsOpen(true);

    // 2. Debounced (300ms) Open-Meteo Geocoding API
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (newVal.trim().length >= 2) {
      setIsLoading(true);
      debounceTimerRef.current = setTimeout(async () => {
        try {
          const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(newVal.trim())}&count=8&language=en&format=json`;
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data.results) && data.results.length > 0) {
              const remotePlaces: SelectedPlace[] = data.results.map((item: any) => {
                const parts = [item.name, item.admin1, item.country].filter(Boolean);
                const tz = item.timezone || (item.country_code === 'IN' ? 'Asia/Kolkata' : 'UTC');
                const offset = getTimezoneOffsetFromTz(tz);

                return {
                  cityName: parts.join(', '),
                  latitude: parseFloat(item.latitude.toFixed(4)),
                  longitude: parseFloat(item.longitude.toFixed(4)),
                  timezone: tz,
                  tzOffset: offset,
                  country: item.country || '',
                  state: item.admin1 || ''
                };
              });

              // Merge local + remote uniquely
              const merged: SelectedPlace[] = [...remotePlaces];
              for (const loc of local) {
                if (!merged.some(m => m.cityName.toLowerCase() === loc.cityName.toLowerCase())) {
                  merged.push(loc);
                }
              }

              setSuggestions(merged.slice(0, 8));
            }
          }
        } catch (err) {
          console.warn('Open-Meteo geocoding fallback to local:', err);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setIsLoading(false);
    }
  };

  const handleSelect = (place: SelectedPlace) => {
    setSelectedPlace(place);
    setQuery(place.cityName);
    setIsOpen(false);
    onChange(place);
    if (onRawChange) onRawChange(place.cityName);
  };

  const handlePresetClick = (citySearch: string) => {
    const local = searchLocalCities(citySearch, 1)[0];
    if (local) {
      const place: SelectedPlace = {
        cityName: local.displayName,
        latitude: local.lat,
        longitude: local.lon,
        timezone: local.country === 'India' ? 'Asia/Kolkata' : 'UTC',
        tzOffset: local.tzOffset,
        country: local.country,
        state: local.state
      };
      handleSelect(place);
    } else {
      handleInputChange(citySearch);
    }
  };

  const clearInput = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    if (onRawChange) onRawChange('');
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      {/* Input Field */}
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
          <MapPin className="w-4 h-4 text-[#D4AF37]" />
        </div>

        <input
          type="text"
          required={required}
          disabled={disabled}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
            else if (query.trim().length >= 1) handleInputChange(query);
          }}
          placeholder={
            placeholder ||
            (currentLang === 'en'
              ? 'Search global birth city (e.g. Bhopal, Dubai, London, Rewa)...'
              : 'वैश्विक जन्म नगर/शहर खोजें (उदा. Bhopal, Rewa, Dubai)...')
          }
          className="w-full pl-10 pr-16 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1.5">
          {isLoading && (
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
          )}
          {query && !isLoading && (
            <button
              type="button"
              onClick={clearInput}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Selected Coordinates & Timezone Badge */}
      {selectedPlace && (
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1 px-1">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>GPS: {selectedPlace.latitude}° N, {selectedPlace.longitude}° E</span>
          </span>
          <span className="text-[#B45309] dark:text-[#F3E5AB] font-semibold">
            TZ: UTC {selectedPlace.tzOffset >= 0 ? `+${selectedPlace.tzOffset}` : selectedPlace.tzOffset} ({selectedPlace.timezone.split('/').pop()})
          </span>
        </div>
      )}

      {/* Auto-Complete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white dark:bg-slate-900 border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#D4AF37]" />
              <span>{currentLang === 'en' ? 'Verified Global Coordinates' : 'सत्यापित वैश्विक स्थान'}</span>
            </span>
            <span>Open-Meteo / Lahiri</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(item)}
                className="w-full px-3.5 py-2 text-xs text-left hover:bg-[#D4AF37]/15 flex items-center justify-between gap-3 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer group"
              >
                <div className="truncate">
                  <div className="font-semibold text-slate-900 dark:text-white group-hover:text-[#B45309] dark:group-hover:text-[#F3E5AB] transition-colors truncate">
                    {item.cityName}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {item.state ? `${item.state}, ` : ''}{item.country}
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono text-[10px]">
                  <div className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                    {item.latitude}°N, {item.longitude}°E
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                    UTC {item.tzOffset >= 0 ? `+${item.tzOffset}` : item.tzOffset}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick City Presets Pills */}
      {showQuickPills && (
        <div className="pt-2">
          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
            <span>{currentLang === 'en' ? 'Quick Presets:' : 'त्वरित चयन:'}</span>
            <span className="text-[9px] text-[#D4AF37] font-semibold">{currentLang === 'en' ? 'Global High-Precision GPS' : 'सटीक जीपीएस'}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              'Bhopal',
              'Indore',
              'Rewa',
              'Jabalpur',
              'Delhi',
              'Mumbai',
              'Dubai',
              'London'
            ].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => handlePresetClick(city)}
                className="px-2.5 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-[#D4AF37]/20 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer font-medium"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
