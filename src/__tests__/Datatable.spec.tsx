import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DataTable } from '../components/DataTable';
import { useData } from '../hooks/useData';

interface WrapperProps {
    type: 'airports' | 'stadiums' | 'special';
}

const Wrapper = ({ type }: WrapperProps) => {
    const queryClient = new QueryClient();
    const { data, isLoading, isError } = useData(type);

    return (
        <QueryClientProvider client={queryClient}>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Unable to fetch load results</p>
            ) : (
                <DataTable 
                    list={data}
                    resultsPerPage={10}
                    currentPage={1}
                    setSelectedData={() => {}}
                    setIsOpen={() => {}}
                    type={type}
                />
            )}
        </QueryClientProvider>
    )
}

const mockedUseData = useData as jest.Mock<any>;

jest.mock('../hooks/useData.ts');

describe('Testing Airports list fetching and displaying in table', () => {
    beforeEach(() => {
        mockedUseData.mockImplementation(() => ({ isLoading: true }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Renders without crashing', () => {
        render(<Wrapper type='airports' />);
    });

    it('Displays loading indicator', () => {        
        const { getByText } = render(<Wrapper type='airports' />);
        expect(getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays error message', () => {
        mockedUseData.mockImplementation(() => ({
            isLoading: false,
            isError: true,
            error: { message: "Unable to fetch load results" }
        }));
        const { getByText, queryByText } = render(<Wrapper type='airports' />);

        expect(queryByText(/Loading.../i)).toBeFalsy();
        expect(getByText(/Unable to fetch load results/i)).toBeVisible();
    });

    it('Displays data', () => {
        const mockedAirportssData = 
        [
            {
                "type": "Feature",
                "id": 1,
                "properties": {
                  "OBJECTID": 1,
                  "GLOBAL_ID": "656D38F0-F1FE-49A8-AB4F-677281616EF8",
                  "IDENT": "ADK",
                  "NAME": "Adak",
                  "LATITUDE": "51-53-00.8980N",
                  "LONGITUDE": "176-38-32.9360W",
                  "ELEVATION": 19.5,
                  "ICAO_ID": "PADK",
                  "TYPE_CODE": "AD",
                  "SERVCITY": "ADAK ISLAND",
                  "STATE": "AK",
                  "COUNTRY": "UNITED STATES",
                  "OPERSTATUS": "OPERATIONAL",
                  "PRIVATEUSE": 0,
                  "IAPEXISTS": 1,
                  "DODHIFLIP": 0,
                  "FAR91": 0,
                  "FAR93": 0,
                  "MIL_CODE": "CIVIL",
                  "AIRANAL": "NO OBJECTION",
                  "US_HIGH": 0,
                  "US_LOW": 0,
                  "AK_HIGH": 1,
                  "AK_LOW": 1,
                  "US_AREA": 0,
                  "PACIFIC": 0
                }
              }
        ];

        mockedUseData.mockImplementation(() => ({ isLoading: false, data: mockedAirportssData}));

        const { getByText, queryByText } = render(<Wrapper type='airports' />);

        expect(queryByText(/Loading.../i)).toBeFalsy();

        getByText(mockedAirportssData[0].properties.NAME);
        getByText(mockedAirportssData[0].properties.OBJECTID);
        getByText(mockedAirportssData[0].properties.OPERSTATUS);
    });
});

describe('Testing Stadiums list fetching and displaying in table', () => {
    beforeEach(() => {
        mockedUseData.mockImplementation(() => ({ isLoading: true }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Renders without crashing', () => {
        render(<Wrapper type='stadiums' />);
    });

    it('Displays loading indicator', () => {        
        const { getByText } = render(<Wrapper type='stadiums' />);
        expect(getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays error message', () => {
        mockedUseData.mockImplementation(() => ({
            isLoading: false,
            isError: true,
            error: { message: "Unable to fetch load results" }
        }));
        const { getByText, queryByText } = render(<Wrapper type='stadiums' />);

        expect(queryByText(/Loading.../i)).toBeFalsy();
        expect(getByText(/Unable to fetch load results/i)).toBeVisible();
    });

    it('Displays data', () => {
        const MockedStadiumsData = 
        [
            {
                "type": "Feature",
                "id": 1,
                "properties": {
                  "OBJECTID": 1,
                  "GLOBAL_ID": "99F1123D-61D0-4825-B647-0A41201B7685",
                  "NAME": "PNC Park",
                  "LATITUDE": "40-26-49.38N",
                  "LONGITUDE": "080-00-22.17W",
                  "CITY": "Pittsburgh",
                  "STATE": "PA",
                  "STATUS_CODE": "Open",
                  "OPENING_ON": null
                }
              }
        ];

        mockedUseData.mockImplementation(() => ({ isLoading: false, data: MockedStadiumsData}));

        const { getByText, queryByText } = render(<Wrapper type='stadiums' />);

        expect(queryByText(/Loading.../i)).toBeFalsy();

        getByText(MockedStadiumsData[0].properties.NAME);
        getByText(MockedStadiumsData[0].properties.OBJECTID);
        getByText(MockedStadiumsData[0].properties.STATUS_CODE);
    });
})

describe('Testing Special Use Airspace list fetching and displaying in table', () => {
    beforeEach(() => {
        mockedUseData.mockImplementation(() => ({ isLoading: true }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Renders without crashing', () => {
        render(<Wrapper type='special' />);
    });

    it('Displays loading indicator', () => {        
        const { getByText } = render(<Wrapper type='special' />);
        expect(getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays error message', () => {
        mockedUseData.mockImplementation(() => ({
            isLoading: false,
            isError: true,
            error: { message: "Unable to fetch load results" }
        }));
        const { getByText, queryByText } = render(<Wrapper type='special' />);

        expect(queryByText(/Loading.../i)).toBeFalsy();
        expect(getByText(/Unable to fetch load results/i)).toBeVisible();
    });

    it('Displays data', () => {
        const MockedStadiumsData = 
        [
            {
                "type": "Feature",
                "id": 1,
                "properties": {
                  "OBJECTID": 1,
                  "GLOBAL_ID": "5F02297F-7DF5-478E-B876-C758B6E4B910",
                  "NAME": "A-220",
                  "TYPE_CODE": "A",
                  "CLASS": null,
                  "UPPER_DESC": "TI",
                  "UPPER_VAL": "4500",
                  "UPPER_UOM": "FT",
                  "UPPER_CODE": "MSL",
                  "LOWER_DESC": null,
                  "LOWER_VAL": "0",
                  "LOWER_UOM": "FT",
                  "LOWER_CODE": "SFC",
                  "LEVEL_CODE": "L",
                  "CITY": "MCGUIRE AFB",
                  "STATE": "NJ",
                  "COUNTRY": "UNITED STATES",
                  "CONT_AGENT": null,
                  "COMM_NAME": null,
                  "SECTOR": null,
                  "ONSHORE": "1",
                  "EXCLUSION": "0",
                  "TIMESOFUSE": "0800 - 2200, DAILY",
                  "GMTOFFSET": "-5",
                  "DST_CODE": "1",
                  "REMARKS": null,
                  "AK_LOW": 0,
                  "AK_HIGH": 0,
                  "US_LOW": 1,
                  "US_HIGH": 0,
                  "US_AREA": 1,
                  "PACIFIC": 0,
                  "Shape__Area": 0.165564236045384,
                  "Shape__Length": 1.7062563615085
                }
              }
        ];

        mockedUseData.mockImplementation(() => ({ isLoading: false, data: MockedStadiumsData}));

        const { getByText, queryByText } = render(<Wrapper type='special' />);

        expect(queryByText(/Loading.../i)).toBeFalsy();

        getByText(MockedStadiumsData[0].properties.NAME);
        getByText(MockedStadiumsData[0].properties.OBJECTID);
        getByText(MockedStadiumsData[0].properties.TIMESOFUSE);
    });
});