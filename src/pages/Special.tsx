import { useEffect } from 'react';
import { Menu } from "../components/Menu";
import { getData } from "../services/getData";

export function Special() {
    useEffect(() => {
        getData('https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/Special_Use_Airspace/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }, []);
    
    return (
        <>
            <Menu page='special' />
            <main>
                <h1>Special</h1>
            </main>
        </>
    )
}

