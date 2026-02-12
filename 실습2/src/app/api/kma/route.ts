import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import iconv from 'iconv-lite';

const WEATHER_API_BASE_URL = 'https://apihub.kma.go.kr/api/typ01/url';

const parseKmaData = (text: string): Record<string, string>[] => {
    const lines = text.split('\n');
    const startIdx = lines.findIndex(line => line.startsWith('# REG_ID') && line.split(/\s+/).length > 5);
    if (startIdx === -1) return [];

    const headers = lines[startIdx].replace('#', '').trim().split(/\s+/);
    const dataLines = lines.slice(startIdx + 1).filter(line => line.trim() && !line.startsWith('#') && line !== '#7777END');

    return dataLines.map(line => {
        const values = line.split(',');
        const obj: Record<string, string> = {};
        headers.forEach((header, i) => {
            obj[header] = values[i]?.trim();
        });
        return obj;
    });
};

const parseRegionData = (text: string): any[] => {
    const lines = text.split('\n');
    const startIdx = lines.findIndex(line => line.startsWith('# REG_ID') && line.split(/\s+/).length > 3);
    if (startIdx === -1) return [];

    const dataLines = lines.slice(startIdx + 1).filter(line => line.trim() && !line.startsWith('#'));

    return dataLines.map(line => {
        const parts = line.trim().split(/\s+/);
        return {
            regId: parts[0],
            regSp: parts[3],
            regName: parts.slice(4).join(' ')
        };
    });
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get('path');

    if (!path) {
        return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
        if (key !== 'path') params[key] = value;
    });

    try {
        const response = await axios.get(`${WEATHER_API_BASE_URL}/${path}`, {
            params,
            responseType: 'arraybuffer',
            timeout: 30000,
        });

        const decodedData = iconv.decode(Buffer.from(response.data), 'euc-kr');

        let result: any;
        if (path === 'fct_afs_dl.php') {
            result = parseKmaData(decodedData);
        } else if (path === 'fct_shrt_reg.php') {
            result = parseRegionData(decodedData);
        } else {
            result = decodedData;
        }

        return NextResponse.json(result);
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data ?
            iconv.decode(Buffer.from(error.response.data), 'euc-kr') :
            error.message;

        console.error('Proxy error:', message);
        return NextResponse.json({ error: 'Failed to fetch from KMA', status, kmaMessage: message }, { status });
    }
}
