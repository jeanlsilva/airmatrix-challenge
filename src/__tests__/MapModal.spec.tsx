import React from 'react';
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query"
import { MapModal } from "../components/MapModal";
import { useData } from "../hooks/useData";

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
                <p>Unable to fetch results</p>
            ) : (
                <MapModal
                    isOpen={true}
                    setIsOpen={() => {}}
                    type={type}
                    data={data}
                />
            )}
        </QueryClientProvider>
    )
}

const mockedUseData = useData as jest.Mock<any>;

jest.mock('../hooks/useData.ts');

describe('Testing Airports coordinates correctly displayed in the map', () => {
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
        expect(getByText(/Unable to fetch results/i)).toBeVisible();
    });

    it('Displays data', () => {
        const MockedAirportsCoordinates = {
            "type": "Feature",
            "id": 1,
            "geometry": {
                "type": "Point",
                "coordinates": [
                -176.642498119769,
                51.8835816186176
                ]
            },
            "properties": {
                "NAME": "Adak"
            }
        };

        mockedUseData.mockImplementation(() => ({ isLoading: false, data: MockedAirportsCoordinates}));

        const { queryByText, container } = render(<Wrapper type='airports' />);

        const element = container.getElementsByClassName('mapboxgl-map');

        console.log(element)

        expect(queryByText(/Loading.../i)).toBeFalsy();
        expect(element).toBeInTheDocument();
    });
});