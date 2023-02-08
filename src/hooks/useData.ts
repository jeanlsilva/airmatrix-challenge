import { useQuery } from 'react-query';
import { getData } from '../services/getData';

export const useData = (type: 'airports' | 'stadiums' | 'special') => {
    return useQuery('getAirports', () => {
     if (type === 'airports') {
        return getData('https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/US_Airport/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
     } else if (type === 'stadiums') {
        return getData('https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/Stadiums/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
     } else {
        return getData('https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/Special_Use_Airspace/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
     }
    });
}