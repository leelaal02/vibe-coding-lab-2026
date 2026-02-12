import axios from 'axios';

export interface WeatherForecast {
    regId: string;
    tmFc: string;
    tmEf: string;
    ta: string;
    st: string;
    sky: string;
    prep: string;
    wf: string;
    regName?: string;
}

export interface RegionInfo {
    regId: string;
    regName: string;
    regSp: string; // Region type (A: Broad, B: Local, C: City, etc.)
}

const AUTH_KEY = 'bUgjzxQ0S8mII88UNEvJ6g';

export const weatherService = {
    async getForecast(regId: string): Promise<WeatherForecast[]> {
        const response = await axios.get('/api/kma', {
            params: {
                path: 'fct_afs_dl.php',
                reg: regId,
                disp: 1,
                help: 1,
                authKey: AUTH_KEY,
            }
        });

        // Response is now JSON parsed by the server
        const parsedData = response.data;

        return parsedData.map((item: any) => ({
            regId: item.REG_ID,
            tmFc: item.TM_FC,
            tmEf: item.TM_EF,
            ta: item.TA,
            st: item.ST,
            sky: item.SKY,
            prep: item.PREP,
            wf: item.WF,
        }));
    },

    async getRegions(): Promise<RegionInfo[]> {
        const response = await axios.get('/api/kma', {
            params: {
                path: 'fct_shrt_reg.php',
                tmfc: 0,
                authKey: AUTH_KEY,
            }
        });

        return response.data;
    }
};
