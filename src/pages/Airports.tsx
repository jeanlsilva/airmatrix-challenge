import { useEffect } from "react";
import { Menu } from "../components/Menu";
import { getData } from "../services/getData";

export function Airports() {
    useEffect(() => {
        getData('https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/US_Airport/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }, []);

    return (
        <>
            <Menu page='airports' />
            <main>
                <h1>Airports</h1>
            </main>
        </>
    )
}